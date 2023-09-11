import React from 'react';
import { useParams } from 'react-router-dom';
import { useLayoutType, isDesktop, useExtensionStore, ExtensionSlot } from '@openmrs/esm-framework';
import DashboardView from './dashboard-view.component';
import styles from './ohri-dashboard.scss';

export interface DashboardConfig {
  name: string;
  slot: string;
  title: string;
}

export default function OhriDashboard() {
  const params = useParams();
  const extensionStore = useExtensionStore();
  const layout = useLayoutType();
  const ungroupedDashboards =
    extensionStore.slots['ohri-dashboard-slot']?.assignedExtensions
      .map((e) => e.meta)
      .filter((e) => Object.keys(e).length) || [];

  // TODO Pius - add groups dashboard support
  const dashboards = ungroupedDashboards as Array<DashboardConfig>;

  const activeDashboard = dashboards.find((dashboard) => dashboard.name === params?.dashboard) || dashboards[0];

  return (
    <section className={isDesktop(layout) && styles.dashboardContainer}>
      {isDesktop(layout) && <ExtensionSlot name="ohri-left-panel-slot" key={layout} />}
      <DashboardView title={activeDashboard?.name} dashboardSlot={activeDashboard?.slot} />
    </section>
  );
}
