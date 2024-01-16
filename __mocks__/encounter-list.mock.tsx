export const mockEncounterType = '15272be5-ae9c-4278-a303-4b8907eae73b';

export const mockPatientUuid = '1b2278d5-c9ea-4f00-bfb1-60af48dc838a';

export const mockColumns = [
  {
    key: 'deathDate',
    header: 'Death Date',
  },
  {
    key: 'deathCause',
    header: 'Cause of Death',
  },
  {
    key: 'specificDeathCause',
    header: 'Specific cause of Death',
  },
  {
    key: 'actions',
    header: 'Actions',
  },
];

export const mockForms = [
  {
    name: 'Death Form',
  },
];

export const mockEncounter = [
  {
    uuid: '7add315b-e790-44a2-9de7-6c0ac5508ef4',
    encounterDatetime: '2022-07-05T13:07:57.000+0000',
    encounterType: {
      uuid: '62ee5922-a229-48d3-a1da-875c1ffa9436',
      display: 'Service Delivery Model Form',
      name: 'Service Delivery Model Form',
      description:
        'This form is used to document the enrolment and dis-enrolment of patients into differentiated service delivery.',
      retired: false,
      links: [
        {
          rel: 'self',
          uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encountertype/62ee5922-a229-48d3-a1da-875c1ffa9436',
          resourceAlias: 'encountertype',
        },
        {
          rel: 'full',
          uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encountertype/62ee5922-a229-48d3-a1da-875c1ffa9436?v=full',
          resourceAlias: 'encountertype',
        },
      ],
      resourceVersion: '1.8',
    },
    location: {
      uuid: '8d9045ad-50f0-45b8-93c8-3ed4bce19dbf',
      name: 'Mobile Clinic',
    },
    patient: {
      uuid: '1b2278d5-c9ea-4f00-bfb1-60af48dc838a',
      display: '100002U - Clark Bob Robert',
    },
    encounterProviders: [
      {
        uuid: '3e2eff62-9c96-4ed3-ac55-211dd74e1efe',
        provider: {
          uuid: 'bc450226-4138-40b7-ad88-9c98df687738',
          name: 'Super User',
        },
      },
    ],
    obs: [
      {
        uuid: 'f135b5db-4f9b-440a-a679-7e8fe504645f',
        obsDatetime: '2022-07-05T13:07:57.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '8742967d-8107-4cbb-a17e-9a8c7f624673',
          name: {
            uuid: '762f4286-4480-3eeb-9193-086dbe39bda4',
            name: 'Differentiated Care',
          },
        },
        value: {
          uuid: '9cca15ce-db78-4a39-be0d-aae19e089ec1',
          name: {
            uuid: '25b7d74e-b1c3-3ad1-9419-de60f1ed08a8',
            name: 'Start Differentiated Care Services',
          },
          names: [
            {
              uuid: '25b7d74e-b1c3-3ad1-9419-de60f1ed08a8',
              conceptNameType: 'FULLY_SPECIFIED',
              name: 'Start Differentiated Care Services',
            },
          ],
        },
      },
      {
        uuid: '4d90f69e-895d-42f0-bc93-abead9df570e',
        obsDatetime: '2022-07-05T13:07:57.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          name: {
            uuid: 'f415bf25-2008-3ac2-8f0e-46e75648e30d',
            name: 'Date of event',
          },
        },
        value: '2022-07-01T00:00:00.000+0000',
      },
      {
        uuid: 'bbcd2f55-c727-4585-a6d4-fbca0e1cad12',
        obsDatetime: '2022-07-05T13:08:39.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '59f34bfe-4375-461c-88a6-bd3d82ee7b79',
          name: {
            uuid: '28fcb385-ead9-31d2-a263-cade9ed600de',
            name: 'Facility based DSD Model',
          },
        },
        value: {
          uuid: '166446AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          name: {
            uuid: 'f6720cc1-722f-3a76-9038-ab1962ace993',
            name: 'Express pharmacy pickup without clinician visit',
          },
          names: [
            {
              uuid: 'f6720cc1-722f-3a76-9038-ab1962ace993',
              conceptNameType: 'FULLY_SPECIFIED',
              name: 'Express pharmacy pickup without clinician visit',
            },
          ],
        },
      },
      {
        uuid: '0a72cc91-48cc-460f-a308-2d50b9973d40',
        obsDatetime: '2022-07-05T13:09:14.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '52824cbe-0e4d-4c18-8179-80b5799f34ed',
          name: {
            uuid: '3e582769-fea6-34c8-926b-9947f9c92f34',
            name: 'Community Based DSD Model',
          },
        },
        value: {
          uuid: 'cf8de440-a26b-4c8c-8c43-f7ce7d2cd4fb',
          name: {
            uuid: 'c519c560-3671-3c08-b074-146f6cc91275',
            name: 'Community Dispensing',
          },
          names: [
            {
              uuid: 'c519c560-3671-3c08-b074-146f6cc91275',
              conceptNameType: 'FULLY_SPECIFIED',
              name: 'Community Dispensing',
            },
          ],
        },
      },
    ],
    form: null,
  },
  {
    uuid: 'd607df01-a289-4c28-989b-c0c75261cf6c',
    encounterDatetime: '2022-04-01T08:35:13.000+0000',
    encounterType: {
      uuid: '62ee5922-a229-48d3-a1da-875c1ffa9436',
      display: 'Service Delivery Model Form',
      name: 'Service Delivery Model Form',
      description:
        'This form is used to document the enrolment and dis-enrolment of patients into differentiated service delivery.',
      retired: false,
      links: [
        {
          rel: 'self',
          uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encountertype/62ee5922-a229-48d3-a1da-875c1ffa9436',
          resourceAlias: 'encountertype',
        },
        {
          rel: 'full',
          uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encountertype/62ee5922-a229-48d3-a1da-875c1ffa9436?v=full',
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
        uuid: '10fcdc9e-9e66-43ca-975c-69ba4bd1d8db',
        provider: {
          uuid: 'bc450226-4138-40b7-ad88-9c98df687738',
          name: 'Super User',
        },
      },
    ],
    obs: [
      {
        uuid: 'a58a5bae-f081-48a2-9e14-bff94787d5ba',
        obsDatetime: '2022-04-01T08:35:13.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '52824cbe-0e4d-4c18-8179-80b5799f34ed',
          name: {
            uuid: '3e582769-fea6-34c8-926b-9947f9c92f34',
            name: 'Community Based DSD Model',
          },
        },
        value: {
          uuid: '166443AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          name: {
            uuid: '08e5ad16-c86e-3d64-8c8c-d842301e03aa',
            name: 'Community medication distribution, healthcare worker led',
          },
          names: [
            {
              uuid: '08e5ad16-c86e-3d64-8c8c-d842301e03aa',
              conceptNameType: 'FULLY_SPECIFIED',
              name: 'Community medication distribution, healthcare worker led',
            },
          ],
        },
      },
      {
        uuid: '8ad469f0-94b8-4639-8c07-f412995a8152',
        obsDatetime: '2022-04-01T08:35:13.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '163513AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          name: {
            uuid: '44adef96-6a99-31d7-97ca-9f66b4221c6d',
            name: 'Reason for discontinuing service (text)',
          },
        },
        value: 'Unstable client',
      },
      {
        uuid: 'f9a92d57-ca43-4762-b5a0-e6e53247148b',
        obsDatetime: '2022-04-01T08:35:13.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '165095AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          name: {
            uuid: '8fc27c17-922b-3836-8169-0364796779ae',
            name: 'General patient note',
          },
        },
        value: 'Here to new care strategy',
      },
      {
        uuid: '352142a9-ff7c-4e9d-88ee-d24c82aee9f6',
        obsDatetime: '2022-04-01T08:35:13.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          name: {
            uuid: 'f415bf25-2008-3ac2-8f0e-46e75648e30d',
            name: 'Date of event',
          },
        },
        value: '2022-04-01T00:00:00.000+0000',
      },
      {
        uuid: 'b0024091-228c-46fc-9f09-b7eb06bc2adf',
        obsDatetime: '2022-04-01T08:35:13.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '59f34bfe-4375-461c-88a6-bd3d82ee7b79',
          name: {
            uuid: '28fcb385-ead9-31d2-a263-cade9ed600de',
            name: 'Facility based DSD Model',
          },
        },
        value: {
          uuid: '166445AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          name: {
            uuid: 'b8d2994a-383f-3ccf-8036-06c09815df74',
            name: 'Facility group medication distribution',
          },
          names: [
            {
              uuid: 'b8d2994a-383f-3ccf-8036-06c09815df74',
              conceptNameType: 'FULLY_SPECIFIED',
              name: 'Facility group medication distribution',
            },
          ],
        },
      },
      {
        uuid: '2a64d4a5-92f2-40bd-b341-da59de0f7b62',
        obsDatetime: '2022-04-01T08:35:13.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '8742967d-8107-4cbb-a17e-9a8c7f624673',
          name: {
            uuid: '762f4286-4480-3eeb-9193-086dbe39bda4',
            name: 'Differentiated Care',
          },
        },
        value: {
          uuid: 'b5ddaf2e-dae3-4e4d-81ca-6cead3d59973',
          name: {
            uuid: 'b98d54f1-d56b-3723-a375-35ca22047b5d',
            name: 'Stop Differentiated Care Serivces',
          },
          names: [
            {
              uuid: 'b98d54f1-d56b-3723-a375-35ca22047b5d',
              conceptNameType: 'FULLY_SPECIFIED',
              name: 'Stop Differentiated Care Serivces',
            },
          ],
        },
      },
    ],
    form: null,
  },
  {
    uuid: 'ace18e68-02be-4df4-a6d5-d60e0b366bec',
    encounterDatetime: '2022-04-01T08:34:05.000+0000',
    encounterType: {
      uuid: '62ee5922-a229-48d3-a1da-875c1ffa9436',
      display: 'Service Delivery Model Form',
      name: 'Service Delivery Model Form',
      description:
        'This form is used to document the enrolment and dis-enrolment of patients into differentiated service delivery.',
      retired: false,
      links: [
        {
          rel: 'self',
          uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encountertype/62ee5922-a229-48d3-a1da-875c1ffa9436',
          resourceAlias: 'encountertype',
        },
        {
          rel: 'full',
          uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encountertype/62ee5922-a229-48d3-a1da-875c1ffa9436?v=full',
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
        uuid: 'd07cb45e-0d19-4a71-8c6f-ec72589e9069',
        provider: {
          uuid: 'bc450226-4138-40b7-ad88-9c98df687738',
          name: 'Super User',
        },
      },
    ],
    obs: [
      {
        uuid: 'c77d3c90-a07a-44f2-9ccd-23d2c1a9ed87',
        obsDatetime: '2022-04-01T08:34:05.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          name: {
            uuid: 'f415bf25-2008-3ac2-8f0e-46e75648e30d',
            name: 'Date of event',
          },
        },
        value: '2022-03-31T00:00:00.000+0000',
      },
      {
        uuid: '8b7c0d5b-df75-48fa-bed8-660613eb9798',
        obsDatetime: '2022-04-01T08:34:05.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '8742967d-8107-4cbb-a17e-9a8c7f624673',
          name: {
            uuid: '762f4286-4480-3eeb-9193-086dbe39bda4',
            name: 'Differentiated Care',
          },
        },
        value: {
          uuid: '9cca15ce-db78-4a39-be0d-aae19e089ec1',
          name: {
            uuid: '25b7d74e-b1c3-3ad1-9419-de60f1ed08a8',
            name: 'Start Differentiated Care Services',
          },
          names: [
            {
              uuid: '25b7d74e-b1c3-3ad1-9419-de60f1ed08a8',
              conceptNameType: 'FULLY_SPECIFIED',
              name: 'Start Differentiated Care Services',
            },
          ],
        },
      },
      {
        uuid: '4411f72c-5991-4fa4-8b9f-3ae894c5f077',
        obsDatetime: '2022-04-01T08:34:05.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '165095AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          name: {
            uuid: '8fc27c17-922b-3836-8169-0364796779ae',
            name: 'General patient note',
          },
        },
        value: 'Enrolled yesterday',
      },
    ],
    form: null,
  },
  {
    uuid: '23cbdec1-02bb-4251-8c0f-65c3201fbac8',
    encounterDatetime: '2022-03-31T07:58:40.000+0000',
    encounterType: {
      uuid: '62ee5922-a229-48d3-a1da-875c1ffa9436',
      display: 'Service Delivery Model Form',
      name: 'Service Delivery Model Form',
      description:
        'This form is used to document the enrolment and dis-enrolment of patients into differentiated service delivery.',
      retired: false,
      links: [
        {
          rel: 'self',
          uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encountertype/62ee5922-a229-48d3-a1da-875c1ffa9436',
          resourceAlias: 'encountertype',
        },
        {
          rel: 'full',
          uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encountertype/62ee5922-a229-48d3-a1da-875c1ffa9436?v=full',
          resourceAlias: 'encountertype',
        },
      ],
      resourceVersion: '1.8',
    },
    location: {
      uuid: 'b309447b-2b0b-4f2c-869b-fdae85f193f1',
      name: 'Registration Desk',
    },
    patient: {
      uuid: '1b2278d5-c9ea-4f00-bfb1-60af48dc838a',
      display: '100002U - Clark Bob Robert',
    },
    encounterProviders: [
      {
        uuid: '351d4615-b545-47f9-8aeb-573ffa6cae58',
        provider: {
          uuid: 'bc450226-4138-40b7-ad88-9c98df687738',
          name: 'Super User',
        },
      },
    ],
    obs: [
      {
        uuid: '36930363-5d2d-41fc-83af-85527a77052c',
        obsDatetime: '2022-03-31T07:58:40.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '59f34bfe-4375-461c-88a6-bd3d82ee7b79',
          name: {
            uuid: '28fcb385-ead9-31d2-a263-cade9ed600de',
            name: 'Facility based DSD Model',
          },
        },
        value: {
          uuid: '166445AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          name: {
            uuid: 'b8d2994a-383f-3ccf-8036-06c09815df74',
            name: 'Facility group medication distribution',
          },
          names: [
            {
              uuid: 'b8d2994a-383f-3ccf-8036-06c09815df74',
              conceptNameType: 'FULLY_SPECIFIED',
              name: 'Facility group medication distribution',
            },
          ],
        },
      },
      {
        uuid: 'e3c77f79-52d4-4353-abe2-7a34bd36fa37',
        obsDatetime: '2022-03-31T07:58:40.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '52824cbe-0e4d-4c18-8179-80b5799f34ed',
          name: {
            uuid: '3e582769-fea6-34c8-926b-9947f9c92f34',
            name: 'Community Based DSD Model',
          },
        },
        value: {
          uuid: 'cf8de440-a26b-4c8c-8c43-f7ce7d2cd4fb',
          name: {
            uuid: 'c519c560-3671-3c08-b074-146f6cc91275',
            name: 'Community Dispensing',
          },
          names: [
            {
              uuid: 'c519c560-3671-3c08-b074-146f6cc91275',
              conceptNameType: 'FULLY_SPECIFIED',
              name: 'Community Dispensing',
            },
          ],
        },
      },
      {
        uuid: 'ec4d6161-e6c7-4457-aaf4-a1f2afba7c51',
        obsDatetime: '2022-03-31T07:58:40.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          name: {
            uuid: 'f415bf25-2008-3ac2-8f0e-46e75648e30d',
            name: 'Date of event',
          },
        },
        value: '2022-03-30T00:00:00.000+0000',
      },
      {
        uuid: 'ce0435fe-c2c2-4fdb-a814-1c5c01145782',
        obsDatetime: '2022-03-31T07:58:40.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '8742967d-8107-4cbb-a17e-9a8c7f624673',
          name: {
            uuid: '762f4286-4480-3eeb-9193-086dbe39bda4',
            name: 'Differentiated Care',
          },
        },
        value: {
          uuid: 'b5ddaf2e-dae3-4e4d-81ca-6cead3d59973',
          name: {
            uuid: 'b98d54f1-d56b-3723-a375-35ca22047b5d',
            name: 'Stop Differentiated Care Serivces',
          },
          names: [
            {
              uuid: 'b98d54f1-d56b-3723-a375-35ca22047b5d',
              conceptNameType: 'FULLY_SPECIFIED',
              name: 'Stop Differentiated Care Serivces',
            },
          ],
        },
      },
    ],
    form: null,
  },
  {
    uuid: '7bf41e8f-3ee1-4535-bd6a-47fa06cb71d0',
    encounterDatetime: '2022-03-31T07:57:58.000+0000',
    encounterType: {
      uuid: '62ee5922-a229-48d3-a1da-875c1ffa9436',
      display: 'Service Delivery Model Form',
      name: 'Service Delivery Model Form',
      description:
        'This form is used to document the enrolment and dis-enrolment of patients into differentiated service delivery.',
      retired: false,
      links: [
        {
          rel: 'self',
          uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encountertype/62ee5922-a229-48d3-a1da-875c1ffa9436',
          resourceAlias: 'encountertype',
        },
        {
          rel: 'full',
          uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encountertype/62ee5922-a229-48d3-a1da-875c1ffa9436?v=full',
          resourceAlias: 'encountertype',
        },
      ],
      resourceVersion: '1.8',
    },
    location: {
      uuid: 'b309447b-2b0b-4f2c-869b-fdae85f193f1',
      name: 'Registration Desk',
    },
    patient: {
      uuid: '1b2278d5-c9ea-4f00-bfb1-60af48dc838a',
      display: '100002U - Clark Bob Robert',
    },
    encounterProviders: [
      {
        uuid: '818cf08c-32b4-4e60-bea4-31864d0e4d65',
        provider: {
          uuid: 'bc450226-4138-40b7-ad88-9c98df687738',
          name: 'Super User',
        },
      },
    ],
    obs: [
      {
        uuid: 'a86dbbd7-5e0f-4e82-80df-aaf8b08acecb',
        obsDatetime: '2022-03-31T07:57:58.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          name: {
            uuid: 'f415bf25-2008-3ac2-8f0e-46e75648e30d',
            name: 'Date of event',
          },
        },
        value: '2022-03-30T00:00:00.000+0000',
      },
      {
        uuid: '4c7c650a-c307-492d-b5be-8ce2c1595665',
        obsDatetime: '2022-03-31T07:57:58.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '8742967d-8107-4cbb-a17e-9a8c7f624673',
          name: {
            uuid: '762f4286-4480-3eeb-9193-086dbe39bda4',
            name: 'Differentiated Care',
          },
        },
        value: {
          uuid: '9cca15ce-db78-4a39-be0d-aae19e089ec1',
          name: {
            uuid: '25b7d74e-b1c3-3ad1-9419-de60f1ed08a8',
            name: 'Start Differentiated Care Services',
          },
          names: [
            {
              uuid: '25b7d74e-b1c3-3ad1-9419-de60f1ed08a8',
              conceptNameType: 'FULLY_SPECIFIED',
              name: 'Start Differentiated Care Services',
            },
          ],
        },
      },
    ],
    form: null,
  },
  {
    uuid: 'ebcc444d-a34a-4337-8e76-ecc33f1c435c',
    encounterDatetime: '2022-03-31T07:57:01.000+0000',
    encounterType: {
      uuid: '62ee5922-a229-48d3-a1da-875c1ffa9436',
      display: 'Service Delivery Model Form',
      name: 'Service Delivery Model Form',
      description:
        'This form is used to document the enrolment and dis-enrolment of patients into differentiated service delivery.',
      retired: false,
      links: [
        {
          rel: 'self',
          uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encountertype/62ee5922-a229-48d3-a1da-875c1ffa9436',
          resourceAlias: 'encountertype',
        },
        {
          rel: 'full',
          uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encountertype/62ee5922-a229-48d3-a1da-875c1ffa9436?v=full',
          resourceAlias: 'encountertype',
        },
      ],
      resourceVersion: '1.8',
    },
    location: {
      uuid: 'b309447b-2b0b-4f2c-869b-fdae85f193f1',
      name: 'Registration Desk',
    },
    patient: {
      uuid: '1b2278d5-c9ea-4f00-bfb1-60af48dc838a',
      display: '100002U - Clark Bob Robert',
    },
    encounterProviders: [
      {
        uuid: '0c21bb38-6a1e-4473-b195-d000e5800580',
        provider: {
          uuid: 'bc450226-4138-40b7-ad88-9c98df687738',
          name: 'Super User',
        },
      },
    ],
    obs: [
      {
        uuid: '35f2dbe4-a820-4020-b0de-6893e76c8df7',
        obsDatetime: '2022-03-31T07:57:01.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '59f34bfe-4375-461c-88a6-bd3d82ee7b79',
          name: {
            uuid: '28fcb385-ead9-31d2-a263-cade9ed600de',
            name: 'Facility based DSD Model',
          },
        },
        value: {
          uuid: '166446AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          name: {
            uuid: 'f6720cc1-722f-3a76-9038-ab1962ace993',
            name: 'Express pharmacy pickup without clinician visit',
          },
          names: [
            {
              uuid: 'f6720cc1-722f-3a76-9038-ab1962ace993',
              conceptNameType: 'FULLY_SPECIFIED',
              name: 'Express pharmacy pickup without clinician visit',
            },
          ],
        },
      },
      {
        uuid: 'cbcf5824-4dfb-4744-a3d1-96b183c6a36d',
        obsDatetime: '2022-03-31T07:57:01.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '163513AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          name: {
            uuid: '44adef96-6a99-31d7-97ca-9f66b4221c6d',
            name: 'Reason for discontinuing service (text)',
          },
        },
        value: 'Unknown Reason ',
      },
      {
        uuid: 'a4cac840-785a-4047-a62f-1e2c667cbe68',
        obsDatetime: '2022-03-31T07:57:01.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '8742967d-8107-4cbb-a17e-9a8c7f624673',
          name: {
            uuid: '762f4286-4480-3eeb-9193-086dbe39bda4',
            name: 'Differentiated Care',
          },
        },
        value: {
          uuid: 'b5ddaf2e-dae3-4e4d-81ca-6cead3d59973',
          name: {
            uuid: 'b98d54f1-d56b-3723-a375-35ca22047b5d',
            name: 'Stop Differentiated Care Serivces',
          },
          names: [
            {
              uuid: 'b98d54f1-d56b-3723-a375-35ca22047b5d',
              conceptNameType: 'FULLY_SPECIFIED',
              name: 'Stop Differentiated Care Serivces',
            },
          ],
        },
      },
      {
        uuid: 'c82f5a3c-9ebe-4f88-bc04-69f4bacf7dec',
        obsDatetime: '2022-03-31T07:57:01.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '52824cbe-0e4d-4c18-8179-80b5799f34ed',
          name: {
            uuid: '3e582769-fea6-34c8-926b-9947f9c92f34',
            name: 'Community Based DSD Model',
          },
        },
        value: {
          uuid: '166444AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          name: {
            uuid: '83447bc5-5dbb-34b5-bb2a-0e266d15ccf0',
            name: 'Community medication distribution, peer led',
          },
          names: [
            {
              uuid: '83447bc5-5dbb-34b5-bb2a-0e266d15ccf0',
              conceptNameType: 'FULLY_SPECIFIED',
              name: 'Community medication distribution, peer led',
            },
          ],
        },
      },
      {
        uuid: 'd803cc49-0817-4bb1-816d-88829ddae141',
        obsDatetime: '2022-03-31T07:57:01.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          name: {
            uuid: 'f415bf25-2008-3ac2-8f0e-46e75648e30d',
            name: 'Date of event',
          },
        },
        value: '2022-03-30T00:00:00.000+0000',
      },
    ],
    form: null,
  },
  {
    uuid: '904eb39d-ee69-45e7-b75d-afb2ad3de9a0',
    encounterDatetime: '2022-03-31T07:46:38.000+0000',
    encounterType: {
      uuid: '62ee5922-a229-48d3-a1da-875c1ffa9436',
      display: 'Service Delivery Model Form',
      name: 'Service Delivery Model Form',
      description:
        'This form is used to document the enrolment and dis-enrolment of patients into differentiated service delivery.',
      retired: false,
      links: [
        {
          rel: 'self',
          uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encountertype/62ee5922-a229-48d3-a1da-875c1ffa9436',
          resourceAlias: 'encountertype',
        },
        {
          rel: 'full',
          uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encountertype/62ee5922-a229-48d3-a1da-875c1ffa9436?v=full',
          resourceAlias: 'encountertype',
        },
      ],
      resourceVersion: '1.8',
    },
    location: {
      uuid: 'b309447b-2b0b-4f2c-869b-fdae85f193f1',
      name: 'Registration Desk',
    },
    patient: {
      uuid: '1b2278d5-c9ea-4f00-bfb1-60af48dc838a',
      display: '100002U - Clark Bob Robert',
    },
    encounterProviders: [
      {
        uuid: '18d527f2-0afe-472d-9eae-cec6c5af5c0c',
        provider: {
          uuid: 'bc450226-4138-40b7-ad88-9c98df687738',
          name: 'Super User',
        },
      },
    ],
    obs: [
      {
        uuid: '187b61ed-c2aa-4e7c-924c-ff9161c2e198',
        obsDatetime: '2022-03-31T07:46:38.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '163513AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          name: {
            uuid: '44adef96-6a99-31d7-97ca-9f66b4221c6d',
            name: 'Reason for discontinuing service (text)',
          },
        },
        value: 'Unknown Reason ',
      },
      {
        uuid: '2c73f819-033e-4264-a368-46f0dadb1df3',
        obsDatetime: '2022-03-31T07:46:38.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '8742967d-8107-4cbb-a17e-9a8c7f624673',
          name: {
            uuid: '762f4286-4480-3eeb-9193-086dbe39bda4',
            name: 'Differentiated Care',
          },
        },
        value: {
          uuid: 'b5ddaf2e-dae3-4e4d-81ca-6cead3d59973',
          name: {
            uuid: 'b98d54f1-d56b-3723-a375-35ca22047b5d',
            name: 'Stop Differentiated Care Serivces',
          },
          names: [
            {
              uuid: 'b98d54f1-d56b-3723-a375-35ca22047b5d',
              conceptNameType: 'FULLY_SPECIFIED',
              name: 'Stop Differentiated Care Serivces',
            },
          ],
        },
      },
      {
        uuid: '37e910dd-ea1b-4442-8196-94e7775c1cd0',
        obsDatetime: '2022-03-31T07:46:38.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '59f34bfe-4375-461c-88a6-bd3d82ee7b79',
          name: {
            uuid: '28fcb385-ead9-31d2-a263-cade9ed600de',
            name: 'Facility based DSD Model',
          },
        },
        value: {
          uuid: '166446AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          name: {
            uuid: 'f6720cc1-722f-3a76-9038-ab1962ace993',
            name: 'Express pharmacy pickup without clinician visit',
          },
          names: [
            {
              uuid: 'f6720cc1-722f-3a76-9038-ab1962ace993',
              conceptNameType: 'FULLY_SPECIFIED',
              name: 'Express pharmacy pickup without clinician visit',
            },
          ],
        },
      },
      {
        uuid: '2d4f0a82-e3cf-41b2-937b-cf57fbc7666b',
        obsDatetime: '2022-03-31T07:46:38.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          name: {
            uuid: 'f415bf25-2008-3ac2-8f0e-46e75648e30d',
            name: 'Date of event',
          },
        },
        value: '2022-03-31T00:00:00.000+0000',
      },
      {
        uuid: 'b129564c-f9fc-4882-950d-4428e714c153',
        obsDatetime: '2022-03-31T07:46:38.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '52824cbe-0e4d-4c18-8179-80b5799f34ed',
          name: {
            uuid: '3e582769-fea6-34c8-926b-9947f9c92f34',
            name: 'Community Based DSD Model',
          },
        },
        value: {
          uuid: '166443AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          name: {
            uuid: '08e5ad16-c86e-3d64-8c8c-d842301e03aa',
            name: 'Community medication distribution, healthcare worker led',
          },
          names: [
            {
              uuid: '08e5ad16-c86e-3d64-8c8c-d842301e03aa',
              conceptNameType: 'FULLY_SPECIFIED',
              name: 'Community medication distribution, healthcare worker led',
            },
          ],
        },
      },
    ],
    form: null,
  },
];
