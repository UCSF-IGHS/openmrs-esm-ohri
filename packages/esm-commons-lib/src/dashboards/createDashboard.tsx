import { DashboardGroupExtension } from '@openmrs/esm-patient-common-lib';
import React from 'react';
import PatientExtensionRenderer from '../components/extension-conditional-renderer/patient-based-extension-renderer';
import { DashboardLinkConfig } from '../types';
import { DashboardExtension } from './DashboardExtension';

export const createDashboardLinkWithCustomTitle = (db: DashboardLinkConfig) => {
  return ({ basePath }: { basePath: string }) => {
    return <DashboardExtension title={db.title} basePath={basePath} linkText={db.linkText} />;
  };
};

export const createConditionalDashboardLink = (db: DashboardLinkConfig) => {
  return ({ basePath }: { basePath: string }) => {
    return (
      <PatientExtensionRenderer patientExpression={db.patientExpression}>
        <DashboardExtension title={db.title} basePath={basePath} linkText={db.linkText} />
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
