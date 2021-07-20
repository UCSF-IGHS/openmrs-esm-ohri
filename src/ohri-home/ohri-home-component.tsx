import React, { useEffect, useState } from 'react';
import { attach, ExtensionSlot } from '@openmrs/esm-framework';
import { Grid, Row } from 'carbon-components-react';
import PatientListWorkspace from '../workspace/patient-list-workspace';
import styles from './ohri-home.scss';

function OhriHome() {
  const [isWorkSpaceVisible, setIsWorkSpaceVisible] = useState(false);
  const [workSpaceProps, setWorkSpaceProps] = useState<{ header: string; children: Element } | null>(null);

  const launchWorkSpace = (header: string, children: Element) => {
    setIsWorkSpaceVisible(true);
    setWorkSpaceProps({ header: header, children: children });
  };

  return (
    <>
      <PatientListWorkspace
        isVisible={isWorkSpaceVisible}
        header={workSpaceProps?.header}
        children={workSpaceProps?.children}
        onClose={() => setIsWorkSpaceVisible(false)}
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
