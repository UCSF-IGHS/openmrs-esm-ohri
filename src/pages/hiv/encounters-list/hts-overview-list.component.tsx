import React, { useState } from 'react';

import moment from 'moment';
import EncounterList, {
  EncounterListColumn,
  findObs,
  getObsFromEncounter,
} from '../../../components/encounter-list/encounter-list.component';

interface HtsOverviewListProps {
  patientUuid: string;
}

const hivTestResultConceptUUID = 'e16b0068-b6a2-46b7-aba9-e3be00a7b4ab'; // HIV Result
const htsStrategy = 'f0d85da0-c235-4540-a0d1-63640594f98b';

const columns: EncounterListColumn[] = [
  {
    key: 'date',
    header: 'Date of HIV Test',
    getValue: encounter => {
      return moment(encounter.encounterDatetime).format('DD-MMM-YYYY');
    },
  },
  {
    key: 'location',
    header: 'Location',
    getValue: encounter => {
      return encounter.location.name;
    },
  },
  {
    key: 'hivTestResult',
    header: 'HIV Test result',
    getValue: encounter => {
      return getObsFromEncounter(encounter, hivTestResultConceptUUID);
    },
  },
  {
    key: 'provider',
    header: 'HTS Provider',
    getValue: encounter => {
      return encounter.encounterProviders.map(p => p.provider.name).join(' | ');
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: encounter => {
      const strategies = {
        '9de587b2-564d-4d86-bf72-e76da924018e': 'WHO',
        '43105ef4-afde-4f33-89bd-fb318d3f07a3': 'Classic',
      };
      const strategyObs = findObs(encounter, htsStrategy);
      const strategy = strategyObs ? strategies[strategyObs.value.uuid] : 'Classic';
      if (strategy == 'WHO') {
        return [
          {
            form: { package: 'hiv', name: 'hts_who' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: 'View',
            mode: 'view',
          },
          {
            form: { package: 'hiv', name: 'hts_who' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: 'Edit',
            mode: 'edit',
          },
        ];
      }
      return [
        {
          form: { package: 'hiv', name: 'hts' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'View',
          mode: 'view',
        },
        {
          form: { package: 'hiv', name: 'hts' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'Edit',
          mode: 'edit',
        },
      ];
    },
  },
];

const HtsOverviewList: React.FC<HtsOverviewListProps> = ({ patientUuid }) => {
  const [counter, setCounter] = useState(0);
  const htsRetrospectiveTypeUUID = '79c1f50f-f77d-42e2-ad2a-d29304dde2fe'; // HTS Retrospective
  const forceComponentUpdate = () => setCounter(counter + 1);
  const headerTitle = 'HTS Sessions';

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={htsRetrospectiveTypeUUID}
      form={{ package: 'hiv', name: 'hts' }}
      forms={[
        { package: 'hiv', name: 'hts', fixedIntent: '*', excludedIntents: [] },
        { package: 'hiv', name: 'hts_who', fixedIntent: '*', excludedIntents: [] },
      ]}
      columns={columns}
      description={headerTitle}
      headerTitle={headerTitle}
      dropdownText="Add"
    />
  );
};

export default HtsOverviewList;
