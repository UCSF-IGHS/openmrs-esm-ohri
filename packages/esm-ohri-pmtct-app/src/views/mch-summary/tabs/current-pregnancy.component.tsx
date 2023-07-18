import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  PatientChartProps,
  ExpandableList,
  getObsFromEncounter,
  fetchPatientRelationships,
  EncounterListColumn,
  EncounterList,
  basePath,
  fetchPatientLastEncounter,
  SummaryCardColumn,
  SummaryCard,
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
  artInitiationConcept,
  infantDeliveryGroupingConcept,
  infantDateOfBirth,
  infantPTrackerIdConcept,
  infantStatusAtBirthConcept,
} from '../../../constants';
import moment from 'moment';
import { moduleName } from '../../..';
import { Link } from '@carbon/react';
import { navigate } from '@openmrs/esm-framework';
import {
  fetchMotherHIVStatus,
  fetchPatientIdentifiers,
  getAncVisitCount,
  getEstimatedDeliveryDate,
} from '../../../api/api';

interface pregnancyOutcomeProps {
  id: string;
  pTrackerId: string;
  dateOfBirth: string;
  infantStatus: string;
}
export interface familyItemProps {
  id: string;
  pTrackerId: string;
  name: any;
  relationship: string;
  dateOfBirth: string;
  hivStatus: string;
}
const CurrentPregnancy: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const currentPregnancyHeader = t('recentPregnancy', 'Recent Pregnancy');
  const arvTherapyHeader = t('art', 'ART');
  const appointmentsHeader = t('appointments', 'Appointments');
  const familyHeader = t('family', 'Family');
  const pregnancyOutcomeHeader = t('pregnancyOutcome', 'Pregnancy Outcome');
  const previousVisitsTitle = t('previousVisitsSummary', 'Previous Visits');
  const [relatives, setRelatives] = useState([]);
  const [relativeToIdentifierMap, setRelativeToIdentifierMap] = useState([]);
  const [pregnancyOutcomes, setPregnancyOutcomes] = useState([]);

  const headersFamily = [
    {
      header: t('pTrackerId', 'PTracker ID'),
      key: 'pTrackerId',
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
    getParentCurrentLabourAndDeliveryEncounter();
    getParentRelationships();
  }, []);

  async function getParentRelationships() {
    let relationships = [];
    const relationshipsData = await fetchPatientRelationships(patientUuid);
    if (relationshipsData?.length) {
      relationshipsData.forEach((item) => {
        relationships.push(item);
      });
    }
    setRelatives(relationships);
  }

  async function getParentCurrentLabourAndDeliveryEncounter() {
    const currentPregnancyANCEncounter = await fetchPatientLastEncounter(patientUuid, antenatalEncounterType);
    const currentPregnancyLabourAndDeliveryEncounter = await fetchPatientLastEncounter(
      patientUuid,
      labourAndDeliveryEncounterType,
    );
    if (currentPregnancyLabourAndDeliveryEncounter.encounterDatetime > currentPregnancyANCEncounter.encounterDatetime) {
      setPregnancyOutcomes(
        currentPregnancyLabourAndDeliveryEncounter.obs.filter(
          (obs) => obs.concept.uuid === infantDeliveryGroupingConcept,
        ),
      );
    }
  }
  useEffect(() => {
    const relativeToPtrackerPromises = relatives.map((relative) => getChildPTracker(relative.personB.uuid));
    Promise.all(relativeToPtrackerPromises).then((values) => {
      setRelativeToIdentifierMap(values.map((value) => ({ patientId: value.patientId, pTrackerId: value.pTrackerId })));
    });
  }, [relatives]);

  async function getChildPTracker(patientUuid: string) {
    let pTrackerMap = { patientId: patientUuid, pTrackerId: '--' };
    const identifiers = await fetchPatientIdentifiers(patientUuid);
    if (identifiers?.length) {
      pTrackerMap.pTrackerId =
        identifiers.find((id) => id.identifierType.uuid === PTrackerIdentifierType)?.identifier ?? '--';
    }
    return pTrackerMap;
  }

  const parentRelationships: familyItemProps[] = useMemo(() => {
    let items = [];
    relatives.forEach((relative) => {
      //Ensure a parent is not their own child
      if (relative.personB.uuid !== patientUuid) {
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
          id: relative.uuid,
          pTrackerId: relativeToIdentifierMap.find((entry) => entry.patientId === relative.personB.uuid)?.pTrackerId,
          name: patientLink,
          relationship: relative.relationshipType.displayBIsToA,
          dateOfBirth: moment(relative.personB.birthdate).format('DD-MMM-YYYY'),
          hivStatus: '',
        };
        items.push(relativeObject);
      }
    });

    return items;
  }, [relatives, relativeToIdentifierMap]);

  const childrenDetails: pregnancyOutcomeProps[] = useMemo(() => {
    let items = [];
    pregnancyOutcomes.forEach((child) => {
      let infantStatusObs = child.groupMembers.find((member) => member.concept.uuid === infantStatusAtBirthConcept);
      let childObject: pregnancyOutcomeProps = {
        id: child.uuid,
        pTrackerId: child.groupMembers.find((member) => member.concept.uuid === infantPTrackerIdConcept)?.value,
        dateOfBirth: moment(
          child.groupMembers.find((member) => member.concept.uuid === infantDateOfBirth)?.value,
        ).format('DD-MMM-YYYY'),
        infantStatus:
          infantStatusObs.value?.names?.find((conceptName) => conceptName.conceptNameType === 'SHORT')?.name ||
          infantStatusObs.value.name.name,
      };
      items.push(childObject);
    });
    return items;
  }, [pregnancyOutcomes]);

  const currentPregnancyColumns: SummaryCardColumn[] = useMemo(
    () => [
      {
        key: 'motherHIVStatus',
        header: t('motherHIVStatus', 'Mother HIV Status'),
        encounterTypes: [labourAndDeliveryEncounterType],
        getObsValue: async ([encounter]) => {
          const currentPTrackerId = getObsFromEncounter(encounter, pTrackerIdConcept);
          // const totalVisits = await fetchMotherHIVStatus(patientUuid, currentPTrackerId);
          // return totalVisits.rows.length ? totalVisits.rows[0].mother_hiv_status : '--';
          return '--';
        },
      },
      {
        key: 'expectedDeliveryDate',
        header: t('expectedDeliveryDate', 'Expected Delivery Date'),
        encounterTypes: [antenatalEncounterType],
        getObsValue: async ([encounter]) => {
          return getObsFromEncounter(encounter, eDDConcept, true);
        },
        getObsSummary: ([encounter]) => {
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
        encounterTypes: [labourAndDeliveryEncounterType],
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, motherStatusConcept);
        },
      },
    ],
    [],
  );

  const arvTherapyColumns: SummaryCardColumn[] = useMemo(
    () => [
      {
        key: 'artInitiation',
        header: t('artInitiation', 'ART Initiation'),
        encounterTypes: [motherPostnatalEncounterType, labourAndDeliveryEncounterType, antenatalEncounterType],
        getObsValue: (encounters) => {
          const pncArtData = {
            artInitiation: getObsFromEncounter(encounters[0], artInitiationConcept),
            artStartDate: getObsFromEncounter(encounters[0], artStartDate, true),
            pTrackerId: getObsFromEncounter(encounters[0], pTrackerIdConcept),
          };
          const lndArtData = {
            artInitiation: getObsFromEncounter(encounters[1], artInitiationConcept),
            artStartDate: getObsFromEncounter(encounters[1], artStartDate, true),
            pTrackerId: getObsFromEncounter(encounters[1], pTrackerIdConcept),
          };
          const ancArtData = {
            artInitiation: getObsFromEncounter(encounters[2], artInitiationConcept),
            artStartDate: getObsFromEncounter(encounters[2], artStartDate, true),
            pTrackerId: getObsFromEncounter(encounters[2], pTrackerIdConcept),
          };
          const latestArtData = getLatestArtDetails(pncArtData, lndArtData, ancArtData);
          return latestArtData['artInitiation'];
        },
      },
      {
        key: 'artStartDate',
        header: t('artStartDate', 'ART Start Date'),
        encounterTypes: [motherPostnatalEncounterType, labourAndDeliveryEncounterType, antenatalEncounterType],
        getObsValue: (encounters) => {
          const pncArtData = {
            artInitiation: getObsFromEncounter(encounters[0], artInitiationConcept),
            artStartDate: getObsFromEncounter(encounters[0], artStartDate, true),
            pTrackerId: getObsFromEncounter(encounters[0], pTrackerIdConcept),
          };
          const lndArtData = {
            artInitiation: getObsFromEncounter(encounters[1], artInitiationConcept),
            artStartDate: getObsFromEncounter(encounters[1], artStartDate, true),
            pTrackerId: getObsFromEncounter(encounters[1], pTrackerIdConcept),
          };
          const ancArtData = {
            artInitiation: getObsFromEncounter(encounters[2], artInitiationConcept),
            artStartDate: getObsFromEncounter(encounters[2], artStartDate, true),
            pTrackerId: getObsFromEncounter(encounters[2], pTrackerIdConcept),
          };
          const latestArtData = getLatestArtDetails(pncArtData, lndArtData, ancArtData);
          return latestArtData['artStartDate'];
        },
      },
    ],
    [],
  );

  const appointmentsColumns: SummaryCardColumn[] = useMemo(
    () => [
      {
        key: 'nextAppointmentDate',
        header: t('nextAppointmentDate', 'Next Appointment Date'),
        encounterTypes: [antenatalEncounterType],
        getObsValue: ([encounter]) => {
          return getObsFromEncounter(encounter, nextVisitDateConcept, true);
        },
        getObsSummary: ([encounter]) => {
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
        encounterTypes: [antenatalEncounterType],
        getObsValue: async ([encounter]) => {
          const currentPTrackerId = getObsFromEncounter(encounter, pTrackerIdConcept);
          // const totalVisits = await getAncVisitCount(currentPTrackerId, patientUuid);
          // return totalVisits.rows.length ? totalVisits.rows[0].total : '0';
          return '--';
        },
      },
    ],
    [],
  );

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
            form: selectMCHFormViewAction(encounter),
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

  const getLatestArtDetails = (pncArtData, lndArtData, ancArtData) => {
    const allArtData = [pncArtData, lndArtData, ancArtData];
    const filteredArtData = allArtData.filter((row) => row.artInitiation !== '--');
    if (filteredArtData.length == 0) {
      return {
        artInitiation: '--',
        artStartDate: '--',
      };
    } else if (filteredArtData.length == 1) {
      return filteredArtData[0];
    } else {
      filteredArtData.sort((a, b) => b.pTrackerId.localeCompare(a.pTrackerId));
      return filteredArtData[0];
    }
  };

  const calculateDateDifferenceInDate = (givenDate: string): string => {
    const dateDifference = new Date(givenDate).getTime() - new Date().getTime();
    const totalDays = Math.floor(dateDifference / (1000 * 3600 * 24));
    return `${totalDays} day(s)`;
  };

  const filterMaterNalEncounters = (encounter) => {
    const encounterName = encounter.encounterType.name;
    const isMaternalEncounter = (maternal) => encounterName.indexOf(maternal) !== -1;
    const filter = mchVisitsTypes.some(isMaternalEncounter);
    return filter;
  };

  const selectMCHFormViewAction = (encounter) => {
    const encounterType = encounter.encounterType.name;
    if (encounterType === mchVisitsTypes[0]) {
      return { name: 'Antenatal Form', package: 'maternal_health' };
    } else if (encounterType === mchVisitsTypes[1]) {
      return { name: 'Labour & Delivery Form', package: 'maternal_health' };
    } else {
      return { name: 'Mother - Postnatal Form', package: 'maternal_health' };
    }
  };

  return (
    <div>
      <SummaryCard patientUuid={patientUuid} headerTitle={currentPregnancyHeader} columns={currentPregnancyColumns} />
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', height: '15rem' }}>
        <SummaryCard patientUuid={patientUuid} headerTitle={arvTherapyHeader} columns={arvTherapyColumns} />
        <SummaryCard patientUuid={patientUuid} headerTitle={appointmentsHeader} columns={appointmentsColumns} />
      </div>

      <ExpandableList
        patientUuid={patientUuid}
        headerTitle={pregnancyOutcomeHeader}
        headers={headersPregnancyOutcome}
        items={childrenDetails}
        isActionable={true}
        isStriped={true}
        launchOptions={{
          hideFormLauncher: true,
          moduleName: '',
          displayText: '',
        }}
      />

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

      <EncounterList
        patientUuid={patientUuid}
        encounterType={mchEncounterType}
        columns={columnsMotherPreviousVisit}
        description={previousVisitsTitle}
        headerTitle={previousVisitsTitle}
        formList={[{ name: 'Antenatal Form' }, { name: 'Labour & Delivery Form' }, { name: 'Mother - Postnatal Form' }]}
        launchOptions={{
          hideFormLauncher: true,
          moduleName: moduleName,
          displayText: '',
        }}
        filter={filterMaterNalEncounters}
      />
    </div>
  );
};

export default CurrentPregnancy;
