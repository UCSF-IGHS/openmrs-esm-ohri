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
  fetchMambaReportData,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import dayjs from 'dayjs';
import { moduleName } from '../../..';
import { Link } from '@carbon/react';
import { navigate, useConfig } from '@openmrs/esm-framework';
import { fetchPatientIdentifiers, fetchChildLatestFinalOutcome } from '../../../api/api';

interface pregnancyOutcomeProps {
  id: string;
  pTrackerId: string;
  dateOfBirth: string;
  infantStatus: string;
  breastfeeding: string;
}
export interface familyItemProps {
  id: string;
  pTrackerId: string;
  name: any;
  relationship: string;
  dateOfBirth: string;
  hivStatus: string;
  finalOutcome: string;
}
const CurrentPregnancy: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const currentPregnancyHeader = t('recentPregnancy', 'Recent Pregnancy');
  const arvTherapyHeader = t('art', 'ART');
  const appointmentsHeader = t('appointments', 'Appointments');
  const familyHeader = t('family', 'Family');
  const pregnancyOutcomeHeader = t('infantStatusAtBirth', 'Infant Status At Birth');
  const previousVisitsTitle = t('previousVisitsSummary', 'Previous Visits');
  const [relatives, setRelatives] = useState([]);
  const [relativeToIdentifierMap, setRelativeToIdentifierMap] = useState([]);
  const [pregnancyOutcomes, setPregnancyOutcomes] = useState([]);
  const [infantOutcomes, setInfantOutcomes] = useState([]);
  const { formNames, encounterTypes, obsConcepts, formUuids } = useConfig();
  const [totalAncCount, setTotalAncCount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [totalAncCount] = await Promise.all([fetchMambaReportData('no_of_anc_visits')]);

        setTotalAncCount(totalAncCount);
      } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Error fetching data. Please try again.');
      }
    };

    fetchData();
  }, []);

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
    {
      header: t('finalOutcome', 'Final Outcome'),
      key: 'finalOutcome',
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
    {
      header: t('breastfeeding', 'Breast Feeding'),
      key: 'breastfeeding',
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
    const currentPregnancyANCEncounter = await fetchPatientLastEncounter(patientUuid, encounterTypes.antenatal);
    const currentPregnancyLabourAndDeliveryEncounter = await fetchPatientLastEncounter(
      patientUuid,
      encounterTypes.labourAndDelivery,
    );
    if (
      currentPregnancyLabourAndDeliveryEncounter?.encounterDatetime > currentPregnancyANCEncounter?.encounterDatetime ||
      currentPregnancyANCEncounter?.encounterDatetime == null
    ) {
      if (currentPregnancyLabourAndDeliveryEncounter !== null) {
        setPregnancyOutcomes(
          currentPregnancyLabourAndDeliveryEncounter.obs?.filter(
            (obs) => obs.concept.uuid === obsConcepts.infantDeliveryGroupingConcept,
          ),
        );
      }
    }
  }
  useEffect(() => {
    const relativeToPtrackerPromises = relatives.map((relative) => getChildPTracker(relative.personB.uuid));
    Promise.all(relativeToPtrackerPromises).then((values) => {
      setRelativeToIdentifierMap(values.map((value) => ({ patientId: value.patientId, pTrackerId: value.pTrackerId })));
    });
    getInfantOutcome();
  }, [relatives]);

  const getInfantOutcome = () => {
    const infantOutcomes = relatives.map(async (relative) => {
      const finalOutcome = await fetchChildLatestFinalOutcome(
        relative.personB.uuid,
        obsConcepts.outcomeStatus,
        encounterTypes.infantPostnatal,
      );
      return { finalOutcome: finalOutcome, childUuid: relative.personB.uuid };
    });

    Promise.all(infantOutcomes).then((values) => {
      setInfantOutcomes(values.map((value) => ({ finalOutcome: value.finalOutcome, childUuid: value.childUuid })));
    });
  };

  async function getChildPTracker(patientUuid: string) {
    let pTrackerMap = { patientId: patientUuid, pTrackerId: '--' };
    const identifiers = await fetchPatientIdentifiers(patientUuid);
    if (identifiers?.length) {
      pTrackerMap.pTrackerId =
        identifiers.find((id) => id.identifierType.uuid === encounterTypes.PTrackerIdentifierType)?.identifier ?? '--';
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
          dateOfBirth: dayjs(relative.personB.birthdate).format('DD-MMM-YYYY'),
          hivStatus: '',
          finalOutcome:
            infantOutcomes.find((outcome) => outcome.childUuid === relative.personB.uuid)?.finalOutcome ?? '--',
        };
        items.push(relativeObject);
      }
    });

    return items;
  }, [relatives, patientUuid, relativeToIdentifierMap, infantOutcomes]);

  const childrenDetails: pregnancyOutcomeProps[] = useMemo(() => {
    let items = [];
    pregnancyOutcomes.forEach((child) => {
      let infantStatusObs = child.groupMembers.find(
        (member) => member.concept.uuid === obsConcepts.infantStatusAtBirthConcept,
      );
      let childObject: pregnancyOutcomeProps = {
        id: child.uuid,
        pTrackerId: child.groupMembers.find((member) => member.concept.uuid === obsConcepts.infantPTrackerIdConcept)
          ?.value,
        dateOfBirth: dayjs(
          child.groupMembers.find((member) => member.concept.uuid === obsConcepts.infantDateOfBirth)?.value,
        ).format('DD-MMM-YYYY'),
        infantStatus:
          infantStatusObs.value?.names?.find((conceptName) => conceptName.conceptNameType === 'SHORT')?.name ||
          infantStatusObs.value.name.name,
        breastfeeding: child.groupMembers.find((member) => member.concept.uuid === obsConcepts.breastfeedingStatus)
          ?.value?.display,
      };
      items.push(childObject);
    });
    return items;
  }, [pregnancyOutcomes, infantOutcomes]);

  const currentPregnancyColumns: SummaryCardColumn[] = useMemo(
    () => [
      {
        key: 'motherHIVStatus',
        header: t('motherHIVStatus', 'Mother HIV Status'),
        encounterTypes: [encounterTypes.antenatal],
        getObsValue: async ([encounter]) => {
          return getObsFromEncounter(encounter, obsConcepts.hivTestResultConcept);
        },
      },
      {
        key: 'expectedDeliveryDate',
        header: t('expectedDeliveryDate', 'Expected Delivery Date'),
        encounterTypes: [encounterTypes.antenatal],
        getObsValue: async ([encounter]) => {
          return getObsFromEncounter(encounter, obsConcepts.eDDConcept, true);
        },
        getObsSummary: ([encounter]) => {
          let edd = getObsFromEncounter(encounter, obsConcepts.eDDConcept, true);
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
        encounterTypes: [encounterTypes.labourAndDelivery],
        getObsValue: async ([encounter]) => {
          return getObsFromEncounter(encounter, obsConcepts.motherStatusConcept);
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
        encounterTypes: [encounterTypes.motherPostnatal, encounterTypes.labourAndDelivery, encounterTypes.antenatal],
        getObsValue: (encounters) => {
          const pncArtData = {
            artInitiation: getObsFromEncounter(encounters[0], obsConcepts.artInitiationConcept),
            artStartDate: getObsFromEncounter(encounters[0], obsConcepts.artStartDate, true),
            pTrackerId: getObsFromEncounter(encounters[0], obsConcepts.pTrackerIdConcept),
          };
          const lndArtData = {
            artInitiation: getObsFromEncounter(encounters[1], obsConcepts.artInitiationConcept),
            artStartDate: getObsFromEncounter(encounters[1], obsConcepts.artStartDate, true),
            pTrackerId: getObsFromEncounter(encounters[1], obsConcepts.pTrackerIdConcept),
          };
          const ancArtData = {
            artInitiation: getObsFromEncounter(encounters[2], obsConcepts.artInitiationConcept),
            artStartDate: getObsFromEncounter(encounters[2], obsConcepts.artStartDate, true),
            pTrackerId: getObsFromEncounter(encounters[2], obsConcepts.pTrackerIdConcept),
          };
          const latestArtData = getLatestArtDetails(pncArtData, lndArtData, ancArtData);
          return latestArtData['artInitiation'];
        },
      },
      {
        key: 'artStartDate',
        header: t('artStartDate', 'ART Start Date'),
        encounterTypes: [encounterTypes.motherPostnatal, encounterTypes.labourAndDelivery, encounterTypes.antenatal],
        getObsValue: (encounters) => {
          const pncArtData = {
            artInitiation: getObsFromEncounter(encounters[0], obsConcepts.artInitiationConcept),
            artStartDate: getObsFromEncounter(encounters[0], obsConcepts.artStartDate, true),
            pTrackerId: getObsFromEncounter(encounters[0], obsConcepts.pTrackerIdConcept),
          };
          const lndArtData = {
            artInitiation: getObsFromEncounter(encounters[1], obsConcepts.artInitiationConcept),
            artStartDate: getObsFromEncounter(encounters[1], obsConcepts.artStartDate, true),
            pTrackerId: getObsFromEncounter(encounters[1], obsConcepts.pTrackerIdConcept),
          };
          const ancArtData = {
            artInitiation: getObsFromEncounter(encounters[2], obsConcepts.artInitiationConcept),
            artStartDate: getObsFromEncounter(encounters[2], obsConcepts.artStartDate, true),
            pTrackerId: getObsFromEncounter(encounters[2], obsConcepts.pTrackerIdConcept),
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
        encounterTypes: [encounterTypes.antenatal],
        getObsValue: ([encounter]) => {
          return getObsFromEncounter(encounter, obsConcepts.nextVisitDateConcept, true);
        },
        getObsSummary: ([encounter]) => {
          let nextVisitDate = getObsFromEncounter(encounter, obsConcepts.nextVisitDateConcept, true);
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
        encounterTypes: [encounterTypes.antenatal],
        getObsValue: async ([encounter]) => {
          return totalAncCount;
        },
      },
    ],
    [totalAncCount],
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
          return getObsFromEncounter(encounter, obsConcepts.visitDate, true);
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
          return getObsFromEncounter(encounter, obsConcepts.followUpDateConcept, true);
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

  const selectMCHFormViewAction = (encounter) => {
    const encounterType = encounter.encounterType.name;
    if (encounterType === 'Antenatal') {
      return { name: formNames.antenatal };
    } else if (encounterType === 'Labor and Delivery') {
      return { name: formNames.labourAndDelivery };
    } else {
      return { name: formNames.motherPostnatal };
    }
  };

  return (
    <div>
      <SummaryCard patientUuid={patientUuid} headerTitle={currentPregnancyHeader} columns={currentPregnancyColumns} />
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', height: '15rem' }}>
        <SummaryCard patientUuid={patientUuid} headerTitle={arvTherapyHeader} columns={arvTherapyColumns} />
        <SummaryCard patientUuid={patientUuid} headerTitle={appointmentsHeader} columns={appointmentsColumns} />
      </div>

      <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
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
      </div>

      <EncounterList
        patientUuid={patientUuid}
        encounterType={encounterTypes.mchEncounterType}
        columns={columnsMotherPreviousVisit}
        description={previousVisitsTitle}
        headerTitle={previousVisitsTitle}
        formList={[
          { name: formNames.antenatal, uuid: '' },
          { name: formNames.labourAndDelivery, uuid: formUuids.labourAndDelivery },
          { name: formNames.motherPostnatal, uuid: formUuids.motherPostnatal },
        ]}
        launchOptions={{
          hideFormLauncher: true,
          moduleName: moduleName,
          displayText: '',
        }}
      />
    </div>
  );
};

export default CurrentPregnancy;
