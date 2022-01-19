import React, { useEffect, useState } from 'react';
import OHRIDashboardSideNav from './side-menu/ohri-dashboard-side-nav.component';
import { ExtensionSlot, useExtensionSlot, useExtensionSlotMeta } from '@openmrs/esm-framework';
import { homeDashboardMeta } from './ohri-dashboard.meta';
import styles from './ohri-dashboard.scss';

const OHRIDashboard = ({ match }) => {
  const {
    params: { view },
  } = match;
  const [dashboards, setDashboards] = useState([]);
  const metaLinks = useExtensionSlotMeta('dashboard-links-slot');
  const metaFolders = useExtensionSlotMeta('dashboard-slot');
  const meta = { ...metaLinks, ...metaFolders };
  const folders = Object.values(meta);
  const [currentDashboard, setCurrentDashboard] = useState(dashboards[0]);

  useEffect(() => {
    if (view) {
      setCurrentDashboard(dashboards.find(db => db.name == view));
    } else {
      setCurrentDashboard(dashboards[0]);
    }
  }, [view, dashboards]);
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
      <>
        <OHRIDashboardSideNav />
        <div className={`bx--grid ${styles.dashboardContent}`}>
          {currentDashboard && (
            <DashboardView
              dashboardSlot={currentDashboard.slot}
              title={currentDashboard.title}
              programme={currentDashboard?.config?.programme}
            />
          )}
        </div>
      </>
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
