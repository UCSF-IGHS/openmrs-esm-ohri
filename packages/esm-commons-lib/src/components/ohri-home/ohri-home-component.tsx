import React, { useState } from 'react';
import { ExtensionSlot } from '@openmrs/esm-framework';
import { FlexGrid } from '@carbon/react';
import styles from './ohri-home.scss';
import { PatientListWorkspace } from '../../workspace/patient-list-workspace';

interface HomeProps {
  programme?: string;
  dashboardTitle?: string;
}

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
        // children={workSpaceProps?.children}
        onClose={() => setIsWorkSpaceVisible(false)}
        meta={workSpaceProps?.meta}
      />
      <FlexGrid className={styles.mainWrapper}>
        <ExtensionSlot
          extensionSlotName={getSlotName(HomeProps.programme, OHRIHomeHeaderSlot)}
          state={{ title: HomeProps.dashboardTitle }}
        />
        <ExtensionSlot
          extensionSlotName={getSlotName(HomeProps.programme, OHRIHomeTileSlot)}
          state={{ launchWorkSpace }}
        />
        <div
          style={{
            height: '100vh',
            backgroundColor: '#f4f4f4',
            marginLeft: '-16px',
            marginRight: '-16px',
            marginBottom: '-16px',
            marginTop: '2rem',
          }}>
          <ExtensionSlot
            extensionSlotName={getSlotName(HomeProps.programme, OHRIHomeTabSlot)}
            state={{ launchWorkSpace }}
          />
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
