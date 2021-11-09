import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './ohri-form.scss';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  useCurrentPatient,
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
  const [, patient] = useCurrentPatient(patientUUID);
  const session = useSessionUser();
  const [initialValues, setInitialValues] = useState({});
  const encDate = new Date();
  const [scrollAblePages, setScrollablePages] = useState(new Set<OHRIFormPageProps>());
  const [selectedPage, setSelectedPage] = useState('');
  const [collapsed, setCollapsed] = useState(true);
  const { t } = useTranslation();
  const form = useMemo(() => JSON.parse(JSON.stringify(formJson)), []);
  const handlers = new Map<string, FormSubmissionHandler>();

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
          onSubmit?.();
        }
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
        <Form className={`bx--form no-padding ng-untouched ng-pristine ng-invalid ${styles.ohriForm}`}>
          {!patient ? (
            <LoadingIcon />
          ) : (
            <div className={styles.ohriFormContainer}>
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
              <div className={styles.formContent}>
                <OHRIEncounterForm
                  formJson={form}
                  patient={patient}
                  encounterDate={encDate}
                  provider={currentProvider}
                  location={location}
                  values={props.values}
                  isCollapsed={collapsed}
                  sessionMode={mode}
                  scrollablePages={scrollAblePages}
                  setAllInitialValues={setInitialValues}
                  allInitialValues={initialValues}
                  setScrollablePages={setScrollablePages}
                  setFieldValue={props.setFieldValue}
                  setSelectedPage={setSelectedPage}
                  handlers={handlers}
                />
              </div>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default OHRIForm;
