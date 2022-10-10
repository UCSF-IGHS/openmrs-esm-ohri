import React, { useEffect, useState } from 'react';
import { attach, detach, ExtensionSlot, isDesktop, useExtensionSlotMeta, useLayoutType } from '@openmrs/esm-framework';
import styles from './ohri-dashboard.scss';
import { useParams } from 'react-router';

const OHRIDashboard = () => {
  // const {
  //   params: { view },
  // } = useParams();

  const params = useParams();

  // console.log('view', params);

  const [dashboards, setDashboards] = useState([]);
  const metaLinks = useExtensionSlotMeta('dashboard-links-slot');
  const metaFolders = useExtensionSlotMeta('dashboard-slot');
  const meta = { ...metaLinks, ...metaFolders };
  const folders = Object.values(meta);
  const [currentDashboard, setCurrentDashboard] = useState(dashboards[0]);
  const layout = useLayoutType();

  // useEffect(() => {
  //   if (view) {
  //     setCurrentDashboard(dashboards.find(db => db.name == view));
  //   } else {
  //     setCurrentDashboard(dashboards[0]);
  //   }
  // }, [view, dashboards]);

  useEffect(() => {
    if (!isDesktop(layout)) {
      attach('nav-menu-slot', 'ohri-nav-items-ext');
    }
    return () => detach('nav-menu-slot', 'ohri-nav-items-ext');
  }, [layout]);

  return (
    <div className={styles.dashboardContainer}>
      {folders.map((f, index) => {
        return (
          <GroupAbleMenuItem
            groupSlot={f.slot}
            dashboards={dashboards}
            setDashboards={setDashboards}
            updateDashboardState={index == folders.length - 1}
          />
        );
      })}
      {isDesktop(layout) && <ExtensionSlot extensionSlotName="ohri-nav-items-slot" key={layout} />}
      <div className={`cds--grid ${styles.dashboardContent}`}>
        {currentDashboard && (
          <DashboardView
            dashboardSlot={currentDashboard.slot}
            title={currentDashboard.title}
            programme={currentDashboard?.config?.programme}
            key={currentDashboard.slot}
          />
        )}
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

const DashboardView: React.FC<{ dashboardSlot: string; title: string; programme?: string }> = ({
  dashboardSlot,
  title,
  programme,
}) => {
  return (
    <div>
      <ExtensionSlot extensionSlotName={dashboardSlot} state={{ programme: programme, dashboardTitle: title }} />
    </div>
  );
};

export default OHRIDashboard;
