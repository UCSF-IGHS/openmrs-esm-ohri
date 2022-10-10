import { openmrsFetch } from '@openmrs/esm-framework';
import { DataTableSkeleton } from '@carbon/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState, OHRIFormLauncherEmpty, launchForm } from '@ohri/openmrs-esm-ohri-commons-lib';
import { clinicalVisitEncounterType, encounterRepresentation } from '../../../../constants';
import { getForm } from '@ohri/openmrs-ohri-form-engine-lib';

interface ClinicalVisitWidgetProps {
  patientUuid: string;
}

const ClinicalVisitWidget: React.FC<ClinicalVisitWidgetProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const [tableRows, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const [clinicalVisitForm, setClinicalVisitForm] = useState(getForm('hiv', 'clinical_visit'));

  const loadRows = useCallback(
    (encounterType) => {
      const query = `encounterType=${encounterType}&patient=${patientUuid}`;

      openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${encounterRepresentation}`).then(({ data }) => {
        //TODO: Implement table
      });
    },
    [patientUuid],
  );

  const forceComponentUpdate = () => setCounter(counter + 1);

  useEffect(() => {
    loadRows(clinicalVisitEncounterType);
  }, [loadRows, counter]);

  return (
    <>
      {isLoading ? (
        <DataTableSkeleton rowCount={5} />
      ) : tableRows.length > 0 ? (
        <>
          <div>Table goes here</div>
        </>
      ) : (
        <EmptyState
          displayText={t('clinicalVisitDisplay', 'clinical visit encounters')}
          headerTitle={t('clinicalVisitTitle', 'Clinical Visits')}
          launchFormComponent={
            <OHRIFormLauncherEmpty launchForm={() => launchForm(clinicalVisitForm, forceComponentUpdate)} />
          }
        />
      )}
    </>
  );
};

export default ClinicalVisitWidget;
