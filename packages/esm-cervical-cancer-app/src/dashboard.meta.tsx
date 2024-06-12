export const cervicalCancerFolderMeta = {
  title: 'Cervical Cancer',
  slotName: 'cervical-cancer-slot',
  isExpanded: false,
  patientExpression: 'calculateAge(patient.birthDate) >= 25 && patient.gender === "female"',
};

export const caCxSummaryDashboardMeta = {
  slot: 'cacx-summary-slot',
  columns: 1,
  title: 'CaCx Summary',
  path: 'cacx-summary',
  layoutMode: 'anchored',
};

export const caCxVisitsDashboardMeta = {
  slot: 'cacx-visits-slot',
  columns: 1,
  title: 'CaCx Visits',
  path: 'cacx-visits',
  layoutMode: 'anchored',
};
