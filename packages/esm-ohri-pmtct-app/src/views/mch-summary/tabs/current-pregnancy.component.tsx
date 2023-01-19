import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CardSummary,
  EncounterTileColumn,
  PatientChartProps,
  ExpandableList,
  getObsFromEncounter,
  TileSummaryProps,
  fetchPatientRelationships,
  itemProps,
  EncounterListColumn,
  EncounterList,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  ancVisitsConcept,
  antenatalEncounterType,
  artStartDate,
  eDDConcept,
  followUpDateConcept,
  hivTestResultConcept,
  infantPostnatalEncounterType,
  labourAndDeliveryEncounterType,
  mchVisitType,
  motherPostnatalEncounterType,
  motherStatusConcept,
  antenatalVisitType,
  nextVisitDateConcept,
  visitDate,
} from '../../../constants';
import moment from 'moment';
import { moduleName } from '../../..';

const CurrentPregnancy: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const currentPregnancyHeader = t('currentPregnancy', 'Current Pregnancy');
  const arvTherapyHeader = t('artTherapy', 'ART Therapy');
  const appointmentsHeader = t('appointments', 'Appointments');
  const familyHeader = t('family', 'Family');
  const previousVisitsTitle = t('previousVisitsSummary', 'Previous Visits');
  const [relatives, setRelatives] = useState([]);

  const headersFamily = [
    {
      header: t('id', 'ID'),
      key: 'id',
    },
    {
      header: t('name', 'Name'),
      key: 'name',
    },
    {
      header: t('relationship', 'Relationship'),
      key: 'relationship',
    },
    {
      header: t('dateOfBirth', 'Date of birth'),
      key: 'dateOfBirth',
    },
    {
      header: t('hivStatus', 'HIV Status'),
      key: 'hivStatus',
    },
  ];

  useEffect(() => {
    getParentRelationships();
  }, []);

  async function getParentRelationships() {
    let relationships = [];
    const relationshipsData = await fetchPatientRelationships(patientUuid);
    if (relationshipsData.length) {
      relationshipsData.forEach((item) => {
        relationships.push(item);
      });
    }
    setRelatives(relationships);
  }

  const currentPregnancyColumns: TileSummaryProps[] = useMemo(
    () => [
      {
        key: 'motherHIVStatus',
        header: t('motherHIVStatus', 'Mother HIV Status'),
        encounters: [],
        encounterUuids: [motherPostnatalEncounterType, labourAndDeliveryEncounterType, antenatalEncounterType],
        getObsValue: (encounters) => {
          return getObsFromMultipleEncounters(encounters);
        },
        hasSummary: true,
        getSummaryObsValue: (encounter) => {
          if (getObsFromEncounter(encounter, hivTestResultConcept) === '--') {
            return '--';
          } else {
            return getObsFromEncounter(encounter, visitDate, true);
          }
        },
      },
      {
        key: 'expectedDeliveryDate',
        header: t('expectedDeliveryDate', 'Expected Delivery Date'),
        encounterUuid: antenatalEncounterType,
        hasSummary: true,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, eDDConcept, true);
        },
        getSummaryObsValue: (encounter) => {
          let edd = getObsFromEncounter(encounter, eDDConcept, true);
          return edd === '--' ? edd : `In ${calculateDateDifferenceInDate(edd)}`;
        },
      },
      {
        key: 'motherStatus',
        header: t('motherStatus', 'Mother Status'),
        encounterUuid: labourAndDeliveryEncounterType,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, motherStatusConcept);
        },
      },
      {
        key: 'pregancyOutcome',
        header: t('pregancyOutcome', 'Pregnancy Outcome'),
        encounterUuid: '--',
        getObsValue: (encounter) => {
          return '--';
        },
      },
    ],
    [],
  );

  const getObsFromMultipleEncounters = (encounters: any) => {
    let artInitiationDate;
    artInitiationDate = getObsFromEncounter(encounters[0], artStartDate, true);
    if (artInitiationDate === '--') {
      artInitiationDate = getObsFromEncounter(encounters[1], artStartDate, true);
    } else {
      artInitiationDate = getObsFromEncounter(encounters[1], artStartDate, true);
    }
    return artInitiationDate;
  };

  const arvTherapyColumns: TileSummaryProps[] = useMemo(
    () => [
      {
        key: 'artInitiation',
        header: t('artInitiation', 'ART Initiation'),
        encounters: [],
        encounterUuids: [motherPostnatalEncounterType, labourAndDeliveryEncounterType, antenatalEncounterType],
        getObsValue: (encounters) => {
          return getObsFromMultipleEncounters(encounters);
        },
      },
      {
        key: 'artStartDate',
        header: t('artStartDate', 'ART Start Date'),
        encounters: [],
        encounterUuids: [motherPostnatalEncounterType, labourAndDeliveryEncounterType, antenatalEncounterType],
        getObsValue: (encounters) => {
          return getObsFromMultipleEncounters(encounters);
        },
      },
    ],
    [],
  );

  const appointmentsColumns: EncounterTileColumn[] = useMemo(
    () => [
      {
        key: 'nextAppointmentDate',
        header: t('nextAppointmentDate', 'Next Appointment Date'),
        encounterUuid: antenatalEncounterType,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, nextVisitDateConcept, true);
        },
        hasSummary: true,
        getSummaryObsValue: (encounter) => {
          let nextVisitDate = getObsFromEncounter(encounter, nextVisitDateConcept, true);
          return nextVisitDate === '--' ? nextVisitDate : `In ${calculateDateDifferenceInDate(nextVisitDate)}`;
        },
      },
      {
        key: 'ancVisitsAttended',
        header: t('ancVisitsAttended', 'ANC visits attended'),
        encounterUuid: antenatalEncounterType,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, ancVisitsConcept);
        },
      },
    ],
    [],
  );

  const parentRelationships: itemProps[] = useMemo(() => {
    let items = [];
    relatives.forEach((relative) => {
      let relativeObject: itemProps = {
        id: '',
        name: relative.personB.display,
        relationship: relative.relationshipType.displayBIsToA,
        dateOfBirth: moment(relative.personB.birthdate).format('DD-MMM-YYYY'),
        hivStatus: '',
      };
      items.push(relativeObject);
    });
    return items;
  }, [relatives]);

  const calculateDateDifferenceInDate = (givenDate: string): string => {
    const dateDifference = new Date().getTime() - new Date(givenDate).getTime();
    const totalDays = Math.floor(dateDifference / (1000 * 3600 * 24));
    return `${totalDays} days`;
  };

  const columnsMotherPreviousVisit: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'visitType',
        header: t('visitType', 'Visit Type'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, antenatalVisitType);
        },
      },
      {
        key: 'visitDate',
        header: t('visitDate', 'Visit date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, visitDate, true);
        },
      },
      {
        key: 'facility',
        header: t('facility', 'Facility'),
        getValue: (encounter) => {
          return encounter.location.name;
        },
      },
      {
        key: 'nextFollowUpDate',
        header: t('nextFollowUpDate', 'Next Follow-up date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, followUpDateConcept, true);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: 'antenatal', package: 'maternal_health' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewDetails', 'View details'),
            mode: 'view',
          },
        ],
      },
    ],
    [],
  );

  const columnsChildPreviousVisit: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'visitType',
        header: t('visitType', 'Visit Type'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, mchVisitType);
        },
      },
      {
        key: 'visitDate',
        header: t('visitDate', 'Visit date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, visitDate, true);
        },
      },
      {
        key: 'facility',
        header: t('facility', 'Facility'),
        getValue: (encounter) => {
          return encounter.location.name;
        },
      },
      {
        key: 'nextFollowUpDate',
        header: t('nextFollowUpDate', 'Next Follow-up date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, followUpDateConcept, true);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: 'infant_postnatal', package: 'child_health' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewDetails', 'View details'),
            mode: 'view',
          },
        ],
      },
    ],
    [],
  );

  return (
    <div>
      <CardSummary patientUuid={patientUuid} headerTitle={currentPregnancyHeader} columns={currentPregnancyColumns} />
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        <CardSummary
          patientUuid={patientUuid}
          headerTitle={arvTherapyHeader}
          columns={arvTherapyColumns}
          isActionable={true}
        />
        <CardSummary
          patientUuid={patientUuid}
          headerTitle={appointmentsHeader}
          columns={appointmentsColumns}
          isActionable={true}
        />
      </div>

      <ExpandableList
        headerTitle={familyHeader}
        headers={headersFamily}
        items={parentRelationships}
        isActionable={true}
        isStriped={true}
        encounterUuid={antenatalEncounterType} // This is the wrong encounter type
        patientUuid={patientUuid}
        launchOptions={{
          hideFormLauncher: true,
          moduleName: '',
          displayText: '',
        }}
      />

      <div style={{ padding: '1rem' }}>
        <EncounterList
          patientUuid={patientUuid}
          encounterUuid={antenatalEncounterType}
          columns={columnsMotherPreviousVisit}
          description={previousVisitsTitle}
          headerTitle={previousVisitsTitle}
          form={{ package: 'maternal_health', name: 'antenatal' }}
          launchOptions={{
            hideFormLauncher: true,
            moduleName: moduleName,
            displayText: '',
          }}
        />
      </div>
      <div style={{ padding: '1rem' }}>
        <EncounterList
          patientUuid={patientUuid}
          encounterUuid={infantPostnatalEncounterType}
          columns={columnsChildPreviousVisit}
          description={previousVisitsTitle}
          headerTitle={previousVisitsTitle}
          form={{ package: 'child_health', name: 'infant_postnatal' }}
          launchOptions={{
            hideFormLauncher: true,
            moduleName: moduleName,
            displayText: '',
          }}
        />
      </div>
    </div>
  );
};

export default CurrentPregnancy;
