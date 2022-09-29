import React, { useState } from 'react';
import {
  launchFormInEditMode,
  launchFormInViewMode,
  launchFormWithCustomTitle,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { getForm, applyFormIntent } from '@ohri/openmrs-ohri-form-engine-lib';
import styles from './Tabs/patient-list.scss';
import { OverflowMenu, OverflowMenuItem } from 'carbon-components-react';
import { changeWorkspaceContext, closeAllWorkspaces, resetWorkspaceStore } from '@openmrs/esm-patient-common-lib';
import { navigate } from '@openmrs/esm-framework';
import { useTranslation } from 'react-i18next';

export interface LabresultsFormViewerProps {
  patientUuid: string;
  encounterUuid: string;
  form?: { package: string; name: string; view?: string };
  patientUrl: string;
}

export const LabresultsFormViewer: React.FC<LabresultsFormViewerProps> = ({
  patientUuid,
  encounterUuid,
  form,
  patientUrl,
}) => {
  const { t } = useTranslation();
  const [encounterForm, setEncounterForm] = useState(getForm(form.package, form.name));
  const [counter, setCounter] = useState(0);

  const forceComponentUpdate = () => setCounter(counter + 1);
  const capitalize = word => word[0].toUpperCase() + word.substr(1);

  const launchEncounterForm = (form?: any, intent: string = '*', action: string = 'add', encounterUuid?: any) => {
    const launcherTitle = `${capitalize(action)} ` + (form?.name || encounterForm?.name);
    launchFormWithCustomTitle(form || encounterForm, launcherTitle, 'view', encounterUuid, forceComponentUpdate);
  };
  return (
    <>
      {encounterUuid ? (
        <OverflowMenu flipped className={styles.flippedOverflowMenu}>
          <OverflowMenuItem
            itemText={t('viewResult', 'View Result')}
            onClick={e => {
              e.preventDefault();
              changeWorkspaceContext(patientUuid);
              launchEncounterForm(applyFormIntent('*', getForm(form.package, form.name)), '*', 'view', encounterUuid);
              navigate({ to: patientUrl });
            }}
          />
        </OverflowMenu>
      ) : (
        <></>
      )}
    </>
  );
};
