import React, { useEffect, useMemo, useState } from 'react';
import { attach, detach, ExtensionSlot, isDesktop, useExtensionSlotMeta, useLayoutType } from '@openmrs/esm-framework';
import styles from './ohri-dashboard.scss';
import { useParams } from 'react-router-dom';

const OHRIDashboard = () => {
  const {
    view
  } = useParams();
  const [dashboards, setDashboards] = useState([]);
  const metaLinks = useExtensionSlotMeta('dashboard-links-slot');
  const metaFolders = useExtensionSlotMeta('dashboard-slot');
  const [currentDashboard, setCurrentDashboard] = useState(null);
  const layout = useLayoutType();

  const folders = useMemo(() => {
    return Object.values({ ...metaLinks, ...metaFolders })
  }, [metaLinks, metaFolders]);
  
  useEffect(() => {
    if (view) {
      setCurrentDashboard(dashboards.find(db => db.name == view));
    } else if (!currentDashboard){
      setCurrentDashboard(dashboards[0]);
    }
  }, [view, dashboards]);

  useEffect(() => {
    if (!isDesktop(layout)) {
      attach('nav-menu-slot', 'ohri-nav-items-ext');
    }
    return () => detach('nav-menu-slot', 'ohri-nav-items-ext');
  }, [layout]);

  const state = useMemo(() => {
    if (currentDashboard) {
      return ({ programme: currentDashboard?.config?.programme, dashboardTitle: currentDashboard.title });
    }
    return null;
  }, [currentDashboard]);

  return (
    <div className={styles.dashboardContainer}>
      {folders.map((f, index) => {
        return (
          <GroupAbleMenuItem
            groupSlot={f.slot}
            dashboards={dashboards}
            setDashboards={setDashboards}
            updateDashboardState={index == folders.length - 1}
            key={index}
          />
        );
      })}
      {isDesktop(layout) && <ExtensionSlot extensionSlotName="ohri-nav-items-slot" key={layout} />}
      <div className={` ${styles.dashboardContent}`}>
        {currentDashboard && (<ExtensionSlot extensionSlotName={currentDashboard.slot} state={state} />)}
      </div>
    </div>
  );
};

const GroupAbleMenuItem = ({ groupSlot, dashboards, setDashboards, updateDashboardState }) => {
  const meta = useExtensionSlotMeta(groupSlot);
  useEffect(() => {
    if (meta && Object.keys(meta).length) {
      dashboards.push(...Object.values(meta));
      updateDashboardState && setDashboards([...dashboards]);
    }
  }, [meta]);

  return <></>;
};

export default OHRIDashboard;
