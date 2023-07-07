export interface DashboardLinkConfig {
  path: string;
  title: string;
  linkText?: string;
  patientExpression?: string;
}

export interface PatientChartProps {
  patientUuid: string;
}
