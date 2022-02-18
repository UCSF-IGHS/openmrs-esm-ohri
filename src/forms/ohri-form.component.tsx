import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './ohri-form.scss';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  usePatient,
  useSessionUser,
  showToast,
  attach,
  getAsyncLifecycle,
  registerExtension,
  detach,
} from '@openmrs/esm-framework';
import { useTranslation } from 'react-i18next';
import LoadingIcon from '../components/loading/loading.component';
import { OHRIFormSchema, SessionMode, OHRIFormPage as OHRIFormPageProps } from './types';
import OHRIFormSidebar from './components/sidebar/ohri-form-sidebar.component';
import { OHRIEncounterForm } from './components/encounter/ohri-encounter-form';
import { isTrue } from './utils/boolean-utils';
import { PatientBanner } from '../components/patient-banner/patient-banner.component';
import { useWorkspaceLayout } from './utils/useWorkspaceLayout';
import { Button } from 'carbon-components-react';
import ReactMarkdown from 'react-markdown';

interface OHRIFormProps {
  formJson: OHRIFormSchema;
  onSubmit?: any;
  onCancel?: any;
  encounterUuid?: string;
  mode?: SessionMode;
  handleClose?: any;
  patientUUID?: string;
}

export interface FormSubmissionHandler {
  validate: (values) => boolean;
  submit: (values) => Promise<any>;
}

const OHRIForm: React.FC<OHRIFormProps> = ({
  formJson,
  encounterUuid,
  mode,
  onSubmit,
  onCancel,
  handleClose,
  patientUUID,
}) => {
  const [currentProvider, setCurrentProvider] = useState(null);
  const [location, setEncounterLocation] = useState(null);
  const { patient } = usePatient(patientUUID);
  const session = useSessionUser();
  const [initialValues, setInitialValues] = useState({});
  const encDate = new Date();
  const [scrollAblePages, setScrollablePages] = useState(new Set<OHRIFormPageProps>());
  const [selectedPage, setSelectedPage] = useState('');
  const [collapsed, setCollapsed] = useState(true);
  const { t } = useTranslation();
  const ref = useRef(null);
  const workspaceLayout = useWorkspaceLayout(ref);
  const handlers = new Map<string, FormSubmissionHandler>();
  const form = useMemo(() => {
    const copy: OHRIFormSchema = JSON.parse(JSON.stringify(formJson));
    if (encounterUuid && !copy.encounter) {
      // Assign this to the parent form
      copy.encounter = encounterUuid;
    }
    let i = copy.pages.length;
    // let's loop backwards so that we splice in the opposite direction
    while (i--) {
      const page = copy.pages[i];
      if (isTrue(page.isSubform) && !isTrue(page.isHidden) && page.subform?.form?.encounterType == copy.encounterType) {
        copy.pages.splice(i, 1, ...page.subform.form.pages.filter(page => !isTrue(page.isSubform)));
      }
    }
    return copy;
  }, [encounterUuid]);

  const sessionMode = useMemo(() => {
    if (mode) {
      return mode;
    }
    if (encounterUuid) {
      return 'edit';
    }
    return 'enter';
  }, [mode]);

  useEffect(() => {
    const extDetails = {
      id: 'ohri-form-header-toggle-ext',
      moduleName: '@openmrs/esm-ohri-app',
      slot: 'patient-chart-workspace-header-slot',
      load: getAsyncLifecycle(
        () => import('./components/section-collapsible-toggle/ohri-section-collapsible-toggle.component'),
        {
          featureName: 'ohri-form-header-toggle',
          moduleName: '@openmrs/esm-ohri-app',
        },
      ),
      meta: {
        handleCollapse: (value: boolean) => {
          setCollapsed(value);
        },
      },
    };
    registerExtension(extDetails.id, extDetails);
    attach('patient-chart-workspace-header-slot', extDetails.id);

    return () => {
      detach('patient-chart-workspace-header-slot', extDetails.id);
    };
  }, []);

  useEffect(() => {
    if (session) {
      if (!encounterUuid) {
        setEncounterLocation(session.sessionLocation);
      }
      setCurrentProvider(session.currentProvider.uuid);
    }
  }, [session]);

  const handleFormSubmit = (values: Record<string, any>) => {
    // validate form and it's suforms
    let isSubmitable = true;
    handlers.forEach(handler => {
      const result = handler?.validate?.(values);
      if (!result) {
        isSubmitable = false;
      }
    });
    // do submit
    if (isSubmitable) {
      const submissions = [...handlers].map(([key, handler]) => {
        return handler?.submit?.(values);
      });
      Promise.all(submissions).then(results => {
        if (mode == 'edit') {
          showToast({
            description: t('updatedRecordDescription', 'The patient encounter was updated'),
            title: t('updatedRecord', 'Record updated'),
            kind: 'success',
            critical: true,
          });
        } else {
          showToast({
            description: t('createdRecordDescription', 'A new encounter was created'),
            title: t('createdRecord', 'Record created'),
            kind: 'success',
            critical: true,
          });
        }
        onSubmit?.();
      });
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={Yup.object({})}
      onSubmit={(values, { setSubmitting }) => {
        handleFormSubmit(values);
        setSubmitting(false);
      }}>
      {props => (
        <Form className={`bx--form no-padding ng-untouched ng-pristine ng-invalid ${styles.ohriForm}`} ref={ref}>
          {!patient ? (
            <LoadingIcon />
          ) : (
            <div className={styles.ohriFormContainer}>
              {workspaceLayout != 'minimized' && (
                <OHRIFormSidebar
                  scrollAblePages={scrollAblePages}
                  selectedPage={selectedPage}
                  mode={mode}
                  onCancel={onCancel}
                  handleClose={handleClose}
                  values={props.values}
                  setValues={props.setValues}
                  allowUnspecifiedAll={formJson.allowUnspecifiedAll}
                  defaultPage={formJson.defaultPage}
                />
              )}

              <div className={styles.formContent}>
                <PatientBanner patient={patient} />
                {form.markdown && (
                  <div className={styles.markdownContainer}>
                    <ReactMarkdown children={form.markdown.join('\n')} />
                  </div>
                )}
                <div
                  className={`${styles.formContentBody}
                    ${workspaceLayout == 'minimized' ? `${styles.minifiedFormContentBody}` : ''}
                  `}>
                  <OHRIEncounterForm
                    formJson={form}
                    patient={patient}
                    encounterDate={encDate}
                    provider={currentProvider}
                    location={location}
                    values={props.values}
                    isCollapsed={collapsed}
                    sessionMode={sessionMode}
                    scrollablePages={scrollAblePages}
                    setAllInitialValues={setInitialValues}
                    allInitialValues={initialValues}
                    setScrollablePages={setScrollablePages}
                    setFieldValue={props.setFieldValue}
                    setSelectedPage={setSelectedPage}
                    handlers={handlers}
                    workspaceLayout={workspaceLayout}
                  />
                </div>
                {workspaceLayout == 'minimized' && (
                  <div className={styles.minifiedButtons}>
                    <Button
                      kind="secondary"
                      onClick={() => {
                        onCancel && onCancel();
                        handleClose && handleClose();
                      }}>
                      {mode == 'view' ? 'Close' : 'Cancel'}
                    </Button>
                    {mode != 'view' && <Button type="submit">Save</Button>}
                  </div>
                )}
              </div>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default OHRIForm;
