import React from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterTile, type EncounterTileColumn, getEncounterTileColumns } from '@ohri/openmrs-esm-ohri-commons-lib';
import { useConfig } from '@openmrs/esm-framework';

import characteristicColumnsConfig from './service-summary-characteristics.json';
import hivMonitoringColumnsConfig from './service-summary-hiv-monitoring.json';
import lastVisitColumnsConfig from './service-summary-visit.json';

interface OverviewListProps {
  patientUuid: string;
}

const ServiceSummaryOverviewList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig();

  const headerCharacteristics = t('characteristicsTitle', 'Characteristics');
  const headerHIVMonitoring = t('hivMonitoring', 'HIV Monitoring');
  const headerLastVisitDetails = t('lastVisitDetails', 'Last Visit Details');

  const columnsCharacteristics: EncounterTileColumn[] = getEncounterTileColumns(characteristicColumnsConfig, config);

  const columnsHIVMonitoring: EncounterTileColumn[] = getEncounterTileColumns(hivMonitoringColumnsConfig, config);

  const columnsLastVisitDetails: EncounterTileColumn[] = getEncounterTileColumns(lastVisitColumnsConfig, config);

  return (
    <>
      <EncounterTile patientUuid={patientUuid} columns={columnsCharacteristics} headerTitle={headerCharacteristics} />
      <EncounterTile patientUuid={patientUuid} columns={columnsHIVMonitoring} headerTitle={headerHIVMonitoring} />
      <EncounterTile patientUuid={patientUuid} columns={columnsLastVisitDetails} headerTitle={headerLastVisitDetails} />
    </>
  );
};

export default ServiceSummaryOverviewList;
