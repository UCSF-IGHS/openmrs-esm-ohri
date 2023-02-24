import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CardSummary,
  PatientChartProps,
  ExpandableList,
  getObsFromEncounter,
  TileSummaryProps,
  EncounterListColumn,
  ExpandableListColumn,
  EncounterList,
  fetchPatientRelationships,
  basePath,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { navigate } from '@openmrs/esm-framework';
import moment from 'moment';
import { Link } from '@carbon/react';
import {
  PTrackerIdentifierType,
  antenatalEncounterType,
  artProphylaxisStatus,
  artStartDate,
  breastfeedingStatus,
  infantExposureStatus,
  infantPostnatalEncounterType,
  nextVisitDateConcept,
  outcomeStatus,
  testTypeConcept,
  followUpDateConcept,
  visitDate,
  infantVisitDate,
} from '../../../constants';
import { moduleName } from '../../..';
import { fetchPatientIdentifiers, getFamilyRelationships } from '../../../api/api';
import { familyItemProps } from './current-pregnancy.component';

const HivExposedInfant: React.FC<{
  patientUuid: string;
  dateOfBirth: string;
}> = ({ patientUuid, dateOfBirth }) => {
  const { t } = useTranslation();
  const [relatives, setRelatives] = useState([]);
  const [relativeToIdentifierMap, setRelativeToIdentifierMap] = useState([]);

  useEffect(() => {
    getParentRelationships();
  }, []);

  const infantSummaryColumns: TileSummaryProps[] = useMemo(
    () => [
      {
        key: 'artProphylaxisStatus',
        header: t('artProphylaxisStatus', 'ART Prophylaxis Status'),
        encounterUuid: infantPostnatalEncounterType,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, artProphylaxisStatus);
        },
      },
      {
        key: 'breastfeeding',
        header: t('breastfeeding', 'Breastfeeding'),
        encounterUuid: infantPostnatalEncounterType,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, breastfeedingStatus);
        },
      },
      {
        key: 'hivStatus',
        header: t('hivStatus', 'HIV Status'),
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, infantExposureStatus);
        },
      },
      {
        key: 'finalOutcome',
        header: t('finalOutcome', 'Final Outcome'),
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, outcomeStatus);
        },
      },
    ],
    [],
  );

  const hivMonitoringColumns: EncounterListColumn[] = useMemo(() => {
    return [
      {
        key: 'date',
        header: t('date', 'Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, artStartDate, true);
        },
      },
      {
        key: 'testType',
        header: t('testType', 'Test Type'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, testTypeConcept);
        },
      },
      {
        key: 'ageAtTimeOfTest',
        header: t('ageAtTimeOfTest', 'Age at time of test'),
        getValue: (encounter) => {
          const artDate = getObsFromEncounter(encounter, artStartDate);
          return moment(artDate).diff(dateOfBirth, 'days');
        },
      },
      {
        key: 'hivStatus',
        header: t('hivStatus', 'HIV Status'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, infantExposureStatus);
        },
      },
    ];
  }, []);

  const familyHeaders = [
    {
      key: 'id',
      header: 'ID',
    },
    {
      key: 'name',
      header: t('name', 'Name'),
    },
    {
      key: 'relationship',
      header: t('relationship', 'Relationship'),
    },
    {
      key: 'dateOfBirth',
      header: t('dateOfBirth', 'Date of birth'),
    },
    {
      key: 'hivStatus',
      header: t('hivStatus', 'HIV Status'),
    },
  ];

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
    const relativeToPtrackerPromises = relatives.map((relative) => getChildPTracker(relative.personA.uuid));
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
            navigate({ to: `${basePath}${relative.personA.uuid}/chart` });
          }}>
          {relative.personA.display}
        </Link>
      );
      let relativeObject: familyItemProps = {
        id: relative.uuid,
        pTrackerId: relativeToIdentifierMap.find((entry) => entry.patientId === relative.personA.uuid)?.pTrackerId,
        name: patientLink,
        relationship: relative.relationshipType.displayAIsToB,
        dateOfBirth: moment(relative.personA.birthdate).format('DD-MMM-YYYY'),
        hivStatus: '',
      };
      items.push(relativeObject);
    });
    return items;
  }, [relatives, relativeToIdentifierMap]);

  const columnsChildPreviousVisit: EncounterListColumn[] = useMemo(
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
          return getObsFromEncounter(encounter, infantVisitDate, true);
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

  const previousVisitsTitle = t('previousVisitsSummary', 'Previous Visits');

  return (
    <div>
      <CardSummary
        patientUuid={patientUuid}
        headerTitle={t('infantSummary', 'Infants Summary')}
        columns={infantSummaryColumns}
      />

      <EncounterList
        patientUuid={patientUuid}
        encounterUuid={infantPostnatalEncounterType}
        form={{ package: 'child_health', name: 'infant_postnatal' }}
        columns={hivMonitoringColumns}
        description={t('hivMonitoring', 'HIV Monitoring')}
        headerTitle={t('hivMonitoring', 'HIV Monitoring')}
        launchOptions={{
          hideFormLauncher: true,
          displayText: '',
          moduleName: moduleName,
        }}
      />

      <ExpandableList
        headerTitle={t('family', 'Family')}
        patientUuid={patientUuid}
        headers={familyHeaders}
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

export default HivExposedInfant;
