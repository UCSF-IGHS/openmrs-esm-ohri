export const mockEncounter = {
  uuid: '2a5c2ff3-8936-46d6-997f-083fc3ee8eda',
  display: 'HTS Testing 28/05/2021',
  encounterDatetime: '2021-05-28T06:18:01.000+0000',
  patient: {
    uuid: '38bb7b41-32dc-4860-bec5-cd79ee7002eb',
    display: '101AEM - John Smith',
    links: [
      { rel: 'self', uri: 'https://openmrs-spa.org/openmrs/ws/rest/v1/patient/38bb7b41-32dc-4860-bec5-cd79ee7002eb' },
    ],
  },
  location: {
    uuid: 'a953502d-7269-4eb1-a500-961695d61b84',
    display: 'MCH Clinic',
    links: [
      { rel: 'self', uri: 'https://openmrs-spa.org/openmrs/ws/rest/v1/location/a953502d-7269-4eb1-a500-961695d61b84' },
    ],
  },
  form: null,
  encounterType: {
    uuid: '30b849bd-c4f4-4254-a033-fe9cf01001d8',
    display: 'HTS Testing',
    links: [
      {
        rel: 'self',
        uri: 'https://openmrs-spa.org/openmrs/ws/rest/v1/encountertype/30b849bd-c4f4-4254-a033-fe9cf01001d8',
      },
    ],
  },
  obs: [
    {
      uuid: 'a08e1f86-f7b1-4f7e-bafd-221af1c4fe06',
      display: 'HIV test date: 2023-04-04',
      links: [
        {
          rel: 'self',
          uri: 'https://openmrs-spa.org/openmrs/ws/rest/v1/latestobs/a08e1f86-f7b1-4f7e-bafd-221af1c4fe06',
        },
      ],
    },
    {
      uuid: 'e97b8e71-60a4-49c9-bf0a-671008ef6cc2',
      display: 'Diastolic: 19',
      links: [
        {
          rel: 'self',
          uri: 'https://openmrs-spa.org/openmrs/ws/rest/v1/latestobs/e97b8e71-60a4-49c9-bf0a-671008ef6cc2',
        },
      ],
    },
    {
      uuid: 'aef5d992-6f34-4c00-bb2f-92de3317253f',
      display: 'Test 1: Positive',
      links: [
        {
          rel: 'self',
          uri: 'https://openmrs-spa.org/openmrs/ws/rest/v1/latestobs/aef5d992-6f34-4c00-bb2f-92de3317253f',
        },
      ],
    },
    {
      uuid: 'de200bfd-f1ca-4d07-acd9-9cfecb3930e5',
      display: 'Temperature (C): 36.0',
      links: [
        {
          rel: 'self',
          uri: 'https://openmrs-spa.org/openmrs/ws/rest/v1/latestobs/de200bfd-f1ca-4d07-acd9-9cfecb3930e5',
        },
      ],
    },
    {
      uuid: '3e15c2ff-042d-401a-8f52-a4bd4fdf431e',
      display: 'Population Type: General Population',
      links: [
        {
          rel: 'self',
          uri: 'https://openmrs-spa.org/openmrs/ws/rest/v1/latestobs/3e15c2ff-042d-401a-8f52-a4bd4fdf431e',
        },
      ],
    },
    {
      uuid: '4a1b26c8-4abe-47e5-9cf9-f073abca6cbe',
      display: 'Informed consent: false',
      links: [
        {
          rel: 'self',
          uri: 'https://openmrs-spa.org/openmrs/ws/rest/v1/latestobs/4a1b26c8-4abe-47e5-9cf9-f073abca6cbe',
        },
      ],
    },
  ],
  orders: [],
  voided: false,
  visit: null,
  encounterProviders: [
    {
      uuid: '89e14c99-4ca2-4c1a-8de9-3fd7392c3d65',
      display: 'Super User: Clinician',
      links: [
        {
          rel: 'self',
          uri:
            'https://openmrs-spa.org/openmrs/ws/rest/v1/encounter/2a5c2ff3-8936-46d6-997f-083fc3ee8eda/encounterprovider/89e14c99-4ca2-4c1a-8de9-3fd7392c3d65',
        },
      ],
    },
  ],
  links: [
    { rel: 'self', uri: 'https://openmrs-spa.org/openmrs/ws/rest/v1/encounter/2a5c2ff3-8936-46d6-997f-083fc3ee8eda' },
    {
      rel: 'full',
      uri: 'https://openmrs-spa.org/openmrs/ws/rest/v1/encounter/2a5c2ff3-8936-46d6-997f-083fc3ee8eda?v=full',
    },
  ],
  resourceVersion: '1.9',
};
