import { OhriForm } from './types';

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
              label: 'Systolic Blood Pressure',
              type: 'obs',
              questionOptions: {
                rendering: 'number',
                concept: '5085AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                max: '300',
                min: '0',
                showDate: '',
                conceptMappings: [],
              },
              id: 'sbp',
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
                conceptMappings: [],
              },
              id: 'diastolicBloodPressure',
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
