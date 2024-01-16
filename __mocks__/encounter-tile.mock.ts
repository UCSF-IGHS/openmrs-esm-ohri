import { getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';

export const headerTitle = 'HIV Monitoring';

export const patientUuid = 'b280078a-c0ce-443b-9997-3c66c63ec2f8';

export const column = {
  key: 'nextAppointmentDate',
  header: 'Next Appointment Date',
  encounterUuid: 'cb0a65a7-0587-477e-89b9-cf2fd144f1d4',
  concept: '5096AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  getObsValue: () => {
    return '2023 - 12 - 01';
  },
};

export const mocklastEncounter = {
  uuid: '4cf3611f-ede1-4e57-8423-ce6dde7c9e2a',
  encounterDatetime: '2023-12-21T05:21:38.000+0000',
  encounterType: {
    uuid: '96adb28e-e417-43a3-8f7d-682f8af5e912',
    display: 'CD4 Lab results',
    name: 'CD4 Lab results',
    description: 'CD4 Lab results',
    retired: false,
    links: [
      {
        rel: 'self',
        uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encountertype/96adb28e-e417-43a3-8f7d-682f8af5e912',
        resourceAlias: 'encountertype',
      },
      {
        rel: 'full',
        uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encountertype/96adb28e-e417-43a3-8f7d-682f8af5e912?v=full',
        resourceAlias: 'encountertype',
      },
    ],
    resourceVersion: '1.8',
  },
  location: {
    uuid: '44c3efb0-2583-4c80-a79e-1f756a03c0a1',
    name: 'Outpatient Clinic',
  },
  patient: {
    uuid: '1b2278d5-c9ea-4f00-bfb1-60af48dc838a',
    display: '100002U - Clark Bob Robert',
  },
  encounterProviders: [
    {
      uuid: '4a04c3d8-3eb9-4699-9218-d0909139d762',
      provider: {
        uuid: 'bc450226-4138-40b7-ad88-9c98df687738',
        name: 'Super User',
      },
    },
  ],
  obs: [
    {
      uuid: '87b18041-2cbb-40cf-ad07-18b921a1d6da',
      obsDatetime: '2023-12-21T05:21:38.000+0000',
      voided: false,
      groupMembers: null,
      concept: {
        uuid: '161011AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        name: {
          uuid: 'f625c7e8-8b20-3fa3-831c-23fc609b882b',
          name: 'Free text comment',
        },
      },
      value: 'n',
    },
    {
      uuid: '3a84e960-1730-4922-b5d9-cd95bbc1c311',
      obsDatetime: '2023-12-21T05:21:38.000+0000',
      voided: false,
      groupMembers: null,
      concept: {
        uuid: '5497AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        name: {
          uuid: 'e4bf5510-b291-3895-88f4-009834675e4f',
          name: 'CD4 count',
        },
      },
      value: 10,
    },
    {
      uuid: 'acd65213-ec75-4cd8-9e49-4268a31f2d7c',
      obsDatetime: '2023-12-21T05:21:38.000+0000',
      voided: false,
      groupMembers: null,
      concept: {
        uuid: '163724AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        name: {
          uuid: '368ec1c9-fcda-3f00-927e-205f15dc0143',
          name: 'Date test completed',
        },
      },
      value: '2023-12-14T03:00:00.000+0000',
    },
    {
      uuid: 'a1cdcafc-e4d2-4508-a3ea-b76713a8753a',
      obsDatetime: '2023-12-21T05:21:38.000+0000',
      voided: false,
      groupMembers: null,
      concept: {
        uuid: '730AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        name: {
          uuid: '76654af1-ae9d-398f-a767-e14ae893712c',
          name: 'CD4%',
        },
      },
      value: 5,
    },
  ],
  form: {
    uuid: 'a66197de-419a-3223-8691-f70d36b1524b',
    name: 'CD4 Lab Result',
  },
};

export const mockColumns = [
  {
    key: 'tbScreening',
    header: 'TB Screening',
    encounterUuid: 'cb0a65a7-0587-477e-89b9-cf2fd144f1d4',
    concept: '160108AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    hasSummary: true,
    getObsValue: () => {
      return 'Positive';
    },
    getSummaryObsValue: () => {
      return 'Positive';
    },
  },
  {
    key: 'oIs',
    header: 'OIs',
    encounterUuid: 'cb0a65a7-0587-477e-89b9-cf2fd144f1d4',
    getObsValue: () => {
      return '--';
    },
    getSummaryObsValue: () => {
      return '--';
    },
  },
  {
    key: 'nextAppointmentDate',
    header: 'Next Appointment Date',
    encounterUuid: 'cb0a65a7-0587-477e-89b9-cf2fd144f1d4',
    concept: '5096AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    hasSummary: true,
    getObsValue: () => {
      return '2023 - 12 - 01';
    },
    getSummaryObsValue: () => {
      return '2023 - 12 - 01';
    },
  },
  {
    key: 'programStatus',
    header: 'Program Status',
    encounterUuid: 'a221448d-512b-4750-84bf-d29be9f802b3',
    getObsValue: () => {
      return 'Active';
    },
    getSummaryObsValue: () => {
      return 'Active';
    },
  },
];
