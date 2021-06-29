import { FormJsonFile, getForm, getFormByVersion, getLatestFormVersion, readFiles } from './forms-loader';

const basePath = '../../__mocks__';
const htsTestForms: FormJsonFile[] = [
  {
    name: '1.0.json',
    path: '../../hts_poc/1.0.json',
    version: '1.0',
    semanticVersion: '1.0.0',
  },
  {
    name: '1.1.json',
    path: '../../hts_poc/1.1.json',
    version: '1.1',
    semanticVersion: '1.1.0',
  },
  {
    name: '2.0.json',
    path: '../../hts_poc/2.0.json',
    version: '2.0',
    semanticVersion: '2.0.0',
  },
];

describe('Forms loader - getForm', () => {
  it('should get latest form if no version was specified', async () => {
    // replay
    const latestHTSForm = await getForm('hiv', 'hts_poc', basePath);
    // verify
    expect(latestHTSForm).toEqual({
      name: 'Test HTS POC',
      pages: [
        {
          label: 'Screening',
          sections: [
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
      processor: 'EncounterFormProcessor',
      uuid: 'da24c540-cc83-43bc-978f-c1ef180a497f',
      referencedForms: [],
      encounterType: '79c1f50f-f77d-42e2-ad2a-d29304dde2fe',
    });
  });

  it('should get form with specified version', async () => {
    // replay
    const htsFormV1_0 = await getForm('hiv', 'hts_poc', basePath, '1.0');
    // verify
    expect(htsFormV1_0).toEqual({
      name: 'Test HTS POC',
      pages: [],
      processor: 'EncounterFormProcessor',
      uuid: 'da24c540-cc83-43bc-978f-c1ef180a497f',
      referencedForms: [],
      encounterType: '79c1f50f-f77d-42e2-ad2a-d29304dde2fe',
    });
  });
});

describe('Forms loader - getLatestFormVersion', () => {
  it('should get latest form', () => {
    // replay
    const latest = getLatestFormVersion(htsTestForms);

    // verify
    expect(latest).toEqual({
      name: '2.0.json',
      path: '../../hts_poc/2.0.json',
      version: '2.0',
      semanticVersion: '2.0.0',
    });
  });
});

describe('Forms loader - getFormByVersion', () => {
  it('should get latest form', () => {
    // replay
    const htsFormV1_1 = getFormByVersion(htsTestForms, '1.1');

    // verify
    expect(htsFormV1_1).toEqual({
      name: '1.1.json',
      path: '../../hts_poc/1.1.json',
      version: '1.1',
      semanticVersion: '1.1.0',
    });
  });
});
