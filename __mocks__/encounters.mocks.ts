import { OpenmrsEncounter } from '@openmrs/openmrs-form-engine-lib/src/api/types';
export const mockEncounters: OpenmrsEncounter[] = [
  {
    uuid: '2d8969e4-0b6b-4091-b918-edea29ccbc6c',
    encounterDatetime: '2023-10-24T12:38:00.000+0000',
    encounterType: '',
    location: '',
    patient: '',
    encounterProviders: [
      {
        uuid: '35ebbdfa-0eeb-44b8-8d00-5548ad5f0190',
        provider: {
          uuid: 'e3b1f354-da0e-40e3-b77b-493d8e86db3c',
          name: 'Ff8e2 b400A Fcd3C',
        },
      },
    ],
    obs: [],
    form: {
      uuid: '60252155-f40d-3084-9d8e-5b7c8fafc68a',
      name: 'Labour & Delivery Form',
    },
  },
  {
    uuid: 'e61810e9-cab0-403d-aea0-a08c66d17317',
    encounterDatetime: '2023-09-25T14:00:54.000+0000',
    encounterType: '',
    location: '',
    patient: '',
    encounterProviders: [],
    obs: [],
    form: {
      uuid: '2105c8ae-1935-375c-a7cc-e2ca04c8f6be',
      name: 'Mother - Postnatal Form',
    },
  },
  {
    uuid: '65f7acf8-c610-46d2-a836-142776365cf7',
    encounterDatetime: '2023-09-25T13:58:47.000+0000',
    encounterType: {
      uuid: '2678423c-0523-4d76-b0da-18177b439eed',
      display: 'Labor and Delivery',
      name: 'Labor and Delivery',
      description: 'Labor and delivery visit by a mother',
      retired: false,
      links: [
        {
          rel: 'self',
          uri: 'http://ohri-namibia-dev.globalhealthapp.net/openmrs/ws/rest/v1/encountertype/2678423c-0523-4d76-b0da-18177b439eed',
          resourceAlias: 'encountertype',
        },
        {
          rel: 'full',
          uri: 'http://ohri-namibia-dev.globalhealthapp.net/openmrs/ws/rest/v1/encountertype/2678423c-0523-4d76-b0da-18177b439eed?v=full',
          resourceAlias: 'encountertype',
        },
      ],
      resourceVersion: '1.8',
    },
    location: {
      uuid: 'Sf8ctjA7qjo',
      name: 'Opuwo Clinic',
    },
    patient: {
      uuid: '1ffd8210-0098-4a9a-8706-e87bac8d1b32',
      display: '10350A230066 - Maria Niilenge',
    },
    encounterProviders: [
      {
        uuid: '751cf65d-6238-4f06-8245-c2d6d002d4e0',
        provider: {
          uuid: 'f677d8be-4961-4f37-a361-7f5f8977495d',
          name: 'PTracker_PMTCT PTracker_PMTCT',
        },
      },
    ],
    obs: [],
    form: {
      uuid: '60252155-f40d-3084-9d8e-5b7c8fafc68a',
      name: 'Labour & Delivery Form',
    },
  },
];
