import { OhriForm } from './../types';

const Sample: OhriForm = {
  name: 'POC Vitals v1.0',
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
                    concept: '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                  },
                  {
                    label: 'no',
                    concept: '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
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
              label: 'Respiratory Rate',
              type: 'obs',
              questionOptions: {
                rendering: 'number',
                concept: '5242AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                max: '',
                min: '',
                showDate: '',
                conceptMappings: [
                  {
                    type: 'PIH',
                    value: '5242',
                  },
                  {
                    type: 'SNOMED CT',
                    value: 'CT: 86290005',
                  },
                  {
                    type: 'org.openmrs.module.mdrtb',
                    value: 'RESPIRATORY RATE',
                  },
                  {
                    type: 'CIEL',
                    value: '5242',
                  },
                  {
                    type: 'LOINC',
                    value: '9279-1',
                  },
                  {
                    type: 'AMPATH',
                    value: '5242',
                  },
                ],
              },
              id: 'respiRate',
              hide: '',
            },
            {
              label: 'Pulse (Heart Rate)',
              type: 'obs',
              questionOptions: {
                rendering: 'number',
                concept: '5087AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                max: '',
                min: '',
                showDate: '',
                conceptMappings: [
                  {
                    type: 'CIEL',
                    value: '5087',
                  },
                  {
                    type: 'AMPATH',
                    value: '5087',
                  },
                  {
                    type: 'LOINC',
                    value: '8867-4',
                  },
                  {
                    type: 'SNOMED CT',
                    value: 'CT: 78564009',
                  },
                  {
                    type: 'org.openmrs.module.mdrtb',
                    value: 'PULSE',
                  },
                  {
                    type: 'PIH',
                    value: '5087',
                  },
                ],
              },
              id: 'pulse',
              hide: '',
            },
            {
              label: 'Height (cm)',
              type: 'obs',
              questionOptions: {
                rendering: 'number',
                concept: '5090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                max: '',
                min: '',
                showDate: '',
                conceptMappings: [
                  {
                    type: 'LOINC',
                    value: '8302-2',
                  },
                  {
                    type: 'SNOMED CT',
                    value: 'CT: 50373000',
                  },
                  {
                    type: 'AMPATH',
                    value: '5090',
                  },
                  {
                    type: 'PIH Malawi',
                    value: 'Malawi: 5090',
                  },
                  {
                    type: 'CIEL',
                    value: '5090',
                  },
                  {
                    type: 'PIH',
                    value: '5090',
                  },
                ],
              },
              id: 'height',
              hide: '',
            },
            {
              label: 'Weight',
              type: 'obs',
              questionOptions: {
                rendering: 'number',
                concept: '5089AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                max: '',
                min: '',
                showDate: '',
                conceptMappings: [
                  {
                    type: 'PIH Malawi',
                    value: 'Malawi: 5089',
                  },
                  {
                    type: 'AMPATH',
                    value: '5089',
                  },
                  {
                    type: 'LOINC',
                    value: '3141-9',
                  },
                  {
                    type: 'SNOMED CT',
                    value: 'CT: 27113001',
                  },
                  {
                    type: 'PIH',
                    value: '5089',
                  },
                  {
                    type: 'org.openmrs.module.mdrtb',
                    value: 'WEIGHT',
                  },
                  {
                    type: 'CIEL',
                    value: '5089',
                  },
                ],
              },
              id: 'weight',
              hide: '',
            },
            {
              label: 'MUAC',
              type: 'obs',
              questionOptions: {
                rendering: 'number',
                concept: '1343AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                max: '30',
                min: '5',
                showDate: '',
                conceptMappings: [
                  {
                    type: 'SNOMED CT',
                    value: 'CT: 284473002',
                  },
                  {
                    type: 'AMPATH',
                    value: '1343',
                  },
                  {
                    type: 'PIH',
                    value: '1290',
                  },
                  {
                    type: 'CIEL',
                    value: '1343',
                  },
                ],
              },
              id: 'muac',
              hide: '',
            },
            {
              label: 'SPO2',
              type: 'obs',
              questionOptions: {
                rendering: 'number',
                concept: '5092AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                max: '',
                min: '',
                showDate: '',
                conceptMappings: [
                  {
                    type: 'CIEL',
                    value: '5092',
                  },
                  {
                    type: 'IMO ProcedureIT',
                    value: 'ProcedureIT: 3771',
                  },
                  {
                    type: 'SNOMED CT',
                    value: 'CT: 431314004',
                  },
                  {
                    type: 'AMPATH',
                    value: '5092',
                  },
                  {
                    type: 'LOINC',
                    value: '2710-2',
                  },
                  {
                    type: 'IMO ProcedureIT',
                    value: 'ProcedureIT: 26745610',
                  },
                ],
              },
              id: 'spo2',
              hide: '',
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
export default Sample;
