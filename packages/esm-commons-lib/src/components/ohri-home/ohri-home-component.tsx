import React, { useState } from 'react';
import { ExtensionSlot } from '@openmrs/esm-framework';
import { FlexGrid } from '@carbon/react';
import { PatientListWorkspace } from '../../workspace/patient-list-workspace';

import styles from './ohri-home.scss';

export function OHRIHome(HomeProps) {
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
        onClose={() => setIsWorkSpaceVisible(false)}
        meta={workSpaceProps?.meta}
      />
      <FlexGrid className={styles.mainWrapper}>
        <div className={styles.sectionContainer}>
          <ExtensionSlot
            name={getSlotName(HomeProps.programme, OHRIHomeHeaderSlot)}
            state={{ title: HomeProps.dashboardTitle, icon: HomeProps._meta.config.icon }}
          />
        </div>
        <div className={styles.sectionContainer}>
          <ExtensionSlot name={getSlotName(HomeProps.programme, OHRIHomeTileSlot)} state={{ launchWorkSpace }} />
        </div>
        <div className={styles.ohriHomeTabsContainer}>
          <ExtensionSlot name={getSlotName(HomeProps.programme, OHRIHomeTabSlot)} state={{ launchWorkSpace }} />
        </div>
      </FlexGrid>
    </>
  );
}

function getSlotName(programme: string, slotBaseName: string) {
  return programme + '-' + slotBaseName;
}

export const OHRIHomeHeaderSlot = 'home-header-slot';
export const OHRIHomeTileSlot = 'home-tiles-slot';
export const OHRIHomeTabSlot = 'home-tabs-slot';
