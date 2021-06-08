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
                rendering: 'select',
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
                    label: 'cough lasting more than 2 weeks',
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
              label: 'Date test was performed',
              type: 'obs',
              questionOptions: {
                rendering: 'date',
                concept: '164400AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                weeksList: '',
              },
              id: 'dateTestPerformed',
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
              label: 'Date test was performed',
              type: 'obs',
              questionOptions: {
                rendering: 'date',
                concept: '160082AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                conceptMappings: [
                  {
                    type: 'SNOMED-CT',
                    value: '439771001',
                  },
                ],
                weeksList: '',
              },
              id: 'recencyTestDate',
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
                rendering: 'select',
                concept: '1272AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                conceptMappings: [
                  {
                    type: 'SNOMED-CT',
                    value: '439980006',
                  },
                  {
                    type: 'AMPATH',
                    value: '1272',
                  },
                  {
                    type: 'AMPATH',
                    value: '1932',
                  },
                ],
                answers: [
                  {
                    concept: '1374AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Dental care referral',
                    conceptMappings: [
                      {
                        type: 'SNOMED-CT',
                        value: '103697008',
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
                    concept: '1371AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Prenatal care referral',
                    conceptMappings: [
                      {
                        type: 'SNOMED-CT',
                        value: '183548008',
                      },
                    ],
                  },
                  {
                    concept: '1372AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Postnatal care referral',
                    conceptMappings: [
                      {
                        type: 'SNOMED-CT',
                        value: '183861004',
                      },
                    ],
                  },
                  {
                    concept: '1455AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Tobacco use counseling',
                    conceptMappings: [
                      {
                        type: 'SNOMED-CT',
                        value: '408939007',
                      },
                    ],
                  },
                  {
                    concept: '5483AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Family planning services',
                    conceptMappings: [
                      {
                        type: 'AMPATH',
                        value: '5483',
                      },
                      {
                        type: 'SNOMED-CT',
                        value: '310031001',
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
                    concept: '1288AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Alcohol counseling',
                    conceptMappings: [
                      {
                        type: 'AMPATH',
                        value: '1288',
                      },
                      {
                        type: 'SNOMED-CT',
                        value: '413473000',
                      },
                    ],
                  },
                  {
                    concept: '164164AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Surgical Outpatient Department',
                    conceptMappings: [
                      {
                        type: 'SNOMED-CT',
                        value: '405607001',
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
                    concept: '1167AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Disclosure counseling',
                    conceptMappings: [
                      {
                        type: 'AMPATH',
                        value: '1167',
                      },
                      {
                        type: 'SNOMED-MVP',
                        value: '11671000105001',
                      },
                      {
                        type: 'SNOMED-CT',
                        value: '409063005',
                      },
                    ],
                  },
                  {
                    concept: '1370AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Voluntary counseling and testing for HIV',
                    conceptMappings: [],
                  },
                  {
                    concept: '160479AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Private health care clinic/facility',
                    conceptMappings: [
                      {
                        type: 'SNOMED-CT',
                        value: '394794000',
                      },
                    ],
                  },
                  {
                    concept: '5484AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Nutritional support',
                    conceptMappings: [
                      {
                        type: 'PIH',
                        value: '1400',
                      },
                      {
                        type: 'AMPATH',
                        value: '5484',
                      },
                      {
                        type: 'SNOMED-CT',
                        value: '278906000',
                      },
                    ],
                  },
                  {
                    concept: '1275AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Health center hospital',
                    conceptMappings: [
                      {
                        type: 'SNOMED-MVP',
                        value: '12751000105006',
                      },
                      {
                        type: 'SNOMED-CT',
                        value: '22232009',
                      },
                      {
                        type: 'AMPATH',
                        value: '1275',
                      },
                    ],
                  },
                  {
                    concept: '5486AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Social support services',
                    conceptMappings: [
                      {
                        type: 'SNOMED-MVP',
                        value: '54861000105000',
                      },
                      {
                        type: 'AMPATH',
                        value: '5486',
                      },
                      {
                        type: 'SNOMED-CT',
                        value: '315042007',
                      },
                    ],
                  },
                  {
                    concept: '161359AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Private home-based care',
                    conceptMappings: [
                      {
                        type: 'SNOMED-CT',
                        value: '66280005',
                      },
                    ],
                  },
                  {
                    concept: '1611AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Referral for opportunistic infection treatment',
                    conceptMappings: [
                      {
                        type: 'SNOMED-MVP',
                        value: '16111000105007',
                      },
                      {
                        type: 'SNOMED-CT',
                        value: '3457005',
                      },
                    ],
                  },
                  {
                    concept: '5576AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'ARV for mother',
                    conceptMappings: [
                      {
                        type: 'SNOMED-MVP',
                        value: '55761000105009',
                      },
                      {
                        type: 'PIH',
                        value: '1446',
                      },
                      {
                        type: 'SNOMED-CT',
                        value: '416608005',
                      },
                      {
                        type: 'AMPATH',
                        value: '5576',
                      },
                      {
                        type: 'AMPATH',
                        value: '2198',
                      },
                    ],
                  },
                  {
                    concept: '1373AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Ophthalmology referral',
                    conceptMappings: [
                      {
                        type: 'SNOMED-CT',
                        value: '183543004',
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
                ],
              },
              id: 'referredToPreventionServices',
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
