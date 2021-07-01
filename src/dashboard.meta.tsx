import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';

export const createDashboardLink = db => {
  const DashboardLink: React.FC<{ basePath: string }> = ({ basePath }) => {
    return (
      <div key={db.name}>
        <ConfigurableLink to={`${basePath}/${db.name}`} className="bx--side-nav__link">
          {db.title}
        </ConfigurableLink>
      </div>
    );
  };
  return DashboardLink;
};

export const dashboardMeta = {
  name: 'hts-summary',
  slot: 'hts-summary-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'HTS Sessions',
};
