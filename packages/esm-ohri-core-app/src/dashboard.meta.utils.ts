import { getAsyncLifecycle } from '@openmrs/esm-framework';
const htsPages = [];

const moduleName = '@openmrs/esm-ohri-core-app';

export const loadHtsPages = () => {
  return htsPages.map((htsPage) => ({
    id: `hts-${htsPage.name}-list-ext`,
    slot: `hts-${htsPage.name}-dashboard-slot`,
    load: getAsyncLifecycle(
      () => import(`./pages/${htsPage.name}/encounter-list/${htsPage.name}-encounter-list.component`),
      {
        featureName: `hts-${htsPage.name}-list`,
        moduleName,
      },
    ),
    order: 6,
    meta: {
      columnSpan: 4,
    },
  }));
};
