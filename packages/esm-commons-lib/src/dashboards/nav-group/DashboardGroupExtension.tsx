import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Accordion, AccordionItem } from '@carbon/react';
import { ExtensionSlot } from '@openmrs/esm-framework';
import './dashboard-group-extension.scss';
import { ComponentContext } from '@openmrs/esm-framework/src/internal';

export interface DashboardGroupExtensionProps {
  title: string;
  slotName?: string;
  basePath: string;
  isExpanded?: boolean;
  moduleName?: string;
}

export const DashboardGroupExtension = ({
  title,
  slotName,
  basePath,
  isExpanded,
  moduleName,
}: DashboardGroupExtensionProps) => {
  const { t } = useTranslation();
  const componentContext = useContext(ComponentContext);

  return (
    <Accordion className="nav-group">
      <AccordionItem open={isExpanded ?? true} title={t(title)}>
        <ExtensionSlot
          name={slotName ?? `nav-group-${title}`}
          state={{ basePath, moduleName: componentContext.extension?.extensionSlotModuleName }}
        />
      </AccordionItem>
    </Accordion>
  );
};
