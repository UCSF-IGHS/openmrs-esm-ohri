import React, { useState } from 'react';
import { ExtensionSlot } from '@openmrs/esm-framework';
import { Grid } from 'carbon-components-react';
import PatientListWorkspace from '../workspace/patient-list-workspace';
import styles from './ohri-home.scss';

function OhriHome() {
  const [isWorkSpaceVisible, setIsWorkSpaceVisible] = useState(false);
  const [workSpaceProps, setWorkSpaceProps] = useState<{
    header: string;
    children: Element;
    meta: { numberOfClients: number; subTitle: string; dateLastUpdated: string };
  } | null>(null);

  const launchWorkSpace = (
    header: string,
    children: Element,
    meta: { numberOfClients: number; subTitle: string; dateLastUpdated: string },
  ) => {
    setIsWorkSpaceVisible(true);
    setWorkSpaceProps({ header: header, children: children, meta: meta });
  };

  return (
    <>
      <PatientListWorkspace
        isVisible={isWorkSpaceVisible}
        header={workSpaceProps?.header}
        children={workSpaceProps?.children}
        onClose={() => setIsWorkSpaceVisible(false)}
        meta={workSpaceProps?.meta}
      />
      <Grid className={styles.mainWrapper}>
        <ExtensionSlot extensionSlotName={OHRIHomeHeaderSlot} state={{ launchWorkSpace }} />
        <ExtensionSlot extensionSlotName={OHRIHomeTileSlot} state={{ launchWorkSpace }} />
        <ExtensionSlot extensionSlotName={OHRIHomeTabSlot} state={{ launchWorkSpace }} />
      </Grid>
    </>
  );
}

export default OhriHome;
export const OHRIHomeHeaderSlot = 'hts-home-header-slot';
export const OHRIHomeTileSlot = 'hts-home-tiles-slot';
export const OHRIHomeTabSlot = 'hts-home-tabs-slot';
