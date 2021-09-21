import { openmrsFetch } from '@openmrs/esm-framework';
import DataTableSkeleton from 'carbon-components-react/lib/components/DataTableSkeleton';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';
import { launchOHRIWorkSpace } from '../../../workspace/ohri-workspace-utils';
import { clinicalVisitEncounterType, encounterRepresentation } from '../../../constants';
import { getForm } from '../../../utils/forms-loader';
import { launchForm } from '../../../utils/ohri-forms-commons';
import { OHRIFormLauncherWithIntent } from '../../../components/ohri-form-launcher/ohri-form-laucher.componet';
import EncounterList from '../../../components/encounter-list/encounter-list.component';

interface ClinicalVisitWidgetProps {
  patientUuid: string;
}

const ClinicalVisitWidget: React.FC<ClinicalVisitWidgetProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const [tableRows, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const [clinicalVisitForm, setClinicalVisitForm] = useState(getForm('hiv', 'clinical_visit'));

  const tableHeaders = [
    { key: 'visitDate', header: 'Visit Date', isSortable: true },
    { key: 'visitType', header: 'Visit Type' },
    { key: 'regimen', header: 'Regimen' },
    { key: 'differentiatedCareService', header: 'Differentiated Care Service' },
    { key: 'nextAppointmentDate', header: 'Next Appointment Date' },
    { key: 'action', header: 'Action' },
  ];

  const loadRows = useCallback(
    encounterType => {
      const query = `encounterType=${encounterType}&patient=${patientUuid}`;
      let rows = [];

      openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${encounterRepresentation}`).then(({ data }) => {
        //TODO: Implement table
      });
    },
    [patientUuid],
  );

  const forceComponentUpdate = () => setCounter(counter + 1);

  const launchClinicalVisitForm = (form?: any) => {
    launchOHRIWorkSpace('ohri-forms-view-ext', {
      title: clinicalVisitForm?.name,
      screenSize: 'maximize',
      state: { updateParent: forceComponentUpdate, formJson: form || clinicalVisitForm },
    });
  };

  useEffect(() => {
    loadRows(clinicalVisitEncounterType);
  }, [loadRows, counter]);

  return (
    <>
      {/*<EncounterList patientUuid={patientUuid} encounterUuid={clinicalVisitEncounterType} columns={} />*/}

      {isLoading ? (
        <DataTableSkeleton rowCount={5} />
      ) : tableRows.length > 0 ? (
        <>
          <div>Table goes here</div>
        </>
      ) : (
        <EmptyState
          displayText={t('clinicalVisitEncounters', 'clinical visit encounters')}
          headerTitle={t('clinicalVisitTitle', 'Clinical Visits')}
          launchForm={launchClinicalVisitForm}
          launchFormComponent={
            <OHRIFormLauncherWithIntent
              formJson={clinicalVisitForm}
              launchForm={launchClinicalVisitForm}
              onChangeIntent={setClinicalVisitForm}
            />
          }
        />
      )}
    </>
  );
};

export default ClinicalVisitWidget;
