export const mockEncounterNew = [
  {
    uuid: '623178fe-8f76-4663-a54d-93591248f371',
    display: 'Labour & Delivery 07/24/2023',
    encounterDatetime: '2023-07-24T15:28:07.000+0000',
    patient: {
      uuid: '0c044d55-6bbb-4809-979c-8322d3095765',
      display: '10014EW - smith Kimoti Wills',
      links: [
        {
          rel: 'self',
          uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/patient/0c044d55-6bbb-4809-979c-8322d3095765',
          resourceAlias: 'patient',
        },
      ],
    },
    location: {
      uuid: '1ce1b7d4-c865-4178-82b0-5932e51503d6',
      display: 'Community Outreach',
      name: 'Community Outreach',
      description: 'Community Outreach',
      address1: null,
      address2: null,
      cityVillage: null,
      stateProvince: null,
      country: null,
      postalCode: null,
      latitude: null,
      longitude: null,
      countyDistrict: null,
      address3: null,
      address4: null,
      address5: null,
      address6: null,
      tags: [
        {
          uuid: 'b8bbf83e-645f-451f-8efe-a0db56f09676',
          display: 'Login Location',
          links: [
            {
              rel: 'self',
              uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/locationtag/b8bbf83e-645f-451f-8efe-a0db56f09676',
              resourceAlias: 'locationtag',
            },
          ],
        },
      ],
      parentLocation: null,
      childLocations: [
        {
          uuid: '171490ff-a8a1-47a8-ba58-59d18b621258',
          display: 'ART Clinic',
          links: [
            {
              rel: 'self',
              uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/location/171490ff-a8a1-47a8-ba58-59d18b621258',
              resourceAlias: 'location',
            },
          ],
        },
      ],
      retired: false,
      attributes: [],
      address7: null,
      address8: null,
      address9: null,
      address10: null,
      address11: null,
      address12: null,
      address13: null,
      address14: null,
      address15: null,
      links: [
        {
          rel: 'self',
          uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/location/1ce1b7d4-c865-4178-82b0-5932e51503d6',
          resourceAlias: 'location',
        },
        {
          rel: 'full',
          uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/location/1ce1b7d4-c865-4178-82b0-5932e51503d6?v=full',
          resourceAlias: 'location',
        },
      ],
      resourceVersion: '2.0',
    },
    form: {
      uuid: '7ef7f07a-f763-414b-816d-4dc84faac140',
      display: 'Another Test Form',
      name: 'Another Test Form',
      description: 'Test form',
      encounterType: {
        uuid: 'd218da2e-7448-4f24-b507-5469598b57c6',
        display: 'Labour & Delivery',
        links: [
          {
            rel: 'self',
            uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/encountertype/d218da2e-7448-4f24-b507-5469598b57c6',
            resourceAlias: 'encountertype',
          },
        ],
      },
      version: '1.0',
      build: null,
      published: false,
      formFields: [],
      retired: false,
      resources: [
        {
          uuid: '501b3d34-bb2f-475c-af5d-793fe39f72c9',
          display: 'JSON schema',
          links: [
            {
              rel: 'value',
              uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/form/7ef7f07a-f763-414b-816d-4dc84faac140/resource/501b3d34-bb2f-475c-af5d-793fe39f72c9/value',
              resourceAlias: 'resource',
            },
            {
              rel: 'self',
              uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/form/7ef7f07a-f763-414b-816d-4dc84faac140/resource/501b3d34-bb2f-475c-af5d-793fe39f72c9',
              resourceAlias: 'resource',
            },
          ],
        },
      ],
      links: [
        {
          rel: 'self',
          uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/form/7ef7f07a-f763-414b-816d-4dc84faac140',
          resourceAlias: 'form',
        },
        {
          rel: 'full',
          uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/form/7ef7f07a-f763-414b-816d-4dc84faac140?v=full',
          resourceAlias: 'form',
        },
      ],
      resourceVersion: '1.9',
    },
    encounterType: {
      uuid: 'd218da2e-7448-4f24-b507-5469598b57c6',
      display: 'Labour & Delivery',
      name: 'Labour & Delivery',
      description: null,
      retired: false,
      links: [
        {
          rel: 'self',
          uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/encountertype/d218da2e-7448-4f24-b507-5469598b57c6',
          resourceAlias: 'encountertype',
        },
        {
          rel: 'full',
          uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/encountertype/d218da2e-7448-4f24-b507-5469598b57c6?v=full',
          resourceAlias: 'encountertype',
        },
      ],
      resourceVersion: '1.8',
    },
    obs: [
      {
        uuid: '11ecb12f-827d-4964-b6cc-1244def28d65',
        display: 'Notes: Mother is in perfect condition',
        concept: {
          uuid: '0db0eb6d-53df-4a08-9783-28a14d51c11a',
          display: 'Notes',
          links: [
            {
              rel: 'self',
              uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/concept/0db0eb6d-53df-4a08-9783-28a14d51c11a',
              resourceAlias: 'concept',
            },
          ],
        },
        person: {
          uuid: '0c044d55-6bbb-4809-979c-8322d3095765',
          display: '10014EW - smith Kimoti Wills',
          links: [
            {
              rel: 'self',
              uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/patient/0c044d55-6bbb-4809-979c-8322d3095765',
              resourceAlias: 'patient',
            },
          ],
        },
        obsDatetime: '2023-07-24T15:28:07.000+0000',
        accessionNumber: null,
        obsGroup: null,
        valueCodedName: null,
        groupMembers: null,
        comment: null,
        location: {
          uuid: '1ce1b7d4-c865-4178-82b0-5932e51503d6',
          display: 'Community Outreach',
          links: [
            {
              rel: 'self',
              uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/location/1ce1b7d4-c865-4178-82b0-5932e51503d6',
              resourceAlias: 'location',
            },
          ],
        },
        order: null,
        encounter: {
          uuid: '623178fe-8f76-4663-a54d-93591248f371',
          display: 'Labour & Delivery 07/24/2023',
          links: [
            {
              rel: 'self',
              uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/encounter/623178fe-8f76-4663-a54d-93591248f371',
              resourceAlias: 'encounter',
            },
          ],
        },
        voided: false,
        value: 'Mother is in perfect condition',
        valueModifier: null,
        formFieldPath: 'ohri-forms-notes',
        formFieldNamespace: 'ohri-forms',
        status: 'FINAL',
        interpretation: null,
        links: [
          {
            rel: 'self',
            uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/obs/11ecb12f-827d-4964-b6cc-1244def28d65',
            resourceAlias: 'obs',
          },
          {
            rel: 'full',
            uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/obs/11ecb12f-827d-4964-b6cc-1244def28d65?v=full',
            resourceAlias: 'obs',
          },
        ],
        resourceVersion: '2.1',
      },
      {
        uuid: 'd6eb3b57-8ce3-4d1c-ad6a-4109b1220fc1',
        display: 'Infant details group: 2023-07-24, TBD',
        concept: {
          uuid: '90df094d-a90e-4570-993a-c8f8753117cd',
          display: 'Infant details group',
          links: [
            {
              rel: 'self',
              uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/concept/90df094d-a90e-4570-993a-c8f8753117cd',
              resourceAlias: 'concept',
            },
          ],
        },
        person: {
          uuid: '0c044d55-6bbb-4809-979c-8322d3095765',
          display: '10014EW - smith Kimoti Wills',
          links: [
            {
              rel: 'self',
              uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/patient/0c044d55-6bbb-4809-979c-8322d3095765',
              resourceAlias: 'patient',
            },
          ],
        },
        obsDatetime: '2023-07-24T15:28:07.000+0000',
        accessionNumber: null,
        obsGroup: null,
        valueCodedName: null,
        groupMembers: [
          {
            uuid: '515c6400-9496-4980-8415-0f60a5c5ff99',
            display: 'Date of birth: 2023-07-24',
            concept: {
              uuid: '2d5e4c09-9a4f-4a53-b2db-4490dcbf3b7d',
              display: 'Date of birth',
              links: [
                {
                  rel: 'self',
                  uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/concept/2d5e4c09-9a4f-4a53-b2db-4490dcbf3b7d',
                  resourceAlias: 'concept',
                },
              ],
            },
            person: {
              uuid: '0c044d55-6bbb-4809-979c-8322d3095765',
              display: '10014EW - smith Kimoti Wills',
              links: [
                {
                  rel: 'self',
                  uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/patient/0c044d55-6bbb-4809-979c-8322d3095765',
                  resourceAlias: 'patient',
                },
              ],
            },
            obsDatetime: '2023-07-24T15:28:07.000+0000',
            accessionNumber: null,
            obsGroup: {
              uuid: 'd6eb3b57-8ce3-4d1c-ad6a-4109b1220fc1',
              display: 'Infant details group: 2023-07-24, TBD',
              links: [
                {
                  rel: 'self',
                  uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/obs/d6eb3b57-8ce3-4d1c-ad6a-4109b1220fc1',
                  resourceAlias: 'obs',
                },
              ],
            },
            valueCodedName: null,
            groupMembers: null,
            comment: null,
            location: {
              uuid: '1ce1b7d4-c865-4178-82b0-5932e51503d6',
              display: 'Community Outreach',
              links: [
                {
                  rel: 'self',
                  uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/location/1ce1b7d4-c865-4178-82b0-5932e51503d6',
                  resourceAlias: 'location',
                },
              ],
            },
            order: null,
            encounter: {
              uuid: '623178fe-8f76-4663-a54d-93591248f371',
              display: 'Labour & Delivery 07/24/2023',
              links: [
                {
                  rel: 'self',
                  uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/encounter/623178fe-8f76-4663-a54d-93591248f371',
                  resourceAlias: 'encounter',
                },
              ],
            },
            voided: false,
            value: '2023-07-24T00:00:00.000+0000',
            valueModifier: null,
            formFieldPath: 'ohri-forms-date_of_birth',
            formFieldNamespace: 'ohri-forms',
            status: 'FINAL',
            interpretation: null,
            links: [
              {
                rel: 'self',
                uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/obs/515c6400-9496-4980-8415-0f60a5c5ff99',
                resourceAlias: 'obs',
              },
              {
                rel: 'full',
                uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/obs/515c6400-9496-4980-8415-0f60a5c5ff99?v=full',
                resourceAlias: 'obs',
              },
            ],
            resourceVersion: '2.1',
          },
          {
            uuid: '83a325d3-d039-41c2-8c10-b1c37a8350d6',
            display: 'Infant Name: TBD',
            concept: {
              uuid: '7a23684b-e579-4a9a-b35e-2e3aa0ddcfe0',
              display: 'Infant Name',
              links: [
                {
                  rel: 'self',
                  uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/concept/7a23684b-e579-4a9a-b35e-2e3aa0ddcfe0',
                  resourceAlias: 'concept',
                },
              ],
            },
            person: {
              uuid: '0c044d55-6bbb-4809-979c-8322d3095765',
              display: '10014EW - smith Kimoti Wills',
              links: [
                {
                  rel: 'self',
                  uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/patient/0c044d55-6bbb-4809-979c-8322d3095765',
                  resourceAlias: 'patient',
                },
              ],
            },
            obsDatetime: '2023-07-24T15:28:07.000+0000',
            accessionNumber: null,
            obsGroup: {
              uuid: 'd6eb3b57-8ce3-4d1c-ad6a-4109b1220fc1',
              display: 'Infant details group: 2023-07-24, TBD',
              links: [
                {
                  rel: 'self',
                  uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/obs/d6eb3b57-8ce3-4d1c-ad6a-4109b1220fc1',
                  resourceAlias: 'obs',
                },
              ],
            },
            valueCodedName: null,
            groupMembers: null,
            comment: null,
            location: {
              uuid: '1ce1b7d4-c865-4178-82b0-5932e51503d6',
              display: 'Community Outreach',
              links: [
                {
                  rel: 'self',
                  uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/location/1ce1b7d4-c865-4178-82b0-5932e51503d6',
                  resourceAlias: 'location',
                },
              ],
            },
            order: null,
            encounter: {
              uuid: '623178fe-8f76-4663-a54d-93591248f371',
              display: 'Labour & Delivery 07/24/2023',
              links: [
                {
                  rel: 'self',
                  uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/encounter/623178fe-8f76-4663-a54d-93591248f371',
                  resourceAlias: 'encounter',
                },
              ],
            },
            voided: false,
            value: 'TBD',
            valueModifier: null,
            formFieldPath: 'ohri-forms-infant_name',
            formFieldNamespace: 'ohri-forms',
            status: 'FINAL',
            interpretation: null,
            links: [
              {
                rel: 'self',
                uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/obs/83a325d3-d039-41c2-8c10-b1c37a8350d6',
                resourceAlias: 'obs',
              },
              {
                rel: 'full',
                uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/obs/83a325d3-d039-41c2-8c10-b1c37a8350d6?v=full',
                resourceAlias: 'obs',
              },
            ],
            resourceVersion: '2.1',
          },
        ],
        comment: null,
        location: {
          uuid: '1ce1b7d4-c865-4178-82b0-5932e51503d6',
          display: 'Community Outreach',
          links: [
            {
              rel: 'self',
              uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/location/1ce1b7d4-c865-4178-82b0-5932e51503d6',
              resourceAlias: 'location',
            },
          ],
        },
        order: null,
        encounter: {
          uuid: '623178fe-8f76-4663-a54d-93591248f371',
          display: 'Labour & Delivery 07/24/2023',
          links: [
            {
              rel: 'self',
              uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/encounter/623178fe-8f76-4663-a54d-93591248f371',
              resourceAlias: 'encounter',
            },
          ],
        },
        voided: false,
        value: null,
        valueModifier: null,
        formFieldPath: null,
        formFieldNamespace: null,
        status: 'FINAL',
        interpretation: null,
        links: [
          {
            rel: 'self',
            uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/obs/d6eb3b57-8ce3-4d1c-ad6a-4109b1220fc1',
            resourceAlias: 'obs',
          },
          {
            rel: 'full',
            uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/obs/d6eb3b57-8ce3-4d1c-ad6a-4109b1220fc1?v=full',
            resourceAlias: 'obs',
          },
        ],
        resourceVersion: '2.1',
      },
      {
        uuid: '3983d79b-c566-40a8-bc39-129561f53711',
        display: 'Infant details group:  TDB II, 2023-07-24',
        concept: {
          uuid: '90df094d-a90e-4570-993a-c8f8753117cd',
          display: 'Infant details group',
          links: [
            {
              rel: 'self',
              uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/concept/90df094d-a90e-4570-993a-c8f8753117cd',
              resourceAlias: 'concept',
            },
          ],
        },
        person: {
          uuid: '0c044d55-6bbb-4809-979c-8322d3095765',
          display: '10014EW - smith Kimoti Wills',
          links: [
            {
              rel: 'self',
              uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/patient/0c044d55-6bbb-4809-979c-8322d3095765',
              resourceAlias: 'patient',
            },
          ],
        },
        obsDatetime: '2023-07-24T15:28:07.000+0000',
        accessionNumber: null,
        obsGroup: null,
        valueCodedName: null,
        groupMembers: [
          {
            uuid: '3814e446-3102-4339-89ac-721838cfd52d',
            display: 'Infant Name:  TDB II',
            concept: {
              uuid: '7a23684b-e579-4a9a-b35e-2e3aa0ddcfe0',
              display: 'Infant Name',
              links: [
                {
                  rel: 'self',
                  uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/concept/7a23684b-e579-4a9a-b35e-2e3aa0ddcfe0',
                  resourceAlias: 'concept',
                },
              ],
            },
            person: {
              uuid: '0c044d55-6bbb-4809-979c-8322d3095765',
              display: '10014EW - smith Kimoti Wills',
              links: [
                {
                  rel: 'self',
                  uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/patient/0c044d55-6bbb-4809-979c-8322d3095765',
                  resourceAlias: 'patient',
                },
              ],
            },
            obsDatetime: '2023-07-24T15:28:07.000+0000',
            accessionNumber: null,
            obsGroup: {
              uuid: '3983d79b-c566-40a8-bc39-129561f53711',
              display: 'Infant details group:  TDB II, 2023-07-24',
              links: [
                {
                  rel: 'self',
                  uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/obs/3983d79b-c566-40a8-bc39-129561f53711',
                  resourceAlias: 'obs',
                },
              ],
            },
            valueCodedName: null,
            groupMembers: null,
            comment: null,
            location: {
              uuid: '1ce1b7d4-c865-4178-82b0-5932e51503d6',
              display: 'Community Outreach',
              links: [
                {
                  rel: 'self',
                  uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/location/1ce1b7d4-c865-4178-82b0-5932e51503d6',
                  resourceAlias: 'location',
                },
              ],
            },
            order: null,
            encounter: {
              uuid: '623178fe-8f76-4663-a54d-93591248f371',
              display: 'Labour & Delivery 07/24/2023',
              links: [
                {
                  rel: 'self',
                  uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/encounter/623178fe-8f76-4663-a54d-93591248f371',
                  resourceAlias: 'encounter',
                },
              ],
            },
            voided: false,
            value: ' TDB II',
            valueModifier: null,
            formFieldPath: 'ohri-forms-infant_name_2',
            formFieldNamespace: 'ohri-forms',
            status: 'FINAL',
            interpretation: null,
            links: [
              {
                rel: 'self',
                uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/obs/3814e446-3102-4339-89ac-721838cfd52d',
                resourceAlias: 'obs',
              },
              {
                rel: 'full',
                uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/obs/3814e446-3102-4339-89ac-721838cfd52d?v=full',
                resourceAlias: 'obs',
              },
            ],
            resourceVersion: '2.1',
          },
          {
            uuid: 'badd8f82-5959-4448-9cf8-2923f5bc038d',
            display: 'Date of birth: 2023-07-24',
            concept: {
              uuid: '2d5e4c09-9a4f-4a53-b2db-4490dcbf3b7d',
              display: 'Date of birth',
              links: [
                {
                  rel: 'self',
                  uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/concept/2d5e4c09-9a4f-4a53-b2db-4490dcbf3b7d',
                  resourceAlias: 'concept',
                },
              ],
            },
            person: {
              uuid: '0c044d55-6bbb-4809-979c-8322d3095765',
              display: '10014EW - smith Kimoti Wills',
              links: [
                {
                  rel: 'self',
                  uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/patient/0c044d55-6bbb-4809-979c-8322d3095765',
                  resourceAlias: 'patient',
                },
              ],
            },
            obsDatetime: '2023-07-24T15:28:07.000+0000',
            accessionNumber: null,
            obsGroup: {
              uuid: '3983d79b-c566-40a8-bc39-129561f53711',
              display: 'Infant details group:  TDB II, 2023-07-24',
              links: [
                {
                  rel: 'self',
                  uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/obs/3983d79b-c566-40a8-bc39-129561f53711',
                  resourceAlias: 'obs',
                },
              ],
            },
            valueCodedName: null,
            groupMembers: null,
            comment: null,
            location: {
              uuid: '1ce1b7d4-c865-4178-82b0-5932e51503d6',
              display: 'Community Outreach',
              links: [
                {
                  rel: 'self',
                  uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/location/1ce1b7d4-c865-4178-82b0-5932e51503d6',
                  resourceAlias: 'location',
                },
              ],
            },
            order: null,
            encounter: {
              uuid: '623178fe-8f76-4663-a54d-93591248f371',
              display: 'Labour & Delivery 07/24/2023',
              links: [
                {
                  rel: 'self',
                  uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/encounter/623178fe-8f76-4663-a54d-93591248f371',
                  resourceAlias: 'encounter',
                },
              ],
            },
            voided: false,
            value: '2023-07-24T00:00:00.000+0000',
            valueModifier: null,
            formFieldPath: 'ohri-forms-date_of_birth_2',
            formFieldNamespace: 'ohri-forms',
            status: 'FINAL',
            interpretation: null,
            links: [
              {
                rel: 'self',
                uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/obs/badd8f82-5959-4448-9cf8-2923f5bc038d',
                resourceAlias: 'obs',
              },
              {
                rel: 'full',
                uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/obs/badd8f82-5959-4448-9cf8-2923f5bc038d?v=full',
                resourceAlias: 'obs',
              },
            ],
            resourceVersion: '2.1',
          },
        ],
        comment: null,
        location: {
          uuid: '1ce1b7d4-c865-4178-82b0-5932e51503d6',
          display: 'Community Outreach',
          links: [
            {
              rel: 'self',
              uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/location/1ce1b7d4-c865-4178-82b0-5932e51503d6',
              resourceAlias: 'location',
            },
          ],
        },
        order: null,
        encounter: {
          uuid: '623178fe-8f76-4663-a54d-93591248f371',
          display: 'Labour & Delivery 07/24/2023',
          links: [
            {
              rel: 'self',
              uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/encounter/623178fe-8f76-4663-a54d-93591248f371',
              resourceAlias: 'encounter',
            },
          ],
        },
        voided: false,
        value: null,
        valueModifier: null,
        formFieldPath: null,
        formFieldNamespace: null,
        status: 'FINAL',
        interpretation: null,
        links: [
          {
            rel: 'self',
            uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/obs/3983d79b-c566-40a8-bc39-129561f53711',
            resourceAlias: 'obs',
          },
          {
            rel: 'full',
            uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/obs/3983d79b-c566-40a8-bc39-129561f53711?v=full',
            resourceAlias: 'obs',
          },
        ],
        resourceVersion: '2.1',
      },
      {
        uuid: '9ebaf478-997b-45d7-a597-fdf66602d198',
        display: 'Number of babies: 2',
        concept: {
          uuid: 'c7be5027-536d-4cb6-94fc-93e39fe9c1d5',
          display: 'Number of babies',
          links: [
            {
              rel: 'self',
              uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/concept/c7be5027-536d-4cb6-94fc-93e39fe9c1d7',
              resourceAlias: 'concept',
            },
          ],
        },
        person: {
          uuid: '0c044d55-6bbb-4809-979c-8322d3095765',
          display: '10014EW - smith Kimoti Wills',
          links: [
            {
              rel: 'self',
              uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/patient/0c044d55-6bbb-4809-979c-8322d3095765',
              resourceAlias: 'patient',
            },
          ],
        },
        obsDatetime: '2023-07-24T15:28:07.000+0000',
        accessionNumber: null,
        obsGroup: null,
        valueCodedName: null,
        groupMembers: null,
        comment: null,
        location: {
          uuid: '1ce1b7d4-c865-4178-82b0-5932e51503d6',
          display: 'Community Outreach',
          links: [
            {
              rel: 'self',
              uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/location/1ce1b7d4-c865-4178-82b0-5932e51503d6',
              resourceAlias: 'location',
            },
          ],
        },
        order: null,
        encounter: {
          uuid: '623178fe-8f76-4663-a54d-93591248f371',
          display: 'Labour & Delivery 07/24/2023',
          links: [
            {
              rel: 'self',
              uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/encounter/623178fe-8f76-4663-a54d-93591248f371',
              resourceAlias: 'encounter',
            },
          ],
        },
        voided: false,
        value: 2,
        valueModifier: null,
        formFieldPath: 'ohri-forms-number_of_babies',
        formFieldNamespace: 'ohri-forms',
        status: 'FINAL',
        interpretation: null,
        links: [
          {
            rel: 'self',
            uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/obs/9ebaf478-997b-45d7-a597-fdf66602d198',
            resourceAlias: 'obs',
          },
          {
            rel: 'full',
            uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/obs/9ebaf478-997b-45d7-a597-fdf66602d198?v=full',
            resourceAlias: 'obs',
          },
        ],
        resourceVersion: '2.1',
      },
    ],
    orders: [],
    voided: false,
    auditInfo: {
      creator: {
        uuid: '82f18b44-6814-11e8-923f-e9a88dcb533f',
        display: 'admin',
        links: [
          {
            rel: 'self',
            uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/user/82f18b44-6814-11e8-923f-e9a88dcb533f',
            resourceAlias: 'user',
          },
        ],
      },
      dateCreated: '2023-07-24T15:28:43.000+0000',
      changedBy: null,
      dateChanged: null,
    },
    visit: null,
    encounterProviders: [
      {
        uuid: 'c9d3aa00-5db2-49b2-a990-1be21e167118',
        provider: {
          uuid: '165d2b80-c55e-4146-8a3e-56f27e5d1e4d',
          display: 'admin - Super User',
          links: [
            {
              rel: 'self',
              uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/provider/165d2b80-c55e-4146-8a3e-56f27e5d1e4d',
              resourceAlias: 'provider',
            },
          ],
        },
        encounterRole: {
          uuid: '240b26f9-dd88-4172-823d-4a8bfeb7841f',
          display: 'Clinician',
          links: [
            {
              rel: 'self',
              uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/encounterrole/240b26f9-dd88-4172-823d-4a8bfeb7841f',
              resourceAlias: 'encounterrole',
            },
          ],
        },
        voided: false,
        links: [
          {
            rel: 'full',
            uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/encounter/623178fe-8f76-4663-a54d-93591248f371/encounterprovider/c9d3aa00-5db2-49b2-a990-1be21e167118?v=full',
            resourceAlias: 'encounterprovider',
          },
        ],
        resourceVersion: '1.9',
      },
    ],
    diagnoses: null,
    links: [
      {
        rel: 'self',
        uri: 'http://dev3.openmrs.org/openmrshttp://dev3.openmrs.org/openmrs/ws/rest/v1/encounter/623178fe-8f76-4663-a54d-93591248f371',
        resourceAlias: 'encounter',
      },
    ],
    resourceVersion: '2.2',
  },
];
