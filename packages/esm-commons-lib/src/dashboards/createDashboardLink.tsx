import React from 'react';
import { DashboardLinkConfig } from '../types';
import { DashboardExtension } from './DashboardExtension';

export const createDashboardLinkWithCustomTitle = (db: DashboardLinkConfig) => {
  return ({ basePath }: { basePath: string }) => {
    return <DashboardExtension title={db.title} basePath={basePath} linkText={db.linkText} />;
  };
};
