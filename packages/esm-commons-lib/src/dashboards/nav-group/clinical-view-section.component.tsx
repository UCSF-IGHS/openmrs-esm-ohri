import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ExtensionSlot } from '@openmrs/esm-framework';
import type { DashboardGroupExtensionProps } from './dashboard-group.component';
import { registerNavGroup } from './nav-group';

export const ClinicalViewSection: React.FC<DashboardGroupExtensionProps> = ({ title, basePath }) => {
  const slotName = 'clinical-view-section';
  const { t } = useTranslation();
  useEffect(() => {
    registerNavGroup(slotName);
  }, [slotName]);
  return (
    <>
      <ExtensionSlot
        style={{ width: '100%', minWidth: '15rem' }}
        name={slotName ?? `nav-group-${title}`}
        state={{ basePath, moduleName: '@ohri/openmrs-esm-ohri-commons-lib' }}
      />
    </>
  );
};

export default ClinicalViewSection;
