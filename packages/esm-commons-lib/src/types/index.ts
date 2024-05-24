export interface DashboardLinkConfig {
  path: string;
  title: string;
  moduleName: string;
  patientExpression?: string;
}

export interface DashboardConfig extends DashboardLinkConfig {
  slot: string;
  config: {
    columns: number;
  };
}

export interface PatientChartProps {
  patientUuid: string;
  pTrackerId?: string;
}
