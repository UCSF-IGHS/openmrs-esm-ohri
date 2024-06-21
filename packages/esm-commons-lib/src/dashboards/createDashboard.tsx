import React from 'react';
import { DashboardGroupExtension } from '@openmrs/esm-patient-common-lib';
import PatientExtensionRenderer from '../components/extension-conditional-renderer/patient-based-extension-renderer';
import { type DashboardLinkConfig } from '../types';
import { DashboardExtension } from './DashboardExtension';
import { BrowserRouter } from 'react-router-dom';

export const createConditionalDashboardLink = (db: DashboardLinkConfig) => {
  return ({ basePath }: { basePath: string }) => {
    return (
      <PatientExtensionRenderer patientExpression={db.patientExpression}>
        <BrowserRouter>
          <DashboardExtension basePath={basePath} title={db.title} path={db.path} moduleName={db.moduleName} />
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
