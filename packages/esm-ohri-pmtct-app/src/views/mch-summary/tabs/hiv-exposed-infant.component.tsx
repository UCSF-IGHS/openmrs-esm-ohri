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
  basePath,
  itemProps,
  fetchPatientRelationships,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { antenatalEncounterType, PTrackerIdentifierType } from '../../../constants';
import { navigate } from '@openmrs/esm-framework';
import moment from 'moment';
// import { Link } from 'react-router-dom';
import { Link } from '@carbon/react';
import { fetchPatientIdentifiers } from '../../../api/api';

const HivExposedInfant: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const [relatives, setRelatives] = useState([]);
  const [relativeToIdentifierMap, setRelativeToIdentifierMap] = useState([]);

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

  const parentRelationships: itemProps[] = useMemo(() => {
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
      let relativeObject: itemProps = {
        id: relativeToIdentifierMap.find((entry) => entry.patientId === relative.personA.uuid)?.pTrackerId,
        name: patientLink,
        relationship: relative.relationshipType.displayAIsToB,
        dateOfBirth: moment(relative.personA.birthdate).format('DD-MMM-YYYY'),
        hivStatus: '',
      };
      items.push(relativeObject);
    });
    return items;
  }, [relatives, relativeToIdentifierMap]);

  const infantSummaryColumns: TileSummaryProps[] = useMemo(
    () => [
      {
        key: 'onNevirapine',
        header: t('onNevirapine', 'On Nevirapine'),
        getObsValue: (encounters) => {
          return '--';
        },
      },
      {
        key: 'breastfeeding',
        header: t('breastfeeding', 'Breastfeeding'),
        getObsValue: (encounter) => {
          return '--';
        },
      },
      {
        key: 'hivStatus',
        header: t('hivStatus', 'HIV Status'),
        getObsValue: (encounter) => {
          return '--';
        },
      },
      {
        key: 'finalOutcome',
        header: t('finalOutcome', 'Final Outcome'),
        getObsValue: (encounter) => {
          return '--';
        },
      },
    ],
    [],
  );

  const appointmentColumns: TileSummaryProps[] = useMemo(
    () => [
      {
        key: 'nextAppointmentDate',
        header: t('nextAppointmentDate', 'Next Appointment Date'),
        getObsValue: (encounters) => {
          return '--';
        },
      },
    ],
    [],
  );

  const hivMonitoringHeaders = [
    {
      key: 'date',
      header: t('date', 'Date'),
    },
    {
      key: 'testType',
      header: t('testType', 'Test Type'),
    },
    {
      key: 'ageAtTimeOfTest',
      header: t('ageAtTimeOfTest', 'Age at time of test'),
    },
    {
      key: 'hivStatus',
      header: t('hivStatus', 'HIV Status'),
    },
  ];

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

  const hivMonitoringColumns: ExpandableListColumn[] = useMemo(
    () => [
      {
        key: 'date',
        header: t('date', 'Date'),
        value: '18-Jul-2017',
      },
      {
        key: 'testType',
        header: t('testType', 'Test Type'),
        value: 'DNA PCR',
      },
      {
        key: 'ageAtTimeOfTest',
        header: t('ageAtTimeOfTest', 'Age at time of test'),
        value: '6 Weeks',
      },
      {
        key: 'hivStatus',
        header: t('hivStatus', 'HIV Status'),
        value: 'Negative',
      },
    ],
    [],
  );

  const familyColumns: ExpandableListColumn[] = useMemo(
    () => [
      {
        key: 'id',
        header: 'ID',
        value: '12345A220001',
      },
      {
        key: 'name',
        header: t('name', 'Name'),
        value: 'Jane Arron',
      },
      {
        key: 'relationship',
        header: t('relationship', 'Relationship'),
        value: 'Mother',
      },
      {
        key: 'dateOfBirth',
        header: t('dateOfBirth', 'Date of birth'),
        value: '18-Jul-1988',
      },
      {
        key: 'hivStatus',
        header: t('hivStatus', 'HIV Status'),
        value: 'Negative',
      },
    ],
    [],
  );

  return (
    <div>
      <CardSummary
        patientUuid={patientUuid}
        headerTitle={t('infantSummary', 'Infants Summary')}
        columns={infantSummaryColumns}
      />
      <CardSummary
        patientUuid={patientUuid}
        headerTitle={t('appointments', 'Appointments')}
        columns={appointmentColumns}
      />

      <ExpandableList
        encounterUuid={antenatalEncounterType} // This is the wrong encounter type
        patientUuid={patientUuid}
        headerTitle={t('hivMonitoring', 'HIV Monitoring')}
        headers={hivMonitoringHeaders}
        items={hivMonitoringColumns}
        isActionable={true}
        isStriped={true}
        launchOptions={{
          hideFormLauncher: true,
          moduleName: '',
          displayText: '',
        }}
      />
      <ExpandableList
        encounterUuid={antenatalEncounterType} // This is the wrong encounter type
        patientUuid={patientUuid}
        headerTitle={t('family', 'Family')}
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
    </div>
  );
};

export default HivExposedInfant;
