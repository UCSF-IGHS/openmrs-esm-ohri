import { getEncounterValues } from '@ohri/openmrs-esm-ohri-commons-lib';

export const mockEncounterType = '15272be5-ae9c-4278-a303-4b8907eae73b';

export const mockPatientUuid = '1b2278d5-c9ea-4f00-bfb1-60af48dc838a';

export const mockColumns = [
  {
    key: 'deathDate',
    header: 'Death Date',
    getValue: () => '2024-01-01',
    link: {
      handleNavigate: (encounter) => {
        encounter.launchFormActions?.viewEncounter();
      },
    },
  },
  {
    key: 'deathCause',
    header: 'Cause of Death',
    getValue: () => '2024-01-01',
    link: {
      handleNavigate: (encounter) => {
        encounter.launchFormActions?.viewEncounter();
      },
    },
  },
  {
    key: 'specificDeathCause',
    header: 'Specific cause of Death',
    getValue: () => '2024-01-01',
    link: {
      handleNavigate: (encounter) => {
        encounter.launchFormActions?.viewEncounter();
      },
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: () => '2024-01-01',
    link: {
      handleNavigate: (encounter) => {
        encounter.launchFormActions?.viewEncounter();
      },
    },
  },
];

export const mockForms = [
  {
    name: 'Death Form',
    uuid: 'some-uuid',
  },
];

export const mockEncounter = [
  {
    uuid: 'ee106966-4cd9-4465-8ac2-dfac9e3751d3',
    encounterDatetime: '2024-01-05T07:01:53.000+0000',
    encounterType: {
      uuid: '70d2b2f6-860b-438c-994b-c28e863dca34',
      display: 'TB Contact Listing',
      name: 'TB Contact Listing',
      description: 'Use to list contact of a TB patient for testing',
      retired: false,
      links: [
        {
          rel: 'self',
          uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encountertype/70d2b2f6-860b-438c-994b-c28e863dca34',
          resourceAlias: 'encountertype',
        },
        {
          rel: 'full',
          uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encountertype/70d2b2f6-860b-438c-994b-c28e863dca34?v=full',
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
        uuid: 'bc4ef577-ee0a-4288-85a7-77c753b3421e',
        provider: {
          uuid: 'bc450226-4138-40b7-ad88-9c98df687738',
          name: 'Super User',
        },
      },
    ],
    obs: [
      {
        uuid: '711b26c8-a91a-48e3-919c-c4888919d76d',
        obsDatetime: '2024-01-05T07:01:53.000+0000',
        voided: false,
        groupMembers: null,
        concept: {
          uuid: '160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          name: {
            uuid: 'f415bf25-2008-3ac2-8f0e-46e75648e30d',
            name: 'Date of event',
          },
        },
        value: '2024-01-05T00:00:00.000+0000',
      },
      {
        uuid: '37094756-1d74-420c-a63c-fe8418ea3b7d',
        obsDatetime: '2024-02-13T13:04:39.000+0000',
        voided: false,
        groupMembers: [
          {
            uuid: '71abc700-a69a-40c2-8a0b-90e76abe3da2',
            display: 'Address (text): test',
            concept: {
              uuid: '162725AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              display: 'Address (text)',
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/162725AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  resourceAlias: 'concept',
                },
              ],
            },
            person: {
              uuid: '1b2278d5-c9ea-4f00-bfb1-60af48dc838a',
              display: '100002U - Clark Bob Robert',
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/patient/1b2278d5-c9ea-4f00-bfb1-60af48dc838a',
                  resourceAlias: 'patient',
                },
              ],
            },
            obsDatetime: '2024-01-05T07:01:53.000+0000',
            accessionNumber: null,
            obsGroup: {
              uuid: '37094756-1d74-420c-a63c-fe8418ea3b7d',
              display: 'Contact details: test, 0789000000, Yes, Family member, Test',
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/obs/37094756-1d74-420c-a63c-fe8418ea3b7d',
                  resourceAlias: 'obs',
                },
              ],
            },
            valueCodedName: null,
            groupMembers: null,
            comment: null,
            location: {
              uuid: '44c3efb0-2583-4c80-a79e-1f756a03c0a1',
              display: 'Outpatient Clinic',
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/location/44c3efb0-2583-4c80-a79e-1f756a03c0a1',
                  resourceAlias: 'location',
                },
              ],
            },
            order: null,
            encounter: {
              uuid: 'ee106966-4cd9-4465-8ac2-dfac9e3751d3',
              display: 'TB Contact Listing 05/01/2024',
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encounter/ee106966-4cd9-4465-8ac2-dfac9e3751d3',
                  resourceAlias: 'encounter',
                },
              ],
            },
            voided: false,
            value: 'test',
            valueModifier: null,
            formFieldPath: 'ohri-forms-contactAddress',
            formFieldNamespace: 'ohri-forms',
            status: 'FINAL',
            interpretation: null,
            links: [
              {
                rel: 'self',
                uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/obs/71abc700-a69a-40c2-8a0b-90e76abe3da2',
                resourceAlias: 'obs',
              },
              {
                rel: 'full',
                uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/obs/71abc700-a69a-40c2-8a0b-90e76abe3da2?v=full',
                resourceAlias: 'obs',
              },
            ],
            resourceVersion: '2.1',
          },
          {
            uuid: '35293a4d-039e-4d49-b192-c0864beac1df',
            display: 'Contact phone number: 0789000000',
            concept: {
              uuid: '159635AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              display: 'Contact phone number',
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/159635AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  resourceAlias: 'concept',
                },
              ],
            },
            person: {
              uuid: '1b2278d5-c9ea-4f00-bfb1-60af48dc838a',
              display: '100002U - Clark Bob Robert',
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/patient/1b2278d5-c9ea-4f00-bfb1-60af48dc838a',
                  resourceAlias: 'patient',
                },
              ],
            },
            obsDatetime: '2024-01-05T07:01:53.000+0000',
            accessionNumber: null,
            obsGroup: {
              uuid: '37094756-1d74-420c-a63c-fe8418ea3b7d',
              display: 'Contact details: test, 0789000000, Yes, Family member, Test',
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/obs/37094756-1d74-420c-a63c-fe8418ea3b7d',
                  resourceAlias: 'obs',
                },
              ],
            },
            valueCodedName: null,
            groupMembers: null,
            comment: null,
            location: {
              uuid: '44c3efb0-2583-4c80-a79e-1f756a03c0a1',
              display: 'Outpatient Clinic',
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/location/44c3efb0-2583-4c80-a79e-1f756a03c0a1',
                  resourceAlias: 'location',
                },
              ],
            },
            order: null,
            encounter: {
              uuid: 'ee106966-4cd9-4465-8ac2-dfac9e3751d3',
              display: 'TB Contact Listing 05/01/2024',
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encounter/ee106966-4cd9-4465-8ac2-dfac9e3751d3',
                  resourceAlias: 'encounter',
                },
              ],
            },
            voided: false,
            value: '0789000000',
            valueModifier: null,
            formFieldPath: 'ohri-forms-contactPhoneNumber',
            formFieldNamespace: 'ohri-forms',
            status: 'FINAL',
            interpretation: null,
            links: [
              {
                rel: 'self',
                uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/obs/35293a4d-039e-4d49-b192-c0864beac1df',
                resourceAlias: 'obs',
              },
              {
                rel: 'full',
                uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/obs/35293a4d-039e-4d49-b192-c0864beac1df?v=full',
                resourceAlias: 'obs',
              },
            ],
            resourceVersion: '2.1',
          },
          {
            uuid: 'a5cef1b1-9f44-4fa5-9cc8-07ba2e8a3fc4',
            display: 'Contacts invited: Yes',
            concept: {
              uuid: '164072AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              display: 'Contacts invited',
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/164072AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  resourceAlias: 'concept',
                },
              ],
            },
            person: {
              uuid: '1b2278d5-c9ea-4f00-bfb1-60af48dc838a',
              display: '100002U - Clark Bob Robert',
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/patient/1b2278d5-c9ea-4f00-bfb1-60af48dc838a',
                  resourceAlias: 'patient',
                },
              ],
            },
            obsDatetime: '2024-01-05T07:01:53.000+0000',
            accessionNumber: null,
            obsGroup: {
              uuid: '37094756-1d74-420c-a63c-fe8418ea3b7d',
              display: 'Contact details: test, 0789000000, Yes, Family member, Test',
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/obs/37094756-1d74-420c-a63c-fe8418ea3b7d',
                  resourceAlias: 'obs',
                },
              ],
            },
            valueCodedName: null,
            groupMembers: null,
            comment: null,
            location: {
              uuid: '44c3efb0-2583-4c80-a79e-1f756a03c0a1',
              display: 'Outpatient Clinic',
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/location/44c3efb0-2583-4c80-a79e-1f756a03c0a1',
                  resourceAlias: 'location',
                },
              ],
            },
            order: null,
            encounter: {
              uuid: 'ee106966-4cd9-4465-8ac2-dfac9e3751d3',
              display: 'TB Contact Listing 05/01/2024',
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encounter/ee106966-4cd9-4465-8ac2-dfac9e3751d3',
                  resourceAlias: 'encounter',
                },
              ],
            },
            voided: false,
            value: {
              uuid: '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              display: 'Yes',
              name: {
                display: 'Yes',
                uuid: 'd8c3337b-a1cb-3519-af40-7a016eedb72f',
                name: 'Yes',
                locale: 'en',
                localePreferred: true,
                conceptNameType: 'FULLY_SPECIFIED',
                links: [
                  {
                    rel: 'self',
                    uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/d8c3337b-a1cb-3519-af40-7a016eedb72f',
                    resourceAlias: 'name',
                  },
                  {
                    rel: 'full',
                    uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/d8c3337b-a1cb-3519-af40-7a016eedb72f?v=full',
                    resourceAlias: 'name',
                  },
                ],
                resourceVersion: '1.9',
              },
              datatype: {
                uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                display: 'N/A',
                links: [
                  {
                    rel: 'self',
                    uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/conceptdatatype/8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    resourceAlias: 'conceptdatatype',
                  },
                ],
              },
              conceptClass: {
                uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Misc',
                links: [
                  {
                    rel: 'self',
                    uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/conceptclass/8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    resourceAlias: 'conceptclass',
                  },
                ],
              },
              set: false,
              version: null,
              retired: false,
              names: [
                {
                  uuid: 'd8c3337b-a1cb-3519-af40-7a016eedb72f',
                  display: 'Yes',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/d8c3337b-a1cb-3519-af40-7a016eedb72f',
                      resourceAlias: 'name',
                    },
                  ],
                },
              ],
              descriptions: [
                {
                  uuid: '24f4ab95-c95b-42cc-8839-7014b00987ce',
                  display: 'Generic answer to a question.',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/description/24f4ab95-c95b-42cc-8839-7014b00987ce',
                      resourceAlias: 'description',
                    },
                  ],
                },
              ],
              mappings: [
                {
                  uuid: '564715f3-ea35-4e17-b3a7-c6212db334c1',
                  display: 'PIH: 1065',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/564715f3-ea35-4e17-b3a7-c6212db334c1',
                      resourceAlias: 'mapping',
                    },
                  ],
                },
                {
                  uuid: 'd7e61750-ff8a-4a57-aa99-a78f0d803ce6',
                  display: 'CIEL: 1065',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/d7e61750-ff8a-4a57-aa99-a78f0d803ce6',
                      resourceAlias: 'mapping',
                    },
                  ],
                },
                {
                  uuid: 'a574243a-154e-40d9-825a-7c3e51c0ca6f',
                  display: 'SNOMED CT: 373066001',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/a574243a-154e-40d9-825a-7c3e51c0ca6f',
                      resourceAlias: 'mapping',
                    },
                  ],
                },
                {
                  uuid: '6757c68b-2aa9-4080-a4ae-40b946081177',
                  display: 'AMPATH: 1065',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/6757c68b-2aa9-4080-a4ae-40b946081177',
                      resourceAlias: 'mapping',
                    },
                  ],
                },
              ],
              answers: [],
              setMembers: [],
              attributes: [],
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  resourceAlias: 'concept',
                },
                {
                  rel: 'full',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA?v=full',
                  resourceAlias: 'concept',
                },
              ],
              resourceVersion: '2.0',
            },
            valueModifier: null,
            formFieldPath: 'ohri-forms-contactsInvited',
            formFieldNamespace: 'ohri-forms',
            status: 'FINAL',
            interpretation: null,
            links: [
              {
                rel: 'self',
                uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/obs/a5cef1b1-9f44-4fa5-9cc8-07ba2e8a3fc4',
                resourceAlias: 'obs',
              },
              {
                rel: 'full',
                uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/obs/a5cef1b1-9f44-4fa5-9cc8-07ba2e8a3fc4?v=full',
                resourceAlias: 'obs',
              },
            ],
            resourceVersion: '2.1',
          },
          {
            uuid: 'd93d637a-f5ae-40f0-981b-7705e96ec833',
            display: 'Relationship to Tuberculosis contact: Family member',
            concept: {
              uuid: '160239AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              display: 'Relationship to Tuberculosis contact',
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/160239AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  resourceAlias: 'concept',
                },
              ],
            },
            person: {
              uuid: '1b2278d5-c9ea-4f00-bfb1-60af48dc838a',
              display: '100002U - Clark Bob Robert',
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/patient/1b2278d5-c9ea-4f00-bfb1-60af48dc838a',
                  resourceAlias: 'patient',
                },
              ],
            },
            obsDatetime: '2024-01-05T07:01:53.000+0000',
            accessionNumber: null,
            obsGroup: {
              uuid: '37094756-1d74-420c-a63c-fe8418ea3b7d',
              display: 'Contact details: test, 0789000000, Yes, Family member, Test',
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/obs/37094756-1d74-420c-a63c-fe8418ea3b7d',
                  resourceAlias: 'obs',
                },
              ],
            },
            valueCodedName: null,
            groupMembers: null,
            comment: null,
            location: {
              uuid: '44c3efb0-2583-4c80-a79e-1f756a03c0a1',
              display: 'Outpatient Clinic',
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/location/44c3efb0-2583-4c80-a79e-1f756a03c0a1',
                  resourceAlias: 'location',
                },
              ],
            },
            order: null,
            encounter: {
              uuid: 'ee106966-4cd9-4465-8ac2-dfac9e3751d3',
              display: 'TB Contact Listing 05/01/2024',
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encounter/ee106966-4cd9-4465-8ac2-dfac9e3751d3',
                  resourceAlias: 'encounter',
                },
              ],
            },
            voided: false,
            value: {
              uuid: '1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              display: 'Family member',
              name: {
                display: 'Family member',
                uuid: '634a1aa6-73dc-3ab7-a067-293ff62ca1e7',
                name: 'Family member',
                locale: 'en',
                localePreferred: true,
                conceptNameType: 'FULLY_SPECIFIED',
                links: [
                  {
                    rel: 'self',
                    uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/634a1aa6-73dc-3ab7-a067-293ff62ca1e7',
                    resourceAlias: 'name',
                  },
                  {
                    rel: 'full',
                    uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/634a1aa6-73dc-3ab7-a067-293ff62ca1e7?v=full',
                    resourceAlias: 'name',
                  },
                ],
                resourceVersion: '1.9',
              },
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
                links: [
                  {
                    rel: 'self',
                    uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/conceptdatatype/8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                    resourceAlias: 'conceptdatatype',
                  },
                ],
              },
              conceptClass: {
                uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Question',
                links: [
                  {
                    rel: 'self',
                    uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/conceptclass/8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                    resourceAlias: 'conceptclass',
                  },
                ],
              },
              set: false,
              version: null,
              retired: false,
              names: [
                {
                  uuid: '634a1aa6-73dc-3ab7-a067-293ff62ca1e7',
                  display: 'Family member',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/634a1aa6-73dc-3ab7-a067-293ff62ca1e7',
                      resourceAlias: 'name',
                    },
                  ],
                },
              ],
              descriptions: [],
              mappings: [
                {
                  uuid: '20f1cf1f-c948-4fd7-8123-bebe110beb9a',
                  display: 'CIEL: 1560',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/20f1cf1f-c948-4fd7-8123-bebe110beb9a',
                      resourceAlias: 'mapping',
                    },
                  ],
                },
                {
                  uuid: '58c0fe00-b0e8-4bea-8ed0-86bab365642f',
                  display: 'PIH: 6441',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/58c0fe00-b0e8-4bea-8ed0-86bab365642f',
                      resourceAlias: 'mapping',
                    },
                  ],
                },
                {
                  uuid: 'fbd918f2-3e31-45ee-8de2-30663bb545b4',
                  display: 'SNOMED CT: 303071001',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/fbd918f2-3e31-45ee-8de2-30663bb545b4',
                      resourceAlias: 'mapping',
                    },
                  ],
                },
              ],
              answers: [
                {
                  uuid: '975AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Aunt',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/975AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '160729AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Brother',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/160729AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '1528AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Child',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/1528AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '160728AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Daughter',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/160728AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '971AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Father',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/971AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '160273AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Grandfather',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/160273AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '159772AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Grandmother',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/159772AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '973AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Grandparent',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/973AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '160724AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Maternal grandfather',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/160724AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '160723AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Maternal grandmother',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/160723AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '970AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Mother',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/970AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '5620AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Other family member',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/5620AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '1527AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Parent',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/1527AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '5617AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Partner or spouse',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/5617AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '160725AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Paternal grandfather',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/160725AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '160726AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Paternal grandmother',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/160726AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '972AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Sibling',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/972AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '160730AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Sister',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/160730AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '160727AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Son',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/160727AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '974AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Uncle',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/974AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '970AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Mother',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/970AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '971AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Father',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/971AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '159772AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Grandmother',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/159772AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '160273AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Grandfather',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/160273AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '972AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Sibling',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/972AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '1528AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Child',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/1528AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '975AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Aunt',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/975AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '974AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Uncle',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/974AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '5620AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Other family member',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/5620AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '160726AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Paternal grandmother',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/160726AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '160723AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Maternal grandmother',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/160723AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '160725AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Paternal grandfather',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/160725AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '160724AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Maternal grandfather',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/160724AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '160727AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Son',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/160727AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '160728AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Daughter',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/160728AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '160729AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Brother',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/160729AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '160730AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Sister',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/160730AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '5617AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Partner or spouse',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/5617AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '973AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Grandparent',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/973AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
                {
                  uuid: '1527AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  display: 'Parent',
                  links: [
                    {
                      rel: 'self',
                      uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/1527AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      resourceAlias: 'concept',
                    },
                  ],
                },
              ],
              setMembers: [],
              attributes: [],
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  resourceAlias: 'concept',
                },
                {
                  rel: 'full',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA?v=full',
                  resourceAlias: 'concept',
                },
              ],
              resourceVersion: '2.0',
            },
            valueModifier: null,
            formFieldPath: 'ohri-forms-tbRelationship',
            formFieldNamespace: 'ohri-forms',
            status: 'FINAL',
            interpretation: null,
            links: [
              {
                rel: 'self',
                uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/obs/d93d637a-f5ae-40f0-981b-7705e96ec833',
                resourceAlias: 'obs',
              },
              {
                rel: 'full',
                uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/obs/d93d637a-f5ae-40f0-981b-7705e96ec833?v=full',
                resourceAlias: 'obs',
              },
            ],
            resourceVersion: '2.1',
          },
          {
            uuid: 'a8f75b70-2102-4d91-b946-d075477e153e',
            display: 'Name of contact person: Test',
            concept: {
              uuid: '163258AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              display: 'Name of contact person',
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/concept/163258AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  resourceAlias: 'concept',
                },
              ],
            },
            person: {
              uuid: '1b2278d5-c9ea-4f00-bfb1-60af48dc838a',
              display: '100002U - Clark Bob Robert',
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/patient/1b2278d5-c9ea-4f00-bfb1-60af48dc838a',
                  resourceAlias: 'patient',
                },
              ],
            },
            obsDatetime: '2024-01-05T07:01:53.000+0000',
            accessionNumber: null,
            obsGroup: {
              uuid: '37094756-1d74-420c-a63c-fe8418ea3b7d',
              display: 'Contact details: test, 0789000000, Yes, Family member, Test',
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/obs/37094756-1d74-420c-a63c-fe8418ea3b7d',
                  resourceAlias: 'obs',
                },
              ],
            },
            valueCodedName: null,
            groupMembers: null,
            comment: null,
            location: {
              uuid: '44c3efb0-2583-4c80-a79e-1f756a03c0a1',
              display: 'Outpatient Clinic',
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/location/44c3efb0-2583-4c80-a79e-1f756a03c0a1',
                  resourceAlias: 'location',
                },
              ],
            },
            order: null,
            encounter: {
              uuid: 'ee106966-4cd9-4465-8ac2-dfac9e3751d3',
              display: 'TB Contact Listing 05/01/2024',
              links: [
                {
                  rel: 'self',
                  uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encounter/ee106966-4cd9-4465-8ac2-dfac9e3751d3',
                  resourceAlias: 'encounter',
                },
              ],
            },
            voided: false,
            value: 'Test',
            valueModifier: null,
            formFieldPath: 'ohri-forms-nameofContactPerson',
            formFieldNamespace: 'ohri-forms',
            status: 'FINAL',
            interpretation: null,
            links: [
              {
                rel: 'self',
                uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/obs/a8f75b70-2102-4d91-b946-d075477e153e',
                resourceAlias: 'obs',
              },
              {
                rel: 'full',
                uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/obs/a8f75b70-2102-4d91-b946-d075477e153e?v=full',
                resourceAlias: 'obs',
              },
            ],
            resourceVersion: '2.1',
          },
        ],
        concept: {
          uuid: '164351AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          name: {
            uuid: 'd878b58c-51e1-3987-a3d7-96d7af4fba58',
            name: 'Contact details',
          },
        },
        value: null,
      },
    ],
    form: {
      uuid: 'cb16d920-62f1-3696-b781-e6a4f5e80de1',
      name: 'TB Contact Listing',
    },
    launchFormActions: {},
  },
];
