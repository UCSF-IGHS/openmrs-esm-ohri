export const headerTitle = 'HIV Monitoring';

export const patientUuid = 'b280078a-c0ce-443b-9997-3c66c63ec2f8';

export const columns = [
  {
    key: 'viralLoad',
    header: 'Current Viral Load',
    encounterUuid: '41af1931-184e-45f8-86ca-d42e0db0b8a1',
    hasSummary: true,
    encounter: {
      uuid: '12b40062-e225-4160-85bf-e2afd5a904b2',
      encounterDatetime: '2023-12-19T08:09:59.000+0000',
      encounterType: {
        uuid: '41af1931-184e-45f8-86ca-d42e0db0b8a1',
        display: 'Viral Load results',
        name: 'Viral Load results',
        description: 'Viral Load results',
        retired: false,
        links: [
          {
            rel: 'self',
            uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encountertype/41af1931-184e-45f8-86ca-d42e0db0b8a1',
            resourceAlias: 'encountertype',
          },
          {
            rel: 'full',
            uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encountertype/41af1931-184e-45f8-86ca-d42e0db0b8a1?v=full',
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
        uuid: 'b280078a-c0ce-443b-9997-3c66c63ec2f8',
        display: '100000Y - John Doe',
      },
      encounterProviders: [
        {
          uuid: '4a6609d9-f7d4-404a-b67c-d07b609e2454',
          provider: {
            uuid: 'bc450226-4138-40b7-ad88-9c98df687738',
            name: 'Super User',
          },
        },
      ],
      obs: [
        {
          uuid: 'cd640491-2a7b-4a47-8850-73dc35fce00f',
          obsDatetime: '2023-12-19T08:09:59.000+0000',
          voided: false,
          groupMembers: null,
          concept: {
            uuid: '856AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            name: {
              uuid: 'b8eca463-0dd9-3b03-a233-ebd08342cf37',
              name: 'HIV viral load',
            },
          },
          value: 66,
        },
        {
          uuid: '6962e396-3bc6-4dfa-8266-7690784edbc1',
          obsDatetime: '2023-12-19T08:09:59.000+0000',
          voided: false,
          groupMembers: null,
          concept: {
            uuid: '163724AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            name: {
              uuid: '368ec1c9-fcda-3f00-927e-205f15dc0143',
              name: 'Date test completed',
            },
          },
          value: '2023-12-20T06:00:00.000+0000',
        },
        {
          uuid: 'e39deb8f-25b4-456a-b579-9c4ff4fd482c',
          obsDatetime: '2023-12-19T08:09:59.000+0000',
          voided: false,
          groupMembers: null,
          concept: {
            uuid: '86cc0cfe-bace-4969-94b6-d139f4971d13',
            name: {
              uuid: '23de33ba-26ec-34e7-b2a6-a7d7512327b1',
              name: 'Reason for Viral Load Request',
            },
          },
          value: {
            uuid: '857e08cb-1ca7-4b4e-9698-38cdb76df59b',
            name: {
              uuid: '10975bb8-a12a-390f-92fd-87591a446368',
              name: 'Low-level viremia',
            },
            names: [
              {
                uuid: '10975bb8-a12a-390f-92fd-87591a446368',
                conceptNameType: 'FULLY_SPECIFIED',
                name: 'Low-level viremia',
              },
            ],
          },
        },
        {
          uuid: '67df1ead-df92-4390-877e-0491185a094f',
          obsDatetime: '2023-12-19T08:09:59.000+0000',
          voided: false,
          groupMembers: null,
          concept: {
            uuid: '1305AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            name: {
              uuid: 'df709635-3d93-3910-b1a3-2777a6b202bb',
              name: 'HIV viral load, qualitative',
            },
          },
          value: {
            uuid: '1301AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            name: {
              uuid: '67a4b2cb-18ed-38e2-9714-be74f82eeb39',
              name: 'Detected',
            },
            names: [
              {
                uuid: '67a4b2cb-18ed-38e2-9714-be74f82eeb39',
                conceptNameType: 'FULLY_SPECIFIED',
                name: 'Detected',
              },
            ],
          },
        },
      ],
      form: {
        uuid: 'c9eb639e-b5d0-3ed3-a3c7-0dc48fc6acb6',
        name: 'Viral Load Lab Result',
      },
    },
  },
  {
    key: 'currentVLReason',
    header: 'Reason For Current VL',
    encounterUuid: '74bf4fe6-8fdb-4228-be39-680a93a9cf6d',
    concept: '86cc0cfe-bace-4969-94b6-d139f4971d13',
    hasSummary: true,
    encounter: {
      uuid: 'e6424fcd-58a9-459f-84a2-ed25bc18e7c1',
      encounterDatetime: '2023-06-26T12:21:40.000+0000',
      encounterType: {
        uuid: '74bf4fe6-8fdb-4228-be39-680a93a9cf6d',
        display: 'ART Therapy',
        name: 'ART Therapy',
        description: 'ART Therapy',
        retired: false,
        links: [
          {
            rel: 'self',
            uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encountertype/74bf4fe6-8fdb-4228-be39-680a93a9cf6d',
            resourceAlias: 'encountertype',
          },
          {
            rel: 'full',
            uri: 'https://ohri-dev.globalhealthapp.net/openmrs/ws/rest/v1/encountertype/74bf4fe6-8fdb-4228-be39-680a93a9cf6d?v=full',
            resourceAlias: 'encountertype',
          },
        ],
        resourceVersion: '1.8',
      },
      location: {
        uuid: 'ba685651-ed3b-4e63-9b35-78893060758a',
        name: 'Inpatient Ward',
      },
      patient: {
        uuid: 'b280078a-c0ce-443b-9997-3c66c63ec2f8',
        display: '100000Y - John Doe',
      },
      encounterProviders: [
        {
          uuid: '285ebeba-54c3-4f19-b96f-318d0b43bad2',
          provider: {
            uuid: 'bc450226-4138-40b7-ad88-9c98df687738',
            name: 'Super User',
          },
        },
      ],
      obs: [
        {
          uuid: '261d5155-e7d4-480c-aa1d-43c1d2517105',
          obsDatetime: '2023-06-26T12:21:40.000+0000',
          voided: false,
          groupMembers: null,
          concept: {
            uuid: '7557d77c-172b-4673-9335-67a38657dd01',
            name: {
              uuid: 'dde8b7f8-c395-3448-ac53-49a83b59a663',
              name: 'Antiretroviral (ART) plan',
            },
          },
          value: {
            uuid: '1256AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            name: {
              uuid: '5c550201-bbe2-34d0-a545-a2f3f5461e42',
              name: 'Start drugs',
            },
            names: [
              {
                uuid: '5c550201-bbe2-34d0-a545-a2f3f5461e42',
                conceptNameType: 'FULLY_SPECIFIED',
                name: 'Start drugs',
              },
            ],
          },
        },
        {
          uuid: 'ad9914ee-e420-4761-b4ab-34b79ad9889a',
          obsDatetime: '2023-06-26T12:21:40.000+0000',
          voided: false,
          groupMembers: null,
          concept: {
            uuid: '164515AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            name: {
              uuid: '364231a7-25f2-3ab9-8ba9-ab1f830ba274',
              name: 'ARV regimen or code patient is switched to',
            },
          },
          value: {
            uuid: '164506AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            name: {
              uuid: 'cd0b4fd5-3524-32a1-9155-d066557fbf20',
              name: 'Adult 1st line ARV regimen',
            },
            names: [
              {
                uuid: 'cd0b4fd5-3524-32a1-9155-d066557fbf20',
                conceptNameType: 'FULLY_SPECIFIED',
                name: 'Adult 1st line ARV regimen',
              },
            ],
          },
        },
        {
          uuid: '30230ca6-67ae-4b9b-87cc-77edf9458b68',
          obsDatetime: '2023-06-26T12:21:40.000+0000',
          voided: false,
          groupMembers: null,
          concept: {
            uuid: '159599AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            name: {
              uuid: 'a5a64834-09f0-3721-8425-f3ac9a7f6c66',
              name: 'Antiretroviral treatment start date',
            },
          },
          value: '2023-06-26T00:00:00.000+0000',
        },
        {
          uuid: 'e541f6a9-92d6-4490-8ab0-bb7a18ac733d',
          obsDatetime: '2023-06-26T12:21:40.000+0000',
          voided: false,
          groupMembers: null,
          concept: {
            uuid: 'dfbe256e-30ba-4033-837a-2e8477f2e7cd',
            name: {
              uuid: 'cdeec626-0bf4-3b5e-a02e-72780150d300',
              name: 'Patients Regimen',
            },
          },
          value: {
            uuid: 'f827ed18-f816-4cd0-b77c-28a0209c96c0',
            name: {
              uuid: '360d4f0b-cb98-3b8a-8af3-2e5b4e4fa48d',
              name: 'ABC + 3TC + ATVr',
            },
            names: [
              {
                uuid: '360d4f0b-cb98-3b8a-8af3-2e5b4e4fa48d',
                conceptNameType: 'FULLY_SPECIFIED',
                name: 'ABC + 3TC + ATVr',
              },
            ],
          },
        },
        {
          uuid: '5002238b-32c7-4587-a8e4-43ceafb3fd29',
          obsDatetime: '2023-06-26T12:21:40.000+0000',
          voided: false,
          groupMembers: null,
          concept: {
            uuid: '160632AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            name: {
              uuid: '06d5da31-4437-35aa-a533-7973b5358c3e',
              name: 'Free text general',
            },
          },
          value: 'test',
        },
      ],
      form: {
        uuid: 'f99fadd8-feb7-321c-ab58-7569805668e7',
        name: 'ART Therapy Form',
      },
    },
  },
  {
    key: 'lastCD4Count',
    header: 'Last CD4 Count',
    encounterUuid: '96adb28e-e417-43a3-8f7d-682f8af5e912',
    concept: '5497AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    hasSummary: true,
    encounter: {
      uuid: 'de4c914e-8bbf-4ea2-a2d8-684b2d10504e',
      encounterDatetime: '2023-12-19T08:09:59.000+0000',
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
        uuid: 'b280078a-c0ce-443b-9997-3c66c63ec2f8',
        display: '100000Y - John Doe',
      },
      encounterProviders: [
        {
          uuid: '05a67657-6c12-4621-aadb-55c50af9e976',
          provider: {
            uuid: 'bc450226-4138-40b7-ad88-9c98df687738',
            name: 'Super User',
          },
        },
      ],
      obs: [
        {
          uuid: '1b3105dd-5389-4a40-b74a-80f9370aff0d',
          obsDatetime: '2023-12-19T08:09:59.000+0000',
          voided: false,
          groupMembers: null,
          concept: {
            uuid: '730AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            name: {
              uuid: '76654af1-ae9d-398f-a767-e14ae893712c',
              name: 'CD4%',
            },
          },
          value: 9,
        },
        {
          uuid: 'b23f83e8-37c2-4490-bd93-d80b89767a0c',
          obsDatetime: '2023-12-19T08:09:59.000+0000',
          voided: false,
          groupMembers: null,
          concept: {
            uuid: '161011AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            name: {
              uuid: 'f625c7e8-8b20-3fa3-831c-23fc609b882b',
              name: 'Free text comment',
            },
          },
          value: 'm',
        },
        {
          uuid: '98c84289-f927-4583-b893-a6c3b2600f2b',
          obsDatetime: '2023-12-19T08:09:59.000+0000',
          voided: false,
          groupMembers: null,
          concept: {
            uuid: '163724AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            name: {
              uuid: '368ec1c9-fcda-3f00-927e-205f15dc0143',
              name: 'Date test completed',
            },
          },
          value: '2023-12-20T03:00:00.000+0000',
        },
        {
          uuid: 'a77fbdda-f13f-4914-a129-311a090616f7',
          obsDatetime: '2023-12-19T08:09:59.000+0000',
          voided: false,
          groupMembers: null,
          concept: {
            uuid: '5497AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            name: {
              uuid: 'e4bf5510-b291-3895-88f4-009834675e4f',
              name: 'CD4 count',
            },
          },
          value: 9,
        },
      ],
      form: {
        uuid: 'a66197de-419a-3223-8691-f70d36b1524b',
        name: 'CD4 Lab Result',
      },
    },
  },
];
