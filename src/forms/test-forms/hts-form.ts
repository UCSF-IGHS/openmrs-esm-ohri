import { OHRIFormSchema } from './../types';

const HTSForm: OHRIFormSchema = {
  name: 'HTS Form v1.0',
  pages: [
    {
      label: 'Vitals',
      sections: [
        {
          label: 'Vitals',
          isExpanded: 'true',
          questions: [
            {
              label: 'Just checking',
              type: 'obs',
              questionOptions: {
                rendering: 'number',
                concept: '5085AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                max: '300',
                min: '0',
                showDate: '',
                conceptMappings: [
                  {
                    type: 'LOINC',
                    value: '8480-6',
                  },
                  {
                    type: 'AMPATH',
                    value: '5085',
                  },
                  {
                    type: 'CIEL',
                    value: '5085',
                  },
                  {
                    type: 'PIH',
                    value: '5085',
                  },
                  {
                    type: 'SNOMED CT',
                    value: 'CT: 271649006',
                  },
                  {
                    type: 'PIH Malawi',
                    value: 'Malawi: 5085',
                  },
                  {
                    type: 'org.openmrs.module.mdrtb',
                    value: 'SYSTOLIC BLOOD PRESSURE',
                  },
                ],
              },
              id: 'sbp',
              hide: '',
            },
            {
              label: 'HTS Location',
              type: 'encounterLocation',
              questionOptions: {
                rendering: 'encounter-location',
                locationTag: 'HTS Test Location',
              },
              id: 'htsLocation',
            },
            {
              label: 'Patient Consent',
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
                    label: 'yes',
                    concept: '18316c68-b5f9-4986-b76d-9975cd0ebe31',
                  },
                  {
                    label: 'no',
                    concept: '0d8a135b-0acf-47f3-a51c-77aefe7787db',
                  },
                ],
              },
              id: 'informed-consent',
              hide: '',
            },
            {
              label: 'Date of HIV Test',
              type: 'obs',
              questionOptions: {
                rendering: 'date',
                concept: '164400AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                weeksList: '',
              },
              id: 'hivtestdate',
              hide: '',
            },
            {
              label: 'Diastolic Blood Pressure',
              type: 'obs',
              questionOptions: {
                rendering: 'number',
                concept: '5086AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                max: '',
                min: '',
                showDate: '',
                conceptMappings: [
                  {
                    type: 'PIH',
                    value: '5086',
                  },
                  {
                    type: 'LOINC',
                    value: '35094-2',
                  },
                  {
                    type: 'LOINC',
                    value: '8462-4',
                  },
                  {
                    type: 'PIH Malawi',
                    value: 'Malawi: 5086',
                  },
                  {
                    type: 'CIEL',
                    value: '5086',
                  },
                  {
                    type: 'SNOMED CT',
                    value: 'CT: 271650006',
                  },
                  {
                    type: 'AMPATH',
                    value: '5086',
                  },
                ],
              },
              id: 'diastolicBloodPressure',
              hide: '',
            },
            {
              label: 'Temperature',
              type: 'obs',
              questionOptions: {
                rendering: 'number',
                concept: '5088AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                max: '',
                min: '',
                showDate: '',
                conceptMappings: [
                  {
                    type: 'LOINC',
                    value: '8310-5',
                  },
                  {
                    type: 'org.openmrs.module.mdrtb',
                    value: 'TEMPERATURE',
                  },
                  {
                    type: 'CIEL',
                    value: '5088',
                  },
                  {
                    type: 'SNOMED NP',
                    value: 'NP: 386725007',
                  },
                  {
                    type: 'PIH',
                    value: '5088',
                  },
                  {
                    type: 'AMPATH',
                    value: '5088',
                  },
                ],
              },
              id: 'temp',
              hide: 'sbp === foo',
            },
            {
              label: 'Multi select example',
              type: 'obs',
              questionOptions: {
                rendering: 'multicheckbox',
                concept: '12584591-bc0d-4759-9c79-d292fa3f60bb',
                answers: [
                  {
                    concept: '70aa28fa-0596-4ea7-996d-7a8182ebb83b',
                    label: 'Transgender',
                    conceptMappings: [],
                  },
                  {
                    concept: '14063b38-9fc3-4327-8893-f877f287b7d2',
                    label: 'PWUD',
                    conceptMappings: [],
                  },
                  {
                    concept: '21ae368e-acb3-4b03-9f5f-01816e8be70c',
                    label: 'PWID',
                    conceptMappings: [],
                  },
                  {
                    concept: 'bf5020d1-c011-46a3-b6c4-9f38d8b27536',
                    label: 'MSW',
                    conceptMappings: [],
                  },
                  {
                    concept: '9f5e7c02-0d17-489c-9f43-dfda38700679',
                    label: 'FSW',
                    conceptMappings: [],
                  },
                  {
                    concept: '26545d34-c79f-4f42-892a-299755c90e4f',
                    label: 'MSM',
                    conceptMappings: [],
                  },
                  {
                    concept: 'b9d59851-5c53-4d39-a3cc-3b63e1d58876',
                    label: 'General Population',
                    conceptMappings: [],
                  },
                ],
              },
              id: 'multi-select-example',
            },
            {
              label: 'Test 1',
              type: 'obs',
              questionOptions: {
                rendering: 'content-switcher',
                concept: 'edbc886c-54f7-402b-a345-415e83e4f89a',
                answers: [
                  {
                    concept: '703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                    label: 'Positive',
                    conceptMappings: [
                      {
                        type: 'PIH',
                        value: '703',
                      },
                      {
                        type: 'AMPATH',
                        value: '703',
                      },
                      {
                        type: 'AMPATH',
                        value: '704',
                      },
                      {
                        type: 'SNOMED-CT',
                        value: '10828004',
                      },
                      {
                        type: 'org.openmrs.module.mdrtb',
                        value: 'POSITIVE',
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
              id: 'hiv-test-one',
              hide: 'informed-consent == 0d8a135b-0acf-47f3-a51c-77aefe7787db',
            },
          ],
        },
      ],
    },
  ],
  processor: 'EncounterFormProcessor',
  uuid: 'xxxx',
  referencedForms: [],
};
export default HTSForm;
