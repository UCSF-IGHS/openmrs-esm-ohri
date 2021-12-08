import React, { useEffect, useState } from 'react';
import OHRIDashboardSideNav from './side-menu/ohri-dashboard-side-nav.component';
import { ExtensionSlot, useExtensionSlotMeta } from '@openmrs/esm-framework';

const OHRIDashboard = ({ match }) => {
  const {
    params: { view },
  } = match;
  const [dashboards, setDashboards] = useState([]);
  const meta = useExtensionSlotMeta('dashboard-slot');
  const folders = Object.values(meta);
  const [currentDashboard, setCurrentDashboard] = useState(null);

  useEffect(() => {
    if (!view) {
      setCurrentDashboard(dashboards.find(db => db.name == view) || dashboards[0]);
    } else {
      setCurrentDashboard(dashboards[0]);
    }
  }, [view, dashboards]);
  console.log('mounted...');
  return (
    <div className="container">
      {folders.map(f => {
        return <GroupAbleMenuItem groupSlot={f.slot} dashboards={dashboards} setDashboards={setDashboards} />;
      })}
      <>
        <OHRIDashboardSideNav />
        <div className="bx--grid">
          <div className="bx--row">
            {currentDashboard && <DashboardView dashboardSlot={currentDashboard.slot} title={currentDashboard.title} />}
          </div>
        </div>
      </>
    </div>
  );
};

const GroupAbleMenuItem = ({ groupSlot, dashboards, setDashboards }) => {
  const meta = useExtensionSlotMeta(groupSlot);

  useEffect(() => {
    setDashboards([...dashboards, ...Object.values(meta)]);
  }, [meta]);

  return <></>;
};

const DashboardView: React.FC<{ dashboardSlot: string; title: string }> = ({ dashboardSlot, title }) => {
  return (
    <div>
      <h3>{title}</h3>
      <ExtensionSlot extensionSlotName={dashboardSlot} />
    </div>
  );
};

export default OHRIDashboard;
