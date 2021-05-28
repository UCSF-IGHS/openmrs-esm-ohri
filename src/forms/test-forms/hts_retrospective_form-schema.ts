import { OHRIFormSchema } from './../types';

const HTSRestroForm: OHRIFormSchema = {
  name: 'POC OHRI HTS Retrospective Form',
  pages: [
    {
      label: 'Screening',
      sections: [
        {
          label: 'Testing history',
          isExpanded: 'true',
          questions: [
            {
              label: 'Ever tested positive for HIV before?',
              type: 'obs',
              questionOptions: {
                rendering: 'radio',
                concept: '1492AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                answers: [
                  {
                    label: 'yes',
                    concept: '18316c68-b5f9-4986-b76d-9975cd0ebe31',
                  },
                  {
                    label: 'no',
                    concept: '0d8a135b-0acf-47f3-a51c-77aefe7787db',
                  },
                ],
              },
              id: 'everTestedPositive',
            },
            {
              label: 'Last HIV test result',
              type: 'obs',
              questionOptions: {
                rendering: 'radio',
                concept: '159427AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                conceptMappings: [
                  {
                    type: 'PIH',
                    value: '2169',
                  },
                  {
                    type: 'SNOMED-MVP',
                    value: '1594271000105002',
                  },
                  {
                    type: 'org.openmrs.module.mdrtb',
                    value: 'RESULT OF HIV TEST',
                  },
                  {
                    type: 'SNOMED-CT',
                    value: '31676001',
                  },
                ],
                answers: [
                  {
                    concept: '664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Negative',
                    conceptMappings: [
                      {
                        type: 'AMPATH',
                        value: '664',
                      },
                      {
                        type: 'SNOMED-CT',
                        value: '260385009',
                      },
                      {
                        type: 'PIH',
                        value: '664',
                      },
                      {
                        type: 'org.openmrs.module.mdrtb',
                        value: 'NEGATIVE',
                      },
                      {
                        type: 'AMPATH',
                        value: '665',
                      },
                    ],
                  },
                  {
                    concept: '1138AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Indeterminate',
                    conceptMappings: [
                      {
                        type: 'AMPATH',
                        value: '1138',
                      },
                      {
                        type: 'SNOMED-CT',
                        value: '82334004',
                      },
                    ],
                  },
                ],
              },
              id: 'lastHIVTestResult',
            },
            {
              label: 'Months since last HIV test',
              type: 'obs',
              questionOptions: {
                rendering: 'number',
                concept: '07a6f86e-388b-416e-b1ed-4b4e543a6406',
                max: '12',
                min: '0',
                showDate: 'false',
              },
              id: 'monthSinceLastHIVTest',
            },
            {
              label: 'Date of last HIV test',
              type: 'obs',
              questionOptions: {
                rendering: 'date',
                concept: '164400AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                weeksList: '',
              },
              id: 'lastHIVTestDate',
            },
          ],
        },
        {
          label: 'Partner information',
          isExpanded: 'true',
          questions: [
            {
              label: 'Partner HIV status as reported',
              type: 'obs',
              questionOptions: {
                rendering: 'radio',
                concept: '1436AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                conceptMappings: [
                  {
                    type: 'SNOMED-MVP',
                    value: '14361000105003',
                  },
                  {
                    type: 'AMPATH',
                    value: '2313',
                  },
                  {
                    type: 'SNOMED-CT',
                    value: '278977008',
                  },
                  {
                    type: 'PIH',
                    value: '3082',
                  },
                ],
                answers: [
                  {
                    concept: '1138AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Indeterminate',
                    conceptMappings: [
                      {
                        type: 'AMPATH',
                        value: '1138',
                      },
                      {
                        type: 'SNOMED-CT',
                        value: '82334004',
                      },
                    ],
                  },
                  {
                    concept: '664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Negative',
                    conceptMappings: [
                      {
                        type: 'AMPATH',
                        value: '664',
                      },
                      {
                        type: 'SNOMED-CT',
                        value: '260385009',
                      },
                      {
                        type: 'PIH',
                        value: '664',
                      },
                      {
                        type: 'org.openmrs.module.mdrtb',
                        value: 'NEGATIVE',
                      },
                      {
                        type: 'AMPATH',
                        value: '665',
                      },
                    ],
                  },
                ],
              },
              id: 'partnerHIVStatus',
            },
            {
              label: 'Partner key population status',
              type: 'obs',
              questionOptions: {
                rendering: 'multicheckbox',
                concept: 'd3d4ae96-8c8a-43db-a9dc-dac951f5dcb3',
                answers: [
                  {
                    concept: '63ea75cb-205f-4e7b-9ede-5f9b8a4dda9f',
                    label: 'Migrant Workers',
                    conceptMappings: [],
                  },
                  {
                    concept: 'b282bb08-62a7-42c2-9bea-8751c267d13e',
                    label: 'Uniformed Forces',
                    conceptMappings: [],
                  },
                  {
                    concept: '22b202fc-67de-4af9-8c88-46e22559d4b2',
                    label: 'Transgender Persons',
                    conceptMappings: [],
                  },
                  {
                    concept: '678f3144-302f-493e-ba22-7ec60a84732a',
                    label: 'Adolescent Girls & Young Women',
                    conceptMappings: [],
                  },
                  {
                    concept: 'def00c73-f6d5-42fb-bcec-0b192b5be22d',
                    label: 'Fisher Folk',
                    conceptMappings: [],
                  },
                  {
                    concept: '8da9bf92-22f6-40be-b468-1ad08de7d457',
                    label: 'Prisoners',
                    conceptMappings: [],
                  },
                  {
                    concept: 'dc1058ea-4edd-4780-aeaa-a474f7f3a437',
                    label: 'Refugees',
                    conceptMappings: [],
                  },
                  {
                    concept: '160578AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Male who has sex with men',
                    conceptMappings: [
                      {
                        type: 'SNOMED-CT',
                        value: '266974005',
                      },
                    ],
                  },
                  {
                    concept: '160579AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Sex worker',
                    conceptMappings: [
                      {
                        type: 'SNOMED-CT',
                        value: '53713009',
                      },
                    ],
                  },
                  {
                    concept: '162198AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Long distance truck driver',
                    conceptMappings: [],
                  },
                ],
              },
              id: 'partnerKeyPopulationStatus',
            },
          ],
        },
      ],
    },
    {
      label: 'Approach',
      sections: [
        {
          label: 'Approach',
          isExpanded: 'true',
          questions: [
            {
              label: 'Where was HIV test conducted?',
              type: 'obs',
              questionOptions: {
                rendering: 'select',
                concept: '159936AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                answers: [
                  {
                    concept: '159938AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Home based HIV testing program',
                    conceptMappings: [
                      {
                        type: 'AMPATH',
                        value: '2049',
                      },
                    ],
                  },
                  {
                    concept: '1459AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Diagnostic testing and counseling for HIV',
                    conceptMappings: [
                      {
                        type: 'AMPATH',
                        value: '2177',
                      },
                    ],
                  },
                  {
                    concept: '159937AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Maternal and child health program',
                    conceptMappings: [
                      {
                        type: 'AMPATH',
                        value: '2050',
                      },
                    ],
                  },
                  {
                    concept: '5485AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Inpatient care or hospitalization',
                    conceptMappings: [
                      {
                        type: 'AMPATH',
                        value: '5485',
                      },
                      {
                        type: 'PIH',
                        value: '1429',
                      },
                      {
                        type: 'SNOMED-CT',
                        value: '394656005',
                      },
                    ],
                  },
                  {
                    concept: '160541AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Tuberculosis treatment program',
                    conceptMappings: [
                      {
                        type: 'SNOMED-CT',
                        value: '401173007',
                      },
                    ],
                  },
                  {
                    concept: '159939AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'mobile voluntary counseling and testing program',
                    conceptMappings: [
                      {
                        type: 'AMPATH',
                        value: '2048',
                      },
                    ],
                  },
                  {
                    concept: '163266AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Current health facility',
                    conceptMappings: [
                      {
                        type: 'SNOMED-CT',
                        value: '257622000',
                      },
                    ],
                  },
                  {
                    concept: '159940AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Voluntary counseling and testing center',
                    conceptMappings: [
                      {
                        type: 'AMPATH',
                        value: '2047',
                      },
                    ],
                  },
                  {
                    concept: '160542AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Outpatient department',
                    conceptMappings: [
                      {
                        type: 'PIH',
                        value: '1651',
                      },
                      {
                        type: 'AMPATH',
                        value: '1965',
                      },
                      {
                        type: 'SNOMED-CT',
                        value: '33022008',
                      },
                    ],
                  },
                  {
                    concept: '5622AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Other',
                    conceptMappings: [
                      {
                        type: 'PIH-Malawi',
                        value: '6408',
                      },
                      {
                        type: 'org.openmrs.module.mdrtb',
                        value: 'OTHER',
                      },
                      {
                        type: 'SNOMED-MVP',
                        value: '56221000105001',
                      },
                      {
                        type: 'PIH',
                        value: '5622',
                      },
                      {
                        type: 'AMPATH',
                        value: '5622',
                      },
                      {
                        type: 'SNOMED-CT',
                        value: '74964007',
                      },
                    ],
                  },
                ],
              },
              id: 'testingLocation',
            },
            {
              label: 'How was the test initiated?',
              type: 'obs',
              questionOptions: {
                rendering: 'radio',
                concept: '9641ead9-8821-4898-b633-a8e96c0933cf',
                answers: [
                  {
                    concept: 'e6924b2c-8f27-44d8-8228-9c5d2e8eae84',
                    label: 'Client or Voluntary-initiated (VCT/CICT)',
                    conceptMappings: [],
                  },
                  {
                    concept: '164163AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Provider-initiated testing and counseling (PITC)',
                    conceptMappings: [
                      {
                        type: 'SNOMED-NP',
                        value: '270430005',
                      },
                    ],
                  },
                ],
              },
              id: 'his-approach',
            },
            {
              label: 'Reason for testing',
              type: 'obs',
              questionOptions: {
                rendering: 'select',
                concept: 'ce3816e7-082d-496b-890b-a2b169922c22',
                answers: [
                  {
                    concept: '7398c91a-8db8-480d-8130-1a92cc208ded',
                    label: 'Inconclusive HIV Result',
                    conceptMappings: [],
                  },
                  {
                    concept: 'a6ad599d-2bc4-47b7-81fe-a38e88867c1d',
                    label: 'Self Initiative',
                    conceptMappings: [],
                  },
                  {
                    concept: '0e65e5fd-a1d8-4730-a991-75a1d703cba6',
                    label: 'HIV Self Test Positive',
                    conceptMappings: [],
                  },
                  {
                    concept: '6e768c50-a239-45ff-9920-2c6a9352320e',
                    label: 'Index Client Testing',
                    conceptMappings: [],
                  },
                  {
                    concept: 'cb099534-b609-4561-9d4c-dd2fc74cedaf',
                    label: 'Assisted Partner Notification (APN)',
                    conceptMappings: [],
                  },
                ],
              },
              id: 'reasonForTesting',
            },
            {
              label: 'Service delivery point',
              type: 'obs',
              questionOptions: {
                rendering: 'select',
                concept: '159936AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                conceptMappings: [
                  {
                    type: 'SNOMED-CT',
                    value: '43741000',
                  },
                  {
                    type: 'AMPATH',
                    value: '2051',
                  },
                ],
                answers: [
                  {
                    concept: '5622AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Other',
                    conceptMappings: [
                      {
                        type: 'PIH-Malawi',
                        value: '6408',
                      },
                      {
                        type: 'org.openmrs.module.mdrtb',
                        value: 'OTHER',
                      },
                      {
                        type: 'SNOMED-MVP',
                        value: '56221000105001',
                      },
                      {
                        type: 'PIH',
                        value: '5622',
                      },
                      {
                        type: 'AMPATH',
                        value: '5622',
                      },
                      {
                        type: 'SNOMED-CT',
                        value: '74964007',
                      },
                    ],
                  },
                  {
                    concept: '160542AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Outpatient department',
                    conceptMappings: [
                      {
                        type: 'PIH',
                        value: '1651',
                      },
                      {
                        type: 'AMPATH',
                        value: '1965',
                      },
                      {
                        type: 'SNOMED-CT',
                        value: '33022008',
                      },
                    ],
                  },
                  {
                    concept: '159940AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Voluntary counseling and testing center',
                    conceptMappings: [
                      {
                        type: 'AMPATH',
                        value: '2047',
                      },
                    ],
                  },
                  {
                    concept: '163266AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Current health facility',
                    conceptMappings: [
                      {
                        type: 'SNOMED-CT',
                        value: '257622000',
                      },
                    ],
                  },
                  {
                    concept: '159939AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'mobile voluntary counseling and testing program',
                    conceptMappings: [
                      {
                        type: 'AMPATH',
                        value: '2048',
                      },
                    ],
                  },
                  {
                    concept: '160541AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Tuberculosis treatment program',
                    conceptMappings: [
                      {
                        type: 'SNOMED-CT',
                        value: '401173007',
                      },
                    ],
                  },
                  {
                    concept: '5485AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Inpatient care or hospitalization',
                    conceptMappings: [
                      {
                        type: 'AMPATH',
                        value: '5485',
                      },
                      {
                        type: 'PIH',
                        value: '1429',
                      },
                      {
                        type: 'SNOMED-CT',
                        value: '394656005',
                      },
                    ],
                  },
                  {
                    concept: '159937AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Maternal and child health program',
                    conceptMappings: [
                      {
                        type: 'AMPATH',
                        value: '2050',
                      },
                    ],
                  },
                  {
                    concept: '1459AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Diagnostic testing and counseling for HIV',
                    conceptMappings: [
                      {
                        type: 'AMPATH',
                        value: '2177',
                      },
                    ],
                  },
                  {
                    concept: '159938AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Home based HIV testing program',
                    conceptMappings: [
                      {
                        type: 'AMPATH',
                        value: '2049',
                      },
                    ],
                  },
                ],
              },
              id: 'serviceDeliveryPoint',
            },
          ],
        },
      ],
    },
    {
      label: 'Pre-test counseling',
      sections: [],
    },
    {
      label: 'TB / STI screening',
      sections: [],
    },
    {
      label: 'HIV testing',
      sections: [],
    },
    {
      label: 'Linkage to care',
      sections: [],
    },
    {
      label: 'Referrals',
      sections: [],
    },
  ],
  processor: 'EncounterFormProcessor',
  uuid: 'xxxx',
  referencedForms: [],
};

export default HTSRestroForm;
