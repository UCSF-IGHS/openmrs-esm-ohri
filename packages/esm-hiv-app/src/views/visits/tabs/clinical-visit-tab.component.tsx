import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterListColumn, getObsFromEncounter, EncounterList } from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  clinicalVisitEncounterType,
  ClinicalVisitFormName,
  dateOfEncounterConcept,
  returnVisitDateConcept,
  tbScreeningOutcome,
  visitTypeConcept,
} from '../../../constants';
import { moduleName } from '../../../index';

interface ClinicalVisitListProps {
  patientUuid: string;
}

const ClinicalVisitList: React.FC<ClinicalVisitListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('clinicalVisit', 'Clinical Visit');
  const displayText = t('clinicalVisit', 'Clinical Visit');

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'clinicalVisitDate',
        header: t('visitDate', 'Visit Date'),
        getValue: (encounter) => {
          const rawVisitDate = getObsFromEncounter(encounter, dateOfEncounterConcept, true);
          console.log('Raw Visit Date:', rawVisitDate);

          // Process the rawVisitDate and return a string
          if (rawVisitDate) {
            const dateObject = new Date(rawVisitDate);
            const formattedDate = dateObject.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            return formattedDate;
          } else {
            return '--'; // Default value if there's no date
          }
        },
        link: {
          getUrl: (encounter) => encounter.url,
          handleNavigate: (encounter) => {
            encounter.launchFormActions?.viewEncounter();
          },
        },
      },
      {
        key: 'clinicalVisitType',
        header: t('visitType', 'Visit Type'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, visitTypeConcept);
        },
      },
      {
        key: 'clinicalScreeningOutcome',
        header: t('tbScreeningOutcome', 'TB Screening Outcome'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, tbScreeningOutcome);
        },
      },
      {
        key: 'clinicalNextAppointmentDate',
        header: t('nextAppointmentDate', 'Next Appointment Date'),
        getValue: (encounter) => {
          const rawDate = getObsFromEncounter(encounter, returnVisitDateConcept, true);
          console.log('Raw Date:', rawDate); // Add this line for debugging

          // Process the rawDate and return a string
          if (rawDate) {
            const dateObject = new Date(rawDate);
            const formattedDate = dateObject.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            return formattedDate;
          } else {
            return '--'; // Default value if there's no date
          }
        },
      },
      // ... (other columns)
    ],
    [],
  );

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={clinicalVisitEncounterType}
      formList={[{ name: ClinicalVisitFormName }]}
      columns={columns}
      description="clinical visit encounters"
      headerTitle={headerTitle}
      launchOptions={{
        moduleName: moduleName,
      }}
    />
  );
};

export default ClinicalVisitList;
