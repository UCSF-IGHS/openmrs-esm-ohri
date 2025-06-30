export const cervicalCancerFolderMeta = {
  title: 'Cervical Cancer',
  slotName: 'cervical-cancer-slot',
  isExpanded: false,
  patientExpression: 'calculateAge(patient.birthDate) >= 25 && patient.gender === "female"',
};

export const caCxSummaryDashboardMeta = {
  slot: 'cacx-summary-slot',
  title: 'CaCx Summary',
  path: 'cacx-summary',
  layoutMode: 'anchored',
  icon: 'omrs-icon-shopping-cart',
  hideDashboardTitle: true,
};

export const caCxVisitsDashboardMeta = {
  slot: 'cacx-visits-slot',
  title: 'CaCx Visits',
  path: 'cacx-visits',
  icon: 'omrs-icon-shopping-cart',
  hideDashboardTitle: true,
};
