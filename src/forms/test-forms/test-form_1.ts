import { OhriForm } from './../types';

const POCVitalsForm: OhriForm = {
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
          ],
        },
      ],
    },
  ],
  processor: 'EncounterFormProcessor',
  uuid: 'xxxx',
  referencedForms: [],
};
export default POCVitalsForm;
