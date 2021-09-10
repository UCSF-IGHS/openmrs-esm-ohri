const htsExtensions = [];
const htsPages = [];

export const loadHtsExtensions = () => {

}

export const loadHtsPages = () => {
    return htsPages.map(htsPage => ({
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
      }) 
};