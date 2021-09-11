import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';
import { OHRIFormLauncherEmpty } from '../../../components/ohri-form-launcher/ohri-form-empty-launcher.component';
import { launchOHRIWorkSpace } from '../../../workspace/ohri-workspace-utils';
import { clinicalVisitEncounterType, encounterRepresentation } from '../../../constants';
import { getForm } from '../../../utils/forms-loader';
import { openmrsFetch } from '@openmrs/esm-framework';

interface OverviewListProps {
  patientUuid: string;
}

const ClinicalVisitOverviewList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const [tableRows, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const [clinicalVisitForm, setClinicalVisitForm] = useState(getForm('hiv', 'clinical_visit'));

  const loadRows = useCallback(
    encounterType => {
      const query = `encounterType=${encounterType}&patient=${patientUuid}`;

      openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${encounterRepresentation}`).then(({ data }) => {
        // console.log(data);
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

  const headerTitle = t('clinicalVisit', 'Clinical Visit');
  const displayText = t('clinicalVisit', 'Clinical Visit');

  return (
    <>
      <EmptyState
        displayText={displayText}
        headerTitle={headerTitle}
        launchFormComponent={<OHRIFormLauncherEmpty launchForm={launchClinicalVisitForm} />}
      />
    </>
  );
};

export default ClinicalVisitOverviewList;
