/* eslint-disable no-debugger, no-console */
import React, { useState } from 'react';
import {
  launchFormInViewMode,
  launchFormWithCustomTitle,
} from '../../../../../../esm-commons-lib/src/utils/ohri-forms-commons';
import { getForm, applyFormIntent } from 'openmrs-ohri-form-engine-lib';

export interface LabresultsFormViewerProps {
  patientUuid: string;
  encounterUuid: string;
  form?: { package: string; name: string; view?: string };
}
import styles from '../../../../../../esm-ohri-core-app/src/components/all-patients-list/patient-list.scss';
import { OverflowMenu, OverflowMenuItem } from 'carbon-components-react';

export const LabresultsFormViewer: React.FC<LabresultsFormViewerProps> = ({ patientUuid, encounterUuid, form }) => {
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
      <OverflowMenu flipped className={styles.flippedOverflowMenu}>
        <OverflowMenuItem
          itemText="View Result"
          onClick={e => {
            console.log(`form name - ${form.name}, package - ${form.package}, encounter uuid - ${encounterUuid}`);
            e.preventDefault();
            launchEncounterForm(applyFormIntent('*', getForm(form.package, form.name)), '*', 'view', encounterUuid);
          }}
        />
      </OverflowMenu>
    </>
  );
};
