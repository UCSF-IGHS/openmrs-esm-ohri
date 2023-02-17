import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CardSummary,
  PatientChartProps,
  ExpandableList,
  getObsFromEncounter,
  TileSummaryProps,
  fetchPatientRelationships,
  EncounterListColumn,
  EncounterList,
  basePath,
  getTotalANCVisits,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  antenatalEncounterType,
  artStartDate,
  eDDConcept,
  followUpDateConcept,
  labourAndDeliveryEncounterType,
  motherPostnatalEncounterType,
  motherStatusConcept,
  nextVisitDateConcept,
  pTrackerIdConcept,
  PTrackerIdentifierType,
  visitDate,
  mchEncounterType,
  mchVisitsTypes,
  hivStatusAtDeliveryConcept,
  artInitiationConcept,
} from '../../../constants';
import moment from 'moment';
import { moduleName } from '../../..';
import { Link } from '@carbon/react';
import { navigate } from '@openmrs/esm-framework';
import { fetchPatientIdentifiers, getEstimatedDeliveryDate } from '../../../api/api';

interface pregnancyOutcomeProps {
  pTrackerId: string;
  dateOfBirth: string;
  infantStatus: string;
}
export interface familyItemProps {
  id: string;
  name: any;
  relationship: string;
  dateOfBirth: string;
  hivStatus: string;
}
const CurrentPregnancy: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const currentPregnancyHeader = t('currentPregnancy', 'Recent Pregnancy');
  const arvTherapyHeader = t('artTherapy', 'ART Therapy');
  const appointmentsHeader = t('appointments', 'Appointments');
  const familyHeader = t('family', 'Family');
  const pregnancyOutcomeHeader = t('pregnancyOutcome', 'Pregnancy Outcome');
  const previousVisitsTitle = t('previousVisitsSummary', 'Previous Visits');
  const [relatives, setRelatives] = useState([]);
  const [relativeToIdentifierMap, setRelativeToIdentifierMap] = useState([]);

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
  const headersPregnancyOutcome = [
    {
      header: t('pTrackerId', 'PTracker ID'),
      key: 'pTrackerId',
    },
    {
      header: t('dateOfBirth', 'Date of Birth'),
      key: 'dateOfBirth',
    },
    {
      header: t('infantStatus', 'Infant Status at Birth'),
      key: 'infantStatus',
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
  useEffect(() => {
    const relativeToPtrackerPromises = relatives.map((relative) => getChildPTracker(relative.personB.uuid));
    Promise.all(relativeToPtrackerPromises).then((values) => {
      setRelativeToIdentifierMap(values.map((value) => ({ patientId: value.patientId, pTrackerId: value.pTrackerId })));
    });
  }, [relatives]);

  async function getChildPTracker(patientUuid: string) {
    let pTrackerMap = { patientId: '', pTrackerId: '--' };
    const identifiers = await fetchPatientIdentifiers(patientUuid);
    if (identifiers) {
      pTrackerMap.pTrackerId = identifiers.find((id) => id.identifierType.uuid === PTrackerIdentifierType).identifier;
      pTrackerMap.patientId = patientUuid;
    }
    return pTrackerMap;
  }

  const parentRelationships: familyItemProps[] = useMemo(() => {
    let items = [];
    relatives.forEach((relative) => {
      let patientLink = (
        <Link
          onClick={(e) => {
            e.preventDefault();
            navigate({ to: `${basePath}${relative.personB.uuid}/chart` });
          }}>
          {relative.personB.display}
        </Link>
      );
      let relativeObject: familyItemProps = {
        id: relativeToIdentifierMap.find((entry) => entry.patientId === relative.personB.uuid)?.pTrackerId,
        name: patientLink,
        relationship: relative.relationshipType.displayBIsToA,
        dateOfBirth: moment(relative.personB.birthdate).format('DD-MMM-YYYY'),
        hivStatus: '',
      };
      items.push(relativeObject);
    });
    return items;
  }, [relatives, relativeToIdentifierMap]);

  const currentPregnancyColumns: TileSummaryProps[] = useMemo(
    () => [
      {
        key: 'motherHIVStatus',
        header: t('motherHIVStatus', 'Mother HIV Status'),
        encounterUuid: labourAndDeliveryEncounterType,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, hivStatusAtDeliveryConcept);
        },
      },
      {
        key: 'expectedDeliveryDate',
        header: t('expectedDeliveryDate', 'Expected Delivery Date'),
        encounterUuid: antenatalEncounterType,
        getObsValue: async (encounter) => {
          const currentPTrackerId = getObsFromEncounter(encounter, pTrackerIdConcept);
          const edd = await getEstimatedDeliveryDate(patientUuid, currentPTrackerId);
          return edd ? edd?.rows[0]?.estimated_delivery_date : '---';
        },
        hasSummary: true,
        getSummaryObsValue: (encounter) => {
          let edd = getObsFromEncounter(encounter, eDDConcept, true);
          if (edd !== '--') {
            const days = calculateDateDifferenceInDate(edd);
            edd = edd > 0 ? `In ${days}` : '';
          }
          return edd;
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
    ],
    [],
  );

  const arvTherapyColumns: TileSummaryProps[] = useMemo(
    () => [
      {
        key: 'artInitiation',
        header: t('artInitiation', 'ART Initiation'),
        encounters: [],
        encounterUuids: [motherPostnatalEncounterType, labourAndDeliveryEncounterType, antenatalEncounterType],
        getObsValue: (encounters) => {
          let artInitiation;
          artInitiation = getObsFromEncounter(encounters[0], artInitiationConcept);
          if (artInitiation === '--') {
            artInitiation = getObsFromEncounter(encounters[1], artInitiationConcept);
          } else {
            artInitiation = getObsFromEncounter(encounters[1], artInitiationConcept);
          }
          return artInitiation;
        },
      },
      {
        key: 'artStartDate',
        header: t('artStartDate', 'ART Start Date'),
        encounters: [],
        encounterUuids: [motherPostnatalEncounterType, labourAndDeliveryEncounterType, antenatalEncounterType],
        getObsValue: (encounters) => {
          let artInitiationDate;
          artInitiationDate = getObsFromEncounter(encounters[0], artStartDate, true);
          if (artInitiationDate === '--') {
            artInitiationDate = getObsFromEncounter(encounters[1], artStartDate, true);
          } else {
            artInitiationDate = getObsFromEncounter(encounters[1], artStartDate, true);
          }
          return artInitiationDate;
        },
      },
    ],
    [],
  );

  const appointmentsColumns: TileSummaryProps[] = useMemo(
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
          if (nextVisitDate !== '--') {
            const days = calculateDateDifferenceInDate(nextVisitDate);
            nextVisitDate = nextVisitDate > 0 ? `In ${days}` : '';
          }
          return nextVisitDate;
        },
      },
      {
        key: 'ancVisitsAttended',
        header: t('ancVisitsAttended', 'ANC visits attended'),
        encounterUuid: antenatalEncounterType,
        getObsValue: async (encounter) => {
          const currentPTrackerId = getObsFromEncounter(encounter, pTrackerIdConcept);
          const totalVisits = await getTotalANCVisits(patientUuid, currentPTrackerId);
          return totalVisits.rows[0].total;
        },
      },
    ],
    [],
  );

  const calculateDateDifferenceInDate = (givenDate: string): string => {
    const dateDifference = new Date(givenDate).getTime() - new Date().getTime();
    const totalDays = Math.floor(dateDifference / (1000 * 3600 * 24));
    return `${totalDays} day(s)`;
  };

  const columnsMotherPreviousVisit: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'visitType',
        header: t('visitType', 'Visit Type'),
        getValue: (encounter) => {
          return encounter.encounterType.name;
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
            form: selectMCHFomrViewAction(encounter),
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

  const filterMaterNalEncounters = (encounter) => {
    const encounterName = encounter.encounterType.name;
    const isMaternalEncounter = (maternal) => encounterName.indexOf(maternal) !== -1;
    const filter = mchVisitsTypes.some(isMaternalEncounter);
    return filter;
  };

  const selectMCHFomrViewAction = (encounter) => {
    const encounterType = encounter.encounterType.name;
    if (encounterType === mchVisitsTypes[0]) {
      return { name: 'antenatal', package: 'maternal_health' };
    } else if (encounterType === mchVisitsTypes[1]) {
      return { name: 'labour_and_delivery', package: 'maternal_health' };
    } else {
      return { name: 'mother_postnatal_form', package: 'maternal_health' };
    }
  };

  return (
    <div>
      <CardSummary patientUuid={patientUuid} headerTitle={currentPregnancyHeader} columns={currentPregnancyColumns} />
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', height: '15rem' }}>
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

      {/* <ExpandableList
        patientUuid={patientUuid}
        headerTitle={pregnancyOutcomeHeader}
        headers={headersPregnancyOutcome}
        items={parentRelationships}
        isActionable={true}
        isStriped={true}
        launchOptions={{
          hideFormLauncher: true,
          moduleName: '',
          displayText: '',
        }}
      /> */}

      <ExpandableList
        patientUuid={patientUuid}
        headerTitle={familyHeader}
        headers={headersFamily}
        items={parentRelationships}
        isActionable={true}
        isStriped={true}
        launchOptions={{
          hideFormLauncher: true,
          moduleName: '',
          displayText: '',
        }}
      />

      <div style={{ padding: '1rem' }}>
        <EncounterList
          patientUuid={patientUuid}
          encounterUuid={mchEncounterType}
          columns={columnsMotherPreviousVisit}
          description={previousVisitsTitle}
          headerTitle={previousVisitsTitle}
          form={{ package: 'maternal_health', name: 'antenatal' }}
          launchOptions={{
            hideFormLauncher: true,
            moduleName: moduleName,
            displayText: '',
          }}
          filter={filterMaterNalEncounters}
        />
      </div>
    </div>
  );
};

export default CurrentPregnancy;
