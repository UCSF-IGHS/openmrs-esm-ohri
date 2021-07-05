import { OHRIFormSchema } from './../types';

const HTSRestroForm: OHRIFormSchema = {
  name: 'Add HTS Retrospective Form',
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
                rendering: 'content-switcher',
                concept: '1492AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                answers: [
                  {
                    label: 'Yes',
                    concept: 'cf82933b-3f3f-45e7-a5ab-5d31aaee3da3',
                  },
                  {
                    label: 'No',
                    concept: '488b58ff-64f5-4f8a-8979-fa79940b1594',
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
            {
              label: 'Population type',
              type: 'obs',
              questionOptions: {
                rendering: 'checkbox',
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
              id: 'patientPopulationType',
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
                rendering: 'checkbox',
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
                concept: '13abe5c9-6de2-4970-b348-36d352ee8eeb',
                answers: [
                  {
                    concept: '42dd1e18-00cb-471c-911c-cb254d5b01a5',
                    label: 'Community Level testing',
                    conceptMappings: [],
                  },
                  {
                    concept: '5995ebd5-11ae-47ca-ac12-bcb8c0117aec',
                    label: 'Facility Level Testing',
                    conceptMappings: [],
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
              label: 'Community delivery point',
              type: 'obs',
              questionOptions: {
                rendering: 'select',
                concept: '74a3b695-30f7-403b-8f63-3f766461e104',
                answers: [
                  {
                    concept: 'b12b2d5e-9e9b-4af8-b326-a9de5ea0acfe',
                    label: 'Drop In Centre',
                    conceptMappings: [],
                  },
                  {
                    concept: 'c15aecde-acac-49b6-bffe-cd1bb291c28b',
                    label: 'Workplace',
                    conceptMappings: [],
                  },
                  {
                    concept: '7ac53e4f-c5c4-4bd9-a948-1df1fb73740a',
                    label: 'Hotspot',
                    conceptMappings: [],
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
                  {
                    concept: '160545AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Outreach program',
                    conceptMappings: [],
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
                    concept: '159940AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Voluntary counseling and testing center',
                    conceptMappings: [
                      {
                        type: 'AMPATH',
                        value: '2047',
                      },
                    ],
                  },
                ],
              },
              hide: {
                hideWhenExpression:
                  "isEmpty(testingLocation) || testingLocation == '5995ebd5-11ae-47ca-ac12-bcb8c0117aec'",
              },
              id: 'serviceDeliveryPoint',
            },
            {
              label: 'Facility service delivery point',
              type: 'obs',
              questionOptions: {
                rendering: 'select',
                concept: '80bcc9c1-e328-47e8-affe-6d1bffe4adf1',
                answers: [
                  {
                    concept: '6007b076-9e67-47e5-8e57-ee5d1331fbe0',
                    label: 'Post Natal Program',
                    conceptMappings: [],
                  },
                  {
                    concept: '261855fb-32d6-43c3-b0bf-e8737db154f7',
                    label: 'Family Planning Clinic',
                    conceptMappings: [],
                  },
                  {
                    concept: '162050AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Comprehensive care center',
                    conceptMappings: [],
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
                  {
                    concept: '160546AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Sexually transmitted infection program/clinic',
                    conceptMappings: [],
                  },
                  {
                    concept: '160552AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Nutrition program',
                    conceptMappings: [],
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
                    concept: '165475AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Antenatal program',
                    conceptMappings: [],
                  },
                  {
                    concept: '164835AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Labor and delivery unit',
                    conceptMappings: [],
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
                ],
              },
              hide: {
                hideWhenExpression:
                  "isEmpty(testingLocation) || testingLocation != '5995ebd5-11ae-47ca-ac12-bcb8c0117aec'",
              },
              id: 'facilityServiceDeliveryPoint',
            },
            {
              label: 'Relationship with Index Client',
              type: 'obs',
              questionOptions: {
                rendering: 'select',
                concept: '85d3b4fe-c1a9-4e27-a86b-dcc1e30c8a93',
                answers: [
                  {
                    concept: 'deb58a7d-1c89-4ce4-bfd9-2276d5530089',
                    label: 'Contact With and Suspected Exposure',
                    conceptMappings: [],
                  },
                  {
                    concept: '66916a5c-760f-4c12-ae91-71f83298eb40',
                    label: 'Social Contact',
                    conceptMappings: [],
                  },
                  {
                    concept: '68a39d12-49c1-49aa-bd23-e8d505af8e93',
                    label: 'Drug Injecting Partner',
                    conceptMappings: [],
                  },
                  {
                    concept: '1528AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Child',
                    conceptMappings: [],
                  },
                  {
                    concept: '5617AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Partner or spouse',
                    conceptMappings: [],
                  },
                ],
              },
              id: 'relationshipWithTheClient',
            },
            {
              label: 'Index client ID Number',
              type: 'obs',
              questionOptions: {
                rendering: 'text',
                concept: '7d502927-7f21-4f72-bfc6-dc4d972ab1af',
              },
              id: 'indexClientID',
            },
          ],
        },
      ],
    },
    {
      label: 'Pre-test counseling',
      sections: [
        {
          label: 'Pre-test counseling',
          isExpanded: 'true',
          questions: [
            {
              label: 'Was pre-test counselling conducted?',
              type: 'obs',
              questionOptions: {
                rendering: 'radio',
                concept: 'de32152d-93b0-412a-908a-20af0c46f215',
                answers: [
                  {
                    concept: 'cf82933b-3f3f-45e7-a5ab-5d31aaee3da3',
                    label: 'Yes',
                    conceptMappings: [
                      {
                        type: 'CIEL',
                        value: '1065',
                      },
                      {
                        type: 'AMPATH',
                        value: '1065',
                      },
                      {
                        type: 'PIH',
                        value: '1065',
                      },
                      {
                        type: 'SNOMED CT',
                        value: 'CT: 373066001',
                      },
                    ],
                  },
                  {
                    concept: '488b58ff-64f5-4f8a-8979-fa79940b1594',
                    label: 'No',
                    conceptMappings: [],
                  },
                  {
                    concept: '1067AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Unknown',
                    conceptMappings: [
                      {
                        type: 'CIEL',
                        value: '1067',
                      },
                      {
                        type: 'AMPATH',
                        value: '1067',
                      },
                      {
                        type: 'SNOMED CT',
                        value: 'CT: 261665006',
                      },
                      {
                        type: 'PIH',
                        value: '1067',
                      },
                    ],
                  },
                ],
              },
              id: 'preTestCounsellingConducted',
            },
            {
              label: 'Type of counseling session',
              type: 'obs',
              questionOptions: {
                rendering: 'select',
                concept: '0473ec07-2f34-4447-9c58-e35a1c491b6f',
                answers: [
                  {
                    concept: '02586245-99c3-4d47-ac34-7121156afeab',
                    label: 'Group Counselling',
                    conceptMappings: [],
                  },
                  {
                    concept: '09472f39-6030-4f71-a8f2-30b2fdc734ed',
                    label: 'Couple Counselling',
                    conceptMappings: [],
                  },
                  {
                    concept: '0c78532a-f2e8-4793-874e-90b0c9485cef',
                    label: 'Individual Counselling',
                    conceptMappings: [],
                  },
                ],
              },
              id: 'counselingSessionType',
            },
            {
              label: 'Patient consent',
              type: 'obs',
              questionOptions: {
                rendering: 'toggle',
                concept: '1710AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                toggleOptions: {
                  labelTrue: 'Yes',
                  labelFalse: 'No',
                },
                conceptMappings: [
                  {
                    type: 'SNOMED-CT',
                    value: '182771004',
                  },
                ],
                answers: [
                  {
                    label: 'Yes',
                    concept: 'cf82933b-3f3f-45e7-a5ab-5d31aaee3da3',
                  },
                  {
                    label: 'No',
                    concept: '488b58ff-64f5-4f8a-8979-fa79940b1594',
                  },
                ],
              },
              id: 'preTestCounselingConsent',
            },
          ],
        },
      ],
    },
    {
      label: 'TB / STI screening',
      sections: [
        {
          label: 'TB / STI Screening',
          isExpanded: 'true',
          questions: [
            {
              label: 'Is the client experiencing the following TB symptoms?',
              type: 'obs',
              questionOptions: {
                rendering: 'checkbox',
                concept: '159800AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                conceptMappings: [
                  {
                    type: 'AMPATH',
                    value: '6174',
                  },
                ],
                answers: [
                  {
                    concept: '1494AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Fever lasting more than three weeks',
                    conceptMappings: [
                      {
                        type: 'AMPATH',
                        value: '6173',
                      },
                      {
                        type: 'SNOMED-CT',
                        value: '386661006',
                      },
                      {
                        type: 'ICD-10-WHO',
                        value: 'R50.9',
                      },
                    ],
                  },
                  {
                    concept: '159799AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Cough lasting more than 2 weeks',
                    conceptMappings: [
                      {
                        type: 'PIH',
                        value: '2573',
                      },
                      {
                        type: 'SNOMED-CT',
                        value: '49727002',
                      },
                      {
                        type: 'SNOMED-MVP',
                        value: '1597991000105004',
                      },
                      {
                        type: 'AMPATH',
                        value: '6171',
                      },
                    ],
                  },
                  {
                    concept: '138905AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Hemoptysis',
                    conceptMappings: [
                      {
                        type: '3BT',
                        value: '10040493',
                      },
                      {
                        type: 'ICD-10-WHO',
                        value: 'R04.2',
                      },
                      {
                        type: 'PIH',
                        value: '970',
                      },
                      {
                        type: 'ICPC2',
                        value: 'R24',
                      },
                      {
                        type: 'IMO-ProblemIT',
                        value: '27441',
                      },
                      {
                        type: 'AMPATH',
                        value: '6172',
                      },
                      {
                        type: 'SNOMED-CT',
                        value: '66857006',
                      },
                      {
                        type: 'AMPATH',
                        value: '967',
                      },
                    ],
                  },
                  {
                    concept: '133027AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Night sweats',
                    conceptMappings: [
                      {
                        type: 'ICPC2',
                        value: 'A09',
                      },
                      {
                        type: 'ICD-10-WHO',
                        value: 'R61.1',
                      },
                      {
                        type: 'AMPATH',
                        value: '6029',
                      },
                      {
                        type: 'SNOMED-CT',
                        value: '42984000',
                      },
                      {
                        type: 'PIH',
                        value: '6029',
                      },
                      {
                        type: 'IMO-ProblemIT',
                        value: '50760',
                      },
                      {
                        type: '3BT',
                        value: '10063085',
                      },
                    ],
                  },
                ],
              },
              id: 'tbSymptoms',
            },
            {
              label: 'Is the client experiencing the following STI symptoms?',
              type: 'obs',
              questionOptions: {
                rendering: 'checkbox',
                concept: 'c4f81292-61a3-4561-a4ae-78be7d16d928',
                answers: [
                  {
                    concept: 'd8e46cc0-4d08-45d9-a46d-bd083db63057',
                    label: 'Complaints of scrotal swelling and pain (Male)',
                    conceptMappings: [],
                  },
                  {
                    concept: '60817acb-90f1-4d46-be87-2c47e150770b',
                    label: 'Complaints of urethral discharge or burning when urinating (Male)',
                    conceptMappings: [],
                  },
                  {
                    concept: '06be8996-ef55-438b-bbb9-5bebeb18e779',
                    label: 'Complaints of lower abdominal pains with or without  vaginal discharge (Female)',
                    conceptMappings: [],
                  },
                  {
                    concept: '9a24bedc-d42c-422e-9f5d-371b59af0660',
                    label: 'Complaints of vaginal discharge or burning when urinating (Female)',
                    conceptMappings: [],
                  },
                  {
                    concept: 'faf06026-fce9-4d2c-9ef2-24fb45343804',
                    label: 'Complaints of genital sores or swollen inguinal lymph nodes with or without pains',
                    conceptMappings: [],
                  },
                ],
              },
              id: 'stiSymptoms',
            },
          ],
        },
      ],
    },
    {
      label: 'HIV testing',
      sections: [
        {
          label: 'HIV testing',
          isExpanded: 'true',
          questions: [
            {
              label: 'Was HIV test conducted?',
              type: 'obs',
              questionOptions: {
                rendering: 'radio',
                concept: '164401AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                answers: [
                  {
                    concept: 'cf82933b-3f3f-45e7-a5ab-5d31aaee3da3',
                    label: 'Yes',
                    conceptMappings: [
                      {
                        type: 'CIEL',
                        value: '1065',
                      },
                      {
                        type: 'AMPATH',
                        value: '1065',
                      },
                      {
                        type: 'PIH',
                        value: '1065',
                      },
                      {
                        type: 'SNOMED CT',
                        value: 'CT: 373066001',
                      },
                    ],
                  },
                  {
                    concept: '488b58ff-64f5-4f8a-8979-fa79940b1594',
                    label: 'No',
                    conceptMappings: [],
                  },
                  {
                    concept: '1067AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Unknown',
                    conceptMappings: [
                      {
                        type: 'CIEL',
                        value: '1067',
                      },
                      {
                        type: 'AMPATH',
                        value: '1067',
                      },
                      {
                        type: 'SNOMED CT',
                        value: 'CT: 261665006',
                      },
                      {
                        type: 'PIH',
                        value: '1067',
                      },
                    ],
                  },
                ],
              },
              id: 'hivTestConducted',
            },
            {
              label: 'Date test was performed',
              type: 'obs',
              questionOptions: {
                rendering: 'date',
                concept: '164400AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                weeksList: '',
              },
              id: 'dateTestPerformed',
            },
            {
              label: 'Initial HIV test kit name',
              type: 'obs',
              questionOptions: {
                rendering: 'radio',
                concept: 'afa64df8-50af-4bc3-8135-6e6603f62068',
                answers: [
                  {
                    concept: '5e318e60-3108-4468-90cd-7f2dc1c596a6',
                    label: 'HIV Determine Kit',
                    conceptMappings: [],
                  },
                  {
                    concept: '59ec348a-14a8-4e88-9b9e-72fa24b949fa',
                    label: 'HIV-Syphilis Duo Kit',
                    conceptMappings: [],
                  },
                ],
              },
              id: 'inititalHIVTestKitName',
            },
            {
              label: 'Initial HIV test result',
              type: 'obs',
              questionOptions: {
                rendering: 'radio',
                concept: 'e767ba5d-7560-43ba-a746-2b0ff0a2a513',
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
                  {
                    concept: '6378487b-584d-4422-a6a6-56c8830873ff',
                    label: 'Positive',
                    conceptMappings: [],
                  },
                ],
              },
              id: 'initialHIVTestResult',
            },
            {
              label: 'Confirmatory HIV Test Kit Name',
              type: 'obs',
              questionOptions: {
                rendering: 'radio',
                concept: 'b78d89e7-08aa-484f-befb-1e3e70cd6985',
                answers: [
                  {
                    concept: 'a099ce71-d75e-433d-a782-0b9ad4f4f655',
                    label: 'HIV First Response Kit',
                    conceptMappings: [],
                  },
                  {
                    concept: '0d64d0d0-8dcb-4a56-819c-999d52f04db8',
                    label: 'HIV Stat Pack Kit',
                    conceptMappings: [],
                  },
                ],
              },
              id: 'confirmatoryHIVTestKitName',
            },
            {
              label: 'Confirmatory HIV test result',
              type: 'obs',
              questionOptions: {
                rendering: 'radio',
                concept: 'dbc4f8e9-7098-4585-9509-e2f84a4d8c6e',
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
                  {
                    concept: '6378487b-584d-4422-a6a6-56c8830873ff',
                    label: 'Positive',
                    conceptMappings: [],
                  },
                ],
              },
              id: 'confirmatoryHIVTestResult',
            },
            {
              label: 'Tie Breaker HIV test kit name',
              type: 'obs',
              questionOptions: {
                rendering: 'radio',
                concept: '73434a78-e4fc-42f7-a812-f30f3b3cabe3',
                answers: [
                  {
                    concept: '780c8ff2-5e11-48f8-ad3d-efa36a0413f6',
                    label: 'HIV SD Bioline Kit',
                    conceptMappings: [],
                  },
                  {
                    concept: '780c8ff2-5e11-48f8-ad3d-efa36a0413f6',
                    label: 'HIV SD Bioline Kit',
                    conceptMappings: [],
                  },
                ],
              },
              id: 'tieBreakerHIVTestKitName',
            },
            {
              label: 'Tie Breaker HIV test kit result',
              type: 'obs',
              questionOptions: {
                rendering: 'radio',
                concept: 'bfc5fbb9-2b23-422e-a741-329bb2597032',
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
                  {
                    concept: '6378487b-584d-4422-a6a6-56c8830873ff',
                    label: 'Positive',
                    conceptMappings: [],
                  },
                ],
              },
              id: 'tieBreakerHIVTestKitResult',
            },
            {
              label: 'Final HIV test result',
              type: 'obs',
              questionOptions: {
                rendering: 'radio',
                concept: 'e16b0068-b6a2-46b7-aba9-e3be00a7b4ab',
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
                  {
                    concept: '6378487b-584d-4422-a6a6-56c8830873ff',
                    label: 'Positive',
                    conceptMappings: [],
                  },
                ],
              },
              id: 'finalHIVTestResult',
            },
          ],
        },
      ],
    },
    {
      label: 'Recency testing',
      sections: [
        {
          label: 'Recency testing',
          isExpanded: 'true',
          questions: [
            {
              label: 'Patient consent',
              type: 'obs',
              questionOptions: {
                rendering: 'radio',
                concept: '1710AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                conceptMappings: [
                  {
                    type: 'SNOMED-CT',
                    value: '182771004',
                  },
                ],
                answers: [
                  {
                    label: 'Yes',
                    concept: 'cf82933b-3f3f-45e7-a5ab-5d31aaee3da3',
                  },
                  {
                    label: 'No',
                    concept: '488b58ff-64f5-4f8a-8979-fa79940b1594',
                  },
                ],
              },
              id: 'recencyTestingConsent',
            },
            {
              label: 'Was recency test conducted?',
              type: 'obs',
              questionOptions: {
                rendering: 'radio',
                concept: '65e18678-18db-4801-9625-50d3302c780c',
                answers: [
                  {
                    concept: 'cf82933b-3f3f-45e7-a5ab-5d31aaee3da3',
                    label: 'Yes',
                    conceptMappings: [
                      {
                        type: 'CIEL',
                        value: '1065',
                      },
                      {
                        type: 'AMPATH',
                        value: '1065',
                      },
                      {
                        type: 'PIH',
                        value: '1065',
                      },
                      {
                        type: 'SNOMED CT',
                        value: 'CT: 373066001',
                      },
                    ],
                  },
                  {
                    concept: '488b58ff-64f5-4f8a-8979-fa79940b1594',
                    label: 'No',
                    conceptMappings: [],
                  },
                  {
                    concept: '1067AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Unknown',
                    conceptMappings: [
                      {
                        type: 'CIEL',
                        value: '1067',
                      },
                      {
                        type: 'AMPATH',
                        value: '1067',
                      },
                      {
                        type: 'SNOMED CT',
                        value: 'CT: 261665006',
                      },
                      {
                        type: 'PIH',
                        value: '1067',
                      },
                    ],
                  },
                ],
              },
              id: 'recencyTestConducted',
            },
            {
              label: 'Recency test result',
              type: 'obs',
              questionOptions: {
                rendering: 'radio',
                concept: '165092AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                conceptMappings: [
                  {
                    type: 'SNOMED-CT',
                    value: '271918004',
                  },
                ],
                answers: [
                  {
                    concept: '165090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Recent',
                    conceptMappings: [
                      {
                        type: 'SNOMED-CT',
                        value: '6493001',
                      },
                    ],
                  },
                  {
                    concept: '165091AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Long duration',
                    conceptMappings: [
                      {
                        type: 'SNOMED-CT',
                        value: '260384008',
                      },
                    ],
                  },
                ],
              },
              id: 'recencyTestResult',
            },
            {
              label: 'Was the client given the result',
              type: 'obs',
              questionOptions: {
                rendering: 'radio',
                concept: '164848AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                answers: [
                  {
                    concept: 'cf82933b-3f3f-45e7-a5ab-5d31aaee3da3',
                    label: 'Yes',
                    conceptMappings: [
                      {
                        type: 'CIEL',
                        value: '1065',
                      },
                      {
                        type: 'AMPATH',
                        value: '1065',
                      },
                      {
                        type: 'PIH',
                        value: '1065',
                      },
                      {
                        type: 'SNOMED CT',
                        value: 'CT: 373066001',
                      },
                    ],
                  },
                  {
                    concept: '488b58ff-64f5-4f8a-8979-fa79940b1594',
                    label: 'No',
                    conceptMappings: [],
                  },
                  {
                    concept: '1067AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Unknown',
                    conceptMappings: [
                      {
                        type: 'CIEL',
                        value: '1067',
                      },
                      {
                        type: 'AMPATH',
                        value: '1067',
                      },
                      {
                        type: 'SNOMED CT',
                        value: 'CT: 261665006',
                      },
                      {
                        type: 'PIH',
                        value: '1067',
                      },
                    ],
                  },
                ],
              },
              id: 'clientReceivedResults',
            },
            {
              label: 'When the client received the HIV test result?',
              type: 'obs',
              questionOptions: {
                rendering: 'date',
                concept: '160082AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              },
              id: 'recencyTestDate',
            },
            {
              label: 'Were results received as a couple?',
              type: 'obs',
              questionOptions: {
                rendering: 'radio',
                concept: '445846e9-b929-4519-bc83-d51c051918f5',
                answers: [
                  {
                    concept: 'cf82933b-3f3f-45e7-a5ab-5d31aaee3da3',
                    label: 'Yes',
                    conceptMappings: [
                      {
                        type: 'CIEL',
                        value: '1065',
                      },
                      {
                        type: 'AMPATH',
                        value: '1065',
                      },
                      {
                        type: 'PIH',
                        value: '1065',
                      },
                      {
                        type: 'SNOMED CT',
                        value: 'CT: 373066001',
                      },
                    ],
                  },
                  {
                    concept: '488b58ff-64f5-4f8a-8979-fa79940b1594',
                    label: 'No',
                    conceptMappings: [],
                  },
                  {
                    concept: '1067AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Unknown',
                    conceptMappings: [
                      {
                        type: 'CIEL',
                        value: '1067',
                      },
                      {
                        type: 'AMPATH',
                        value: '1067',
                      },
                      {
                        type: 'SNOMED CT',
                        value: 'CT: 261665006',
                      },
                      {
                        type: 'PIH',
                        value: '1067',
                      },
                    ],
                  },
                ],
              },
              id: 'resultsReceivedAsCouple',
            },
            {
              label: 'Couple results',
              type: 'obs',
              questionOptions: {
                rendering: 'radio',
                concept: '5f38bc97-d6ca-43f8-a019-b9a9647d0c6a',
                answers: [
                  {
                    concept: '3a27187f-da7a-4f6b-986d-6521f343326d',
                    label: 'Concordant Positive',
                    conceptMappings: [],
                  },
                  {
                    concept: 'c1504c2b-a8bf-44bf-ab1e-1d342ba051ae',
                    label: 'Concordant Negative',
                    conceptMappings: [],
                  },
                  {
                    concept: 'c2d2bea8-2db5-4730-86b1-592c9408f567',
                    label: 'Discordant',
                    conceptMappings: [],
                  },
                ],
              },
              id: 'coupleResults',
            },
          ],
        },
      ],
    },
    {
      label: 'Post-test counselling',
      sections: [
        {
          label: 'Post-test counselling',
          isExpanded: 'true',
          questions: [
            {
              label: 'Was post-test counselling conducted?',
              type: 'obs',
              questionOptions: {
                rendering: 'radio',
                concept: '159382AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                conceptMappings: [
                  {
                    type: 'PIH',
                    value: '969',
                  },
                  {
                    type: 'SNOMED-CT',
                    value: '313077009',
                  },
                ],
                answers: [
                  {
                    concept: '1067AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Unknown',
                    conceptMappings: [
                      {
                        type: 'CIEL',
                        value: '1067',
                      },
                      {
                        type: 'AMPATH',
                        value: '1067',
                      },
                      {
                        type: 'SNOMED CT',
                        value: 'CT: 261665006',
                      },
                      {
                        type: 'PIH',
                        value: '1067',
                      },
                    ],
                  },
                  {
                    concept: 'cf82933b-3f3f-45e7-a5ab-5d31aaee3da3',
                    label: 'Yes',
                    conceptMappings: [
                      {
                        type: 'CIEL',
                        value: '1065',
                      },
                      {
                        type: 'AMPATH',
                        value: '1065',
                      },
                      {
                        type: 'PIH',
                        value: '1065',
                      },
                      {
                        type: 'SNOMED CT',
                        value: 'CT: 373066001',
                      },
                    ],
                  },
                  {
                    concept: '488b58ff-64f5-4f8a-8979-fa79940b1594',
                    label: 'No',
                    conceptMappings: [],
                  },
                ],
              },
              id: 'postTestCounsellingDone',
            },
          ],
        },
      ],
    },
    {
      label: 'Referrals',
      sections: [
        {
          label: 'Referrals',
          isExpanded: 'true',
          questions: [
            {
              label: 'Was the client referred to prevention services?',
              type: 'obs',
              questionOptions: {
                rendering: 'checkbox',
                concept: '5f394708-ca7d-4558-8d23-a73de181b02d',
                answers: [
                  {
                    concept: '88cdde2b-753b-48ac-a51a-ae5e1ab24846',
                    label: 'Pre Exposure Prophylaxis (PEP)',
                    conceptMappings: [],
                  },
                  {
                    concept: '46da10c7-49e3-45e5-8e82-7c529d52a1a8',
                    label: 'STI Testing and Treatment',
                    conceptMappings: [],
                  },
                  {
                    concept: '1691AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Post-exposure prophylaxis',
                    conceptMappings: [],
                  },
                  {
                    concept: '162223AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Voluntary male circumcision clinic',
                    conceptMappings: [],
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
                  {
                    concept: 'da0238c1-0ddd-49cc-b10d-c552391b6332',
                    label: 'Harm Reduction for People Who Inject Drugs',
                    conceptMappings: [],
                  },
                  {
                    concept: 'ac2e75dc-fceb-4591-9ffb-3f852c0750d9',
                    label: 'Behavioural Interventions to Support Risk Reduction - for KP',
                    conceptMappings: [],
                  },
                  {
                    concept: '0be6a668-b4ff-4fc5-bbae-0e2a86af1bd1',
                    label: 'Post-GBV Care',
                    conceptMappings: [],
                  },
                  {
                    concept: 'e7ee9ec2-3cc7-4e59-8172-9fd08911e8c5',
                    label: 'Prevention Information',
                    conceptMappings: [],
                  },
                ],
              },
              id: 'referredToPreventionServices',
            },
            {
              label: 'Was the client referred to Sexual and Reproductive Health services?',
              type: 'obs',
              questionOptions: {
                rendering: 'checkbox',
                concept: 'bf634be9-197a-433b-8e4e-7a04242a4e1d',
                answers: [
                  {
                    concept: 'a56cdd43-f2eb-49d6-88fd-113aaea2e85f',
                    label: 'HIV Testing for Partners and Social Contacts of People from KP',
                    conceptMappings: [],
                  },
                  {
                    concept: 'f0589be1-d457-4138-b244-bfb115cdea21',
                    label: 'HIV Testing for Partners and Biological Children',
                    conceptMappings: [],
                  },
                  {
                    concept: '46da10c7-49e3-45e5-8e82-7c529d52a1a8',
                    label: 'STI Testing and Treatment',
                    conceptMappings: [],
                  },
                  {
                    concept: '9d4c029a-2ac3-44c3-9a20-fb32c81a9ba2',
                    label: 'Anal Cancer Screening',
                    conceptMappings: [],
                  },
                  {
                    concept: '060dd5b2-2d65-4db5-85f0-cd1ba809350f',
                    label: 'Cervical Cancer Screening and Treatment',
                    conceptMappings: [],
                  },
                  {
                    concept: '0097d9b1-6758-4754-8713-91638efe12ea',
                    label: 'Check Pregnancy Status',
                    conceptMappings: [],
                  },
                  {
                    concept: '6488e62a-314b-49da-b8d4-ca9c7a6941fc',
                    label: 'Contraception and FP',
                    conceptMappings: [],
                  },
                ],
              },
              id: 'referredToSRHServices',
            },
            {
              label: 'Was the client referred to Clinical Services?',
              type: 'obs',
              questionOptions: {
                rendering: 'checkbox',
                concept: '960f2980-35e2-4677-88ed-79424fe0fc91',
                answers: [
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
                    concept: '164128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Isoniazid Preventive Treatment Program',
                    conceptMappings: [],
                  },
                  {
                    concept: '858f0f06-bc62-4b04-b864-cef98a2f3845',
                    label: 'Cotrimoxazole Chemoprophylaxis to Prevent Pneumocystis Carinii Pneumonia',
                    conceptMappings: [],
                  },
                  {
                    concept: '0cf2ce2c-cd3f-478b-89b7-542018674dba',
                    label: 'Assessment and Provision of Vaccinations',
                    conceptMappings: [],
                  },
                ],
              },
              id: 'referredToClinicalServices',
            },
            {
              label: 'Was the client referred for other services?',
              type: 'obs',
              questionOptions: {
                rendering: 'checkbox',
                concept: 'b5afd495-00fc-4d94-9e26-8f6c8cc8caa0',
                answers: [
                  {
                    concept: '5490AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Psychosocial counseling',
                    conceptMappings: [],
                  },
                  {
                    concept: '5489AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Mental health services',
                    conceptMappings: [
                      {
                        type: 'SNOMED-CT',
                        value: '390808007',
                      },
                      {
                        type: 'AMPATH',
                        value: '5489',
                      },
                    ],
                  },
                  {
                    concept: 'ea08440d-41d4-4795-bb4d-4639cf32645c',
                    label: 'Services for Responding to Violence Against Women',
                    conceptMappings: [],
                  },
                  {
                    concept: 'a046ce31-e0d9-4044-a384-ecc429dc4035',
                    label: 'Legal and Social Services',
                    conceptMappings: [],
                  },
                  {
                    concept: '846a63c0-4530-4008-b6a1-12201b9e0b88',
                    label: 'Support for Disclosure and Partner Services',
                    conceptMappings: [],
                  },
                ],
              },
              id: 'referredToOtherServices',
            },
          ],
        },
      ],
    },
    {
      label: 'Linkage to care',
      sections: [
        {
          label: 'Linkage to care',
          isExpanded: 'true',
          questions: [
            {
              label: 'HTS Provider name',
              type: 'obs',
              questionOptions: {
                rendering: 'text',
                concept: '1473AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                conceptMappings: [
                  {
                    type: 'PIH',
                    value: '1392',
                  },
                ],
              },
              id: 'htsProviderName',
            },
            {
              label: 'HTS provider remarks',
              type: 'obs',
              questionOptions: {
                rendering: 'textarea',
                concept: '437d1e25-e7ab-481c-aabc-01f21c6cdef1',
                rows: 5,
              },
              id: 'htsProviderRemarks',
            },
            {
              label: 'Was client linked to care?',
              type: 'obs',
              questionOptions: {
                rendering: 'radio',
                concept: 'e8e8fe71-adbb-48e7-b531-589985094d30',
                answers: [
                  {
                    concept: 'cf82933b-3f3f-45e7-a5ab-5d31aaee3da3',
                    label: 'Yes',
                    conceptMappings: [
                      {
                        type: 'CIEL',
                        value: '1065',
                      },
                      {
                        type: 'AMPATH',
                        value: '1065',
                      },
                      {
                        type: 'PIH',
                        value: '1065',
                      },
                      {
                        type: 'SNOMED CT',
                        value: 'CT: 373066001',
                      },
                    ],
                  },
                  {
                    concept: '488b58ff-64f5-4f8a-8979-fa79940b1594',
                    label: 'No',
                    conceptMappings: [],
                  },
                  {
                    concept: '1067AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Unknown',
                    conceptMappings: [
                      {
                        type: 'CIEL',
                        value: '1067',
                      },
                      {
                        type: 'AMPATH',
                        value: '1067',
                      },
                      {
                        type: 'SNOMED CT',
                        value: 'CT: 261665006',
                      },
                      {
                        type: 'PIH',
                        value: '1067',
                      },
                    ],
                  },
                ],
              },
              id: 'linkedToCare',
            },
            {
              label: 'Patient Identification Number',
              type: 'obs',
              questionOptions: {
                rendering: 'text',
                concept: 'd3205b6a-7192-461f-9ea8-a1ac8af38964',
              },
              id: 'patientClinicIdentificationNumber',
            },
          ],
        },
      ],
    },
  ],
  processor: 'EncounterFormProcessor',
  uuid: 'xxxx',
  referencedForms: [],
  encounterType: '79c1f50f-f77d-42e2-ad2a-d29304dde2fe',
};
export default HTSRestroForm;
