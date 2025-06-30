import React from 'react';
// import { DashboardGroupExtension } from '@openmrs/esm-patient-common-lib';
import PatientExtensionRenderer from '../components/extension-conditional-renderer/patient-based-extension-renderer';
import { type DashboardLinkConfig } from '../types';
import { BrowserRouter } from 'react-router-dom';
// import { DashboardGroupExtension } from './nav-group/DashboardGroupExtension';
import { DashboardExtension } from '@openmrs/esm-framework';

export const createConditionalDashboardLink = (db: DashboardLinkConfig) => {
  return ({ basePath }: { basePath: string }) => {
    return (
      <PatientExtensionRenderer patientExpression={db.patientExpression}>
        <BrowserRouter>
          <DashboardExtension basePath={basePath} title={db.title} path={db.path} icon="" />
        </BrowserRouter>
      </PatientExtensionRenderer>
    );
  };
};

export const createConditionalDashboardGroup = ({
  title,
  slotName,
  isExpanded,
  patientExpression,
}: {
  title: string;
  slotName: string;
  patientExpression: string;
  isExpanded?: boolean;
}) => {
  const DashboardGroup = ({ basePath }: { basePath: string }) => {
    return (
      <PatientExtensionRenderer patientExpression={patientExpression}>
        {/* <DashboardGroupExtension title={title} slotName={slotName} basePath={basePath} isExpanded={isExpanded} /> */}
        <DashboardExtension title={title} basePath={basePath} path={basePath} icon="" />
      </PatientExtensionRenderer>
    );
  };
  return DashboardGroup;
};
