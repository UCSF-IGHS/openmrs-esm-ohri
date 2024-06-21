import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { attach, detach, ExtensionSlot, isDesktop, useExtensionSlotMeta, useLayoutType } from '@openmrs/esm-framework';
import { useParams } from 'react-router-dom';

import styles from './ohri-dashboard.scss';

const OHRIDashboard = () => {
  const { view } = useParams();
  const [dashboards, setDashboards] = useState([]);
  const metaLinks = useExtensionSlotMeta('dashboard-links-slot') as Record<string, any>;
  const metaFolders = useExtensionSlotMeta('dashboard-slot') as Record<string, any>;
  const [currentDashboard, setCurrentDashboard] = useState(null);
  const layout = useLayoutType();

  const updateCurrentDashboard = useCallback(() => {
    if (view) {
      setCurrentDashboard(dashboards.find((db) => db.name == view));
    } else if (!currentDashboard) {
      setCurrentDashboard(dashboards[0]);
    }
  }, [view, dashboards, currentDashboard]);

  useEffect(() => {
    updateCurrentDashboard();
  }, [view, dashboards, currentDashboard, updateCurrentDashboard]);

  useEffect(() => {
    if (!isDesktop(layout)) {
      attach('nav-menu-slot', 'ohri-nav-items-ext');
    }
    return () => detach('nav-menu-slot', 'ohri-nav-items-ext');
  }, [layout]);

  const updateDashboards = useCallback(() => {
    const programSpecificLinks = metaFolders ? Object.values(metaFolders).filter((link) => link.isLink) : [];
    const linksWithDashboardMeta = [
      ...Object.values(metaLinks).filter((link) => Object.keys(link).length),
      ...programSpecificLinks,
    ];
    if (linksWithDashboardMeta.length) {
      setDashboards([...dashboards, ...linksWithDashboardMeta]);
    }
  }, [metaLinks, metaFolders, dashboards]);

  useEffect(() => {
    updateDashboards();
  }, [metaLinks, metaFolders, updateDashboards]);

  const state = useMemo(() => {
    if (currentDashboard) {
      return { programme: currentDashboard?.config?.programme, dashboardTitle: currentDashboard.title };
    }
    return null;
  }, [currentDashboard]);

  return (
    <div className={styles.dashboardContainer}>
      {Object.values(metaFolders).map((f, index) => (
        <GroupAbleMenuItem
          groupSlot={f.slot}
          dashboards={dashboards}
          setDashboards={setDashboards}
          updateDashboardState={index === Object.keys(metaFolders).length - 1}
          key={index}
        />
      ))}
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
      const newDashboards = [...dashboards, ...Object.values(meta).filter((entry) => Object.keys(entry).length)];
      updateDashboardState && setDashboards(newDashboards);
    }
  }, [dashboards, meta, setDashboards, updateDashboardState]);

  return null;
};

export default OHRIDashboard;
