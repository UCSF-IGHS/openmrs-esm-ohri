import { DashboardGroupExtension } from '@openmrs/esm-patient-common-lib';
import React from 'react';
import PatientExtensionRenderer from '../components/extension-conditional-renderer/patient-based-extension-renderer';
import { DashboardLinkConfig } from '../types';
import { DashboardExtension } from './DashboardExtension';
import { BrowserRouter } from 'react-router-dom';

export const createDashboardLinkWithCustomTitle = (db: DashboardLinkConfig) => {
  return ({ basePath }: { basePath: string }) => {
    return (
      <BrowserRouter>
        <DashboardExtension path={db.path} title={db.title} basePath={basePath} linkText={db.linkText} />
      </BrowserRouter>
    );
  };
};

export const createConditionalDashboardLink = (db: DashboardLinkConfig) => {
  return ({ basePath }: { basePath: string }) => {
    return (
      <PatientExtensionRenderer patientExpression={db.patientExpression}>
        <BrowserRouter>
          <DashboardExtension path={db.path} title={db.title} basePath={basePath} linkText={db.linkText} />
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
        <DashboardGroupExtension title={title} slotName={slotName} basePath={basePath} isExpanded={isExpanded} />
      </PatientExtensionRenderer>
    );
  };
  return DashboardGroup;
};
