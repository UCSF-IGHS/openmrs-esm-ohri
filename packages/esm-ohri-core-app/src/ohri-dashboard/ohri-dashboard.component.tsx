import React, { useEffect, useMemo, useState } from 'react';
import { attach, detach, ExtensionSlot, isDesktop, useExtensionSlotMeta, useLayoutType } from '@openmrs/esm-framework';
import styles from './ohri-dashboard.scss';
import { useParams } from 'react-router-dom';

const OHRIDashboard = () => {
  const { view } = useParams();
  const [dashboards, setDashboards] = useState([]);
  const metaLinks = useExtensionSlotMeta('dashboard-links-slot');
  const metaFolders = useExtensionSlotMeta('dashboard-slot');
  const [currentDashboard, setCurrentDashboard] = useState(null);
  const layout = useLayoutType();

  useEffect(() => {
    if (view) {
      setCurrentDashboard(dashboards.find((db) => db.name == view));
    } else if (!currentDashboard) {
      setCurrentDashboard(dashboards[0]);
    }
  }, [view, dashboards]);

  useEffect(() => {
    if (!isDesktop(layout)) {
      attach('nav-menu-slot', 'ohri-nav-items-ext');
    }
    return () => detach('nav-menu-slot', 'ohri-nav-items-ext');
  }, [layout]);

  useEffect(() => {
    const linksWithDashboardMeta = Object.values(metaLinks).filter((link) => Object.keys(link).length);
    if (linksWithDashboardMeta.length) {
      setDashboards([...dashboards, ...linksWithDashboardMeta]);
    }
  }, [metaLinks]);

  const state = useMemo(() => {
    if (currentDashboard) {
      return { programme: currentDashboard?.config?.programme, dashboardTitle: currentDashboard.title };
    }
    return null;
  }, [currentDashboard]);

  return (
    <div className={styles.dashboardContainer}>
      {Object.values(metaFolders).map((f, index) => {
        return (
          <GroupAbleMenuItem
            groupSlot={f.slot}
            dashboards={dashboards}
            setDashboards={setDashboards}
            updateDashboardState={index == Object.keys(metaFolders).length - 1}
            key={index}
          />
        );
      })}
      {isDesktop(layout) && <ExtensionSlot name="ohri-nav-items-slot" key={layout} />}
      <div className={` ${styles.dashboardContent}`}>
        {currentDashboard && <ExtensionSlot name={currentDashboard.slot} state={state} />}
      </div>
    </div>
  );
};

const GroupAbleMenuItem = ({ groupSlot, dashboards, setDashboards, updateDashboardState }) => {
  const meta = useExtensionSlotMeta(groupSlot);
  useEffect(() => {
    if (meta && Object.keys(meta).length) {
      dashboards.push(...Object.values(meta).filter((entry) => Object.keys(entry).length));
      updateDashboardState && setDashboards([...dashboards]);
    }
  }, [meta]);

  return <></>;
};

export default OHRIDashboard;
