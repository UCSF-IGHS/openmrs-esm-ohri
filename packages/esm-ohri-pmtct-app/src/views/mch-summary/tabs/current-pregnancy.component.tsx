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
  ExpandableListColumn,
  fetchPatientIdentifiers,
  basePath,
  getTotalANCVisits,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  ancVisitsConcept,
  antenatalEncounterType,
  artInitiationConcept,
  artStartDate,
  eDDConcept,
  hivTestResultConcept,
  labourAndDeliveryEncounterType,
  motherPostnatalEncounterType,
  motherStatusConcept,
  nextVisitDateConcept,
  pTrackerIdConcept,
  PTrackerIdentifierType,
  visitDate,
} from '../../../constants';
import moment from 'moment';
import { Link } from '@carbon/react';
import { navigate } from '@openmrs/esm-framework';

const CurrentPregnancy: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const currentPregnancyHeader = t('currentPregnancy', 'Current Pregnancy');
  const arvTherapyHeader = t('artTherapy', 'ART Therapy');
  const appointmentsHeader = t('appointments', 'Appointments');
  const familyHeader = t('family', 'Family');
  const [relatives, setRelatives] = useState([]);
  const [ancVisitTotal, setancVisitTotal] = useState(0);
  const [latestPTrackerId, setLatestPTrackerId] = useState('');
  const [relativeToIdentifierMap, setRelativeToIdentifierMap] = useState([]);
  const headers = [
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
  /* eslint-disable no-debugger, no-console */
  useEffect(() => {
    getParentRelationships();
  }, []);

  useEffect(() => {
    getTotalANCVisits(patientUuid, '100200300').then((data) => {
      console.log(data.rows[0].total);
    });
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

  const parentRelationships: itemProps[] = useMemo(() => {
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
      let relativeObject: itemProps = {
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
        encounters: [],
        encounterUuids: [motherPostnatalEncounterType, labourAndDeliveryEncounterType, antenatalEncounterType],
        getObsValue: (encounters) => {
          let artInitiation;
          artInitiation = getObsFromEncounter(encounters[0], hivTestResultConcept);
          if (artInitiation === '--') {
            artInitiation = getObsFromEncounter(encounters[1], hivTestResultConcept);
          } else {
            artInitiation = getObsFromEncounter(encounters[1], hivTestResultConcept);
          }
          return artInitiation;
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
          const currentPTrackerId = getObsFromEncounter(encounter, pTrackerIdConcept);
          getTotalANCVisits(patientUuid, currentPTrackerId).then((data) => {
            setancVisitTotal(data.rows[0].total);
          });
          console.log(currentPTrackerId);
          return ancVisitTotal.toString();
        },
      },
    ],
    [],
  );

  const calculateDateDifferenceInDate = (givenDate: string): string => {
    const dateDifference = new Date().getTime() - new Date(givenDate).getTime();
    const totalDays = Math.floor(dateDifference / (1000 * 3600 * 24));
    return `${totalDays} days`;
  };

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
        headers={headers}
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
    </div>
  );
};

export default CurrentPregnancy;
