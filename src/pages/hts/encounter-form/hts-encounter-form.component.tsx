import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonSet,
  Checkbox,
  ContentSwitcher,
  DatePicker,
  DatePickerInput,
  Dropdown,
  Form,
  FormGroup,
  Switch,
  Toggle,
} from 'carbon-components-react';
import styles from './hts-encounter-form.scss';

import {
  age,
  createErrorHandler,
  detach,
  openmrsObservableFetch,
  toDateObjectStrict,
  useConfig,
  usePatient,
} from '@openmrs/esm-framework';
import { getConcept, getHTSLocations, saveHTSEncounter } from './hts-encounter-form.resource';
import { Concept, HSTEncounter } from '../../../api/types';
import LoadingIcon from '../../../components/loading/loading.component';
import { IdentifierGenerator } from '../../../components/identifier-generator/identifier-generator.component';
import { PatientBanner } from '../../../components/patient-banner/patient-banner.component';
import { encounterRepresentation } from '../../../constants';

// TODO: Remove hardcoded values, configure through module config
const HTSEncounterType = '30b849bd-c4f4-4254-a033-fe9cf01001d8';
const populationTypeConceptUuid = '12584591-bc0d-4759-9c79-d292fa3f60bb';
const testOneConceptUuid = 'edbc886c-54f7-402b-a345-415e83e4f89a';
const patientConsentConceptUuid = '1710AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
const confirmatoryTestConceptUuid = 'aafd3e2b-51b4-4607-86f8-097fb93c0dba';
const finalTestConceptUuid = 'f4470401-08e2-40e5-b52b-c9d1254a4d66';
// This is a basic clinical role, replace with actual HTS Encounter role
const htsEncounterRole = '240b26f9-dd88-4172-823d-4a8bfeb7841f';
const possibleHSTCodedAnswers = [
  '1138AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  '664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  '703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
];

const HtsEncounterForm: React.FC<{
  closeWorkspace: () => {};
  state: any;
  patientUuid: string;
  encounterUuid: string;
}> = ({ closeWorkspace, patientUuid, state, encounterUuid }, props) => {
  // const config = useConfig();
  // TODO: Configure all metadata through the config
  // const { encounterType, concepts } = config['htsEntryFormConfig'];
  const { patient } = usePatient();
  const [isLoading, setIsLoading] = useState(true);
  const [encounter, setEncounter] = useState(null);
  const [patientConsent, setPatientConsent] = useState(false);
  const [testLocation, setTestLocation] = useState<{ uuid: string; display: string }>(null);
  const [locationInvalid, setLocationInvalid] = useState(false);
  const [htsLocations, setHtsLocations] = useState<{ uuid: string; display: string }[]>([]);
  const [htsDate, setHTSDate] = useState(new Date());
  const [populationTypeConcept, setPopulationTypeConcept] = useState<Concept>();
  const [populationTypesObs, setPopulationTypeObs] = useState([]);
  const [testOneResult, setTestOneResult] = useState({
    concept: '1138AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    name: 'Not Performed',
  });
  const [confirmatoryTestResult, setConfirmatoryTestResult] = useState(null);
  const [finalTestResult, setFinalTestResult] = useState(null);
  const [currentProvider, setCurrentProvider] = useState();
  const conductConfirmatoryTest = testOneResult?.concept === '703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
  const [populationTypeValueGroupObs, setPopulationTypeValueGroupObs] = useState([]);
  const [obsForRetire, setObsForRetire] = useState([]);
  // population types
  const [generalPop, setGeneralPop] = useState(false);
  const [msm, setMSM] = useState(false);
  const [fsw, setFSW] = useState(false);
  const [msw, setMSW] = useState(false);
  const [pwid, setPWID] = useState(false);
  const [pwud, setPWUD] = useState(false);
  const [trangender, setTrangender] = useState(false);

  useEffect(() => {
    if (populationTypeValueGroupObs.length) {
      const selectedPopulationTypeUuids = populationTypeValueGroupObs.map(obs => obs.value.uuid);
      populationTypeConcept?.answers?.forEach((value, index) => {
        const selected = selectedPopulationTypeUuids.includes(value.uuid);
        switch (index) {
          case 0:
            setGeneralPop(selected);
            break;
          case 1:
            setMSM(selected);
            break;
          case 2:
            setFSW(selected);
            break;
          case 3:
            setMSW(selected);
            break;
          case 4:
            setPWID(selected);
            break;
          case 5:
            setPWUD(selected);
            break;
          case 6:
            setTrangender(selected);
            break;
        }
      });
    }
  }, [populationTypeValueGroupObs]);

  useEffect(() => {
    const sub1 = getHTSLocations().subscribe(
      results => setHtsLocations(results),
      error => createErrorHandler(),
    );

    const sub2 = getConcept(
      populationTypeConceptUuid,
      'custom:(uuid,display,answers:(uuid,display))',
    ).subscribe(result => setPopulationTypeConcept(result));

    const sub3 = openmrsObservableFetch('/ws/rest/v1/appui/session').subscribe((user: any) => {
      setCurrentProvider(user.data?.currentProvider?.uuid);
    });

    let sub4 = null;
    if (encounterUuid) {
      sub4 = openmrsObservableFetch(`/ws/rest/v1/encounter/${encounterUuid}?v=${encounterRepresentation}`).subscribe(
        response => {
          setEncounter(response.data);
        },
      );
    }
    return () => {
      sub1.unsubscribe();
      sub2.unsubscribe();
      sub3.unsubscribe();
      sub4?.unsubscribe();
      detach('hts-encounter-form-slot', 'hts-encounter-form-ext');
    };
  }, []);

  useEffect(() => {
    setFinalTestResult(evaluateFinalTestResult());
  }, [testOneResult, confirmatoryTestResult]);

  useEffect(() => {
    if (testLocation) {
      setLocationInvalid(false);
    }
  }, [testLocation]);

  useEffect(() => {
    setIsLoading(!(encounter ? !!encounter && !!populationTypeConcept : !!populationTypeConcept));
  }, [encounter, populationTypeConcept]);

  useEffect(() => {
    if (encounter) {
      setIsLoading(false);
      // edit mode
      setHTSDate(toDateObjectStrict(encounter.encounterDatetime));
      setTestLocation({ uuid: encounter.location.uuid, display: encounter.location.name });
      // Initialize patient consent
      const rawPatientConsentVal = encounter.obs.find(obs => obs.concept.uuid === patientConsentConceptUuid).value;
      // check if backend return a boolean value
      if (typeof JSON.parse(JSON.stringify(rawPatientConsentVal)) === 'boolean') {
        setPatientConsent(rawPatientConsentVal);
      } else {
        // then a concept that represents either 'True' or 'False' was returned
        setPatientConsent(rawPatientConsentVal.name.name.toLowerCase() === 'true');
      }
      setPopulationTypeValueGroupObs(encounter.obs.filter(obs => obs.concept.uuid === populationTypeConceptUuid));

      const testOneObs = encounter.obs.find(obs => obs.concept.uuid === testOneConceptUuid);
      testOneObs &&
        setTestOneResult({
          concept: testOneObs.value.uuid,
          name:
            testOneObs.value.uuid === '1138AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
              ? 'Not Performed'
              : testOneObs.value.name.name,
        });

      const confirmatoryTestObs = encounter.obs.find(obs => obs.concept.uuid === confirmatoryTestConceptUuid);
      if (confirmatoryTestObs) {
        setConfirmatoryTestResult({
          concept: confirmatoryTestObs.value.uuid,
          name:
            confirmatoryTestObs.value.uuid === '1138AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
              ? 'Not Performed'
              : confirmatoryTestObs.value.name.name,
        });
      }
    }
  }, [encounter]);

  const evaluateFinalTestResult = () => {
    if (confirmatoryTestResult && confirmatoryTestResult.name !== 'Not Performed') {
      return confirmatoryTestResult;
    } else if (testOneResult && testOneResult.name !== 'Not Performed') {
      return testOneResult;
    }
    return null;
  };

  const recordPopulationTypeObs = (checked, id, event) => {
    const obs = populationTypeValueGroupObs.find(obs => obs.value.uuid === event.currentTarget.value);
    if (obs) {
      return voidObs(checked, obs, event.currentTarget.value);
    }
    if (checked === true) {
      populationTypesObs.push({
        person: patient.id,
        obsDatetime: htsDate,
        concept: populationTypeConcept.uuid,
        location: testLocation.uuid,
        order: null,
        groupMembers: [],
        voided: false,
        value: event.currentTarget.value,
      });
      setPopulationTypeObs(populationTypesObs);
    } else {
      setPopulationTypeObs(populationTypesObs.filter(obs => obs.value !== event.currentTarget.value));
    }
  };

  const voidObs = (checked, obs, answerConcept) => {
    if (!checked) {
      setObsForRetire([...obsForRetire, obs]);
    } else {
      setObsForRetire(obsForRetire.filter(obs => obs.value.uuid !== answerConcept));
    }
  };

  const handleSubmissionEnterMode = () => {
    const enc: HSTEncounter = {
      patient: patient.id,
      encounterDatetime: htsDate,
      location: testLocation.uuid,
      encounterType: HTSEncounterType,
      encounterProviders: [
        {
          provider: currentProvider,
          encounterRole: htsEncounterRole,
        },
      ],
      obs: [
        {
          person: patient.id,
          obsDatetime: htsDate,
          concept: patientConsentConceptUuid,
          location: testLocation.uuid,
          order: null,
          groupMembers: [],
          voided: false,
          value: patientConsent,
        },
        {
          person: patient.id,
          obsDatetime: htsDate,
          concept: testOneConceptUuid,
          location: testLocation.uuid,
          order: null,
          groupMembers: [],
          voided: false,
          value: testOneResult.concept,
        },
        ...populationTypesObs,
      ],
    };
    if (finalTestResult) {
      enc.obs.push({
        person: patient.id,
        obsDatetime: htsDate,
        concept: finalTestConceptUuid,
        location: testLocation.uuid,
        order: null,
        groupMembers: [],
        voided: false,
        value: finalTestResult.concept,
      });
    }
    if (confirmatoryTestResult) {
      enc.obs.push({
        person: patient.id,
        obsDatetime: htsDate,
        concept: confirmatoryTestConceptUuid,
        location: testLocation.uuid,
        order: null,
        groupMembers: [],
        voided: false,
        value: confirmatoryTestResult.concept,
      });
    }
    saveHTSEncounter(new AbortController(), enc).then(response => {
      if (response.ok) {
        if (state.updateParent) {
          state.updateParent();
        }
        closeWorkspace();
      }
    });
  };

  const handleSubmissionEditMode = () => {
    encounter.location = testLocation.uuid;
    if (encounter.encounterProviders.findIndex(p => currentProvider === p.provider.uuid) === -1) {
      encounter.encounterProviders = [
        ...encounter.encounterProviders,
        {
          provider: currentProvider,
          encounterRole: htsEncounterRole,
        },
      ];
    }
    // patient consent
    const consentIndex = encounter.obs.findIndex(o => o.concept.uuid === patientConsentConceptUuid);
    encounter.obs[consentIndex].value = patientConsent;
    obsForRetire.forEach(obs => {
      const index = encounter.obs.findIndex(o => o.value.uuid === obs.value.uuid);
      encounter.obs[index]['voided'] = true;
    });
    encounter.obs = [...encounter.obs, ...populationTypesObs];
    // test one
    const testOneResultIndex = encounter.obs.findIndex(o => o.concept.uuid === testOneConceptUuid);
    encounter.obs[testOneResultIndex].value = testOneResult.concept;
    // confirmatory test
    const confirmatoryTestResultIndex = encounter.obs.findIndex(o => o.concept.uuid === confirmatoryTestConceptUuid);
    if (confirmatoryTestResultIndex !== -1) {
      encounter.obs[confirmatoryTestResultIndex].value = confirmatoryTestResult.concept;
    } else if (confirmatoryTestResult) {
      encounter.obs.push({
        person: patient.id,
        obsDatetime: htsDate,
        concept: confirmatoryTestConceptUuid,
        location: testLocation.uuid,
        order: null,
        groupMembers: [],
        voided: false,
        value: confirmatoryTestResult.concept,
      });
    }
    // final
    const finalTestResultIndex = encounter.obs.findIndex(o => o.concept.uuid === finalTestConceptUuid);
    if (finalTestResultIndex !== -1) {
      encounter.obs[finalTestResultIndex].value = finalTestResult.concept;
    } else if (finalTestResult) {
      encounter.obs.push({
        person: patient.id,
        obsDatetime: htsDate,
        concept: finalTestConceptUuid,
        location: testLocation.uuid,
        order: null,
        groupMembers: [],
        voided: false,
        value: finalTestResult.concept,
      });
    }
    saveHTSEncounter(new AbortController(), encounter, encounter.uuid).then(response => {
      if (response.ok) {
        if (state.updateParent) {
          state.updateParent();
        }
        closeWorkspace();
      }
    });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    // do some soft field validation
    if (!testLocation) {
      setLocationInvalid(true);
      return;
    }
    if (encounter) {
      handleSubmissionEditMode();
    } else {
      handleSubmissionEnterMode();
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      {patient && (
        <>
          <div className={styles.container}>
            <PatientBanner patient={patient} />
            {isLoading ? (
              <LoadingIcon />
            ) : (
              <div id="content-wrapper" className={styles.contentWrapper}>
                <Section title="Patient Details" index={1}>
                  <div>
                    <Toggle
                      labelText="Patient consent"
                      labelA="Not received"
                      labelB="Received"
                      id="patient-consent"
                      className={styles.customToggle}
                      toggled={patientConsent}
                      onToggle={event => setPatientConsent(event)}
                    />
                  </div>
                  <div className={styles.sectionOneRow}>
                    {htsLocations && (
                      <div className={styles.chooseLocationColumn}>
                        <Dropdown
                          id="communityOutreach"
                          titleText="Test Location"
                          label="Choose location"
                          items={htsLocations}
                          itemToString={item => item.display}
                          className={styles.dropDownOverrides}
                          selectedItem={testLocation}
                          onChange={({ selectedItem }) => {
                            setTestLocation(selectedItem);
                          }}
                          invalid={locationInvalid}
                          invalidText="This field is required"
                        />
                      </div>
                    )}
                    <div className={styles.htsDateInputColumn}>
                      <DatePicker
                        datePickerType="simple"
                        className={styles.datePickerOverrides}
                        onChange={([date]) => setHTSDate(date)}>
                        <DatePickerInput
                          placeholder="dd/mm/yyyy"
                          labelText="Date of HTS Test"
                          id="hts-date"
                          value={htsDate.toLocaleDateString(window.navigator.language)}
                        />
                      </DatePicker>
                    </div>
                    <div className={styles.idGenColumn}>
                      <IdentifierGenerator />
                    </div>
                  </div>
                  <div className={styles.populationTypeWrapper}>
                    <fieldset>
                      <legend className={styles.label}>Patient Population Type</legend>
                      <div style={{ display: 'flex' }}>
                        <div style={{ width: '100%' }}>
                          <Checkbox
                            labelText="Generation Population"
                            id="generation-pop"
                            className={styles.checkboxLabelOverride}
                            value={populationTypeConcept.answers[0].uuid}
                            onChange={(checked, id, event) => {
                              setGeneralPop(checked);
                              recordPopulationTypeObs(checked, id, event);
                            }}
                            checked={generalPop}
                          />
                          <Checkbox
                            labelText="MSM"
                            id="msm"
                            className={styles.checkboxLabelOverride}
                            value={populationTypeConcept.answers[1].uuid}
                            onChange={(checked, id, event) => {
                              setMSM(checked);
                              recordPopulationTypeObs(checked, id, event);
                            }}
                            checked={msm}
                          />
                          <Checkbox
                            labelText="FSW"
                            id="fsw"
                            className={styles.checkboxLabelOverride}
                            value={populationTypeConcept.answers[2].uuid}
                            onChange={(checked, id, event) => {
                              setFSW(checked);
                              recordPopulationTypeObs(checked, id, event);
                            }}
                            checked={fsw}
                          />
                        </div>
                        <div style={{ width: '100%' }}>
                          <Checkbox
                            labelText="MSW"
                            id="msw"
                            className={styles.checkboxLabelOverride}
                            value={populationTypeConcept.answers[3].uuid}
                            onChange={(checked, id, event) => {
                              setMSW(checked);
                              recordPopulationTypeObs(checked, id, event);
                            }}
                            checked={msw}
                          />
                          <Checkbox
                            labelText="PWID"
                            id="pwid"
                            className={styles.checkboxLabelOverride}
                            value={populationTypeConcept.answers[4].uuid}
                            onChange={(checked, id, event) => {
                              setPWID(checked);
                              recordPopulationTypeObs(checked, id, event);
                            }}
                            checked={pwid}
                          />
                        </div>
                        <div style={{ width: '100%' }}>
                          <Checkbox
                            labelText="PWUD"
                            id="pwud"
                            className={styles.checkboxLabelOverride}
                            value={populationTypeConcept.answers[5].uuid}
                            onChange={(checked, id, event) => {
                              setPWUD(checked);
                              recordPopulationTypeObs(checked, id, event);
                            }}
                            checked={pwud}
                          />
                          <Checkbox
                            labelText="Transgender"
                            id="transgender"
                            className={styles.checkboxLabelOverride}
                            value={populationTypeConcept.answers[6].uuid}
                            onChange={(checked, id, event) => {
                              setTrangender(checked);
                              recordPopulationTypeObs(checked, id, event);
                            }}
                            checked={trangender}
                          />
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </Section>
                <Section title="HIV Testing" index={2}>
                  <div className={styles.label}>Test 1</div>
                  <div className={styles.contentSwitchWrapper}>
                    <ContentSwitcher
                      onChange={({ name, text }) => {
                        setTestOneResult({
                          concept: name.toString(),
                          name: text,
                        });
                      }}
                      selectedIndex={possibleHSTCodedAnswers.indexOf(testOneResult.concept)}
                      size="xl">
                      <Switch name="1138AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" text="Not Performed" />
                      <Switch name="664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" text="Negative" />
                      <Switch name="703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" text="Positive" />
                    </ContentSwitcher>
                  </div>
                  <div className={styles.label}>Confirmation Test</div>
                  <div className={styles.contentSwitchWrapper}>
                    <ContentSwitcher
                      onChange={({ name, text }) => {
                        setConfirmatoryTestResult({
                          concept: name,
                          name: text,
                        });
                      }}
                      selectedIndex={possibleHSTCodedAnswers.indexOf(
                        confirmatoryTestResult
                          ? confirmatoryTestResult.concept
                          : '1138AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                      )}>
                      <Switch
                        name="1138AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
                        text="Not Performed"
                        disabled={!conductConfirmatoryTest}
                      />
                      <Switch
                        name="664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
                        text="Negative"
                        disabled={!conductConfirmatoryTest}
                      />
                      <Switch
                        name="703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
                        text="Positive"
                        disabled={!conductConfirmatoryTest}
                      />
                    </ContentSwitcher>
                  </div>
                  <div className={styles.label}>Final Result</div>
                  {finalTestResult ? <h6 className={styles.label}>{finalTestResult.name}</h6> : <EmptyValue />}
                </Section>
              </div>
            )}
          </div>
          <div className={styles.submit}>
            <ButtonSet className={styles.submitButtonsOverrides}>
              <Button kind="secondary" onClick={() => closeWorkspace()}>
                Cancel
              </Button>
              <Button kind="primary" type="submit">
                Save &amp; Close
              </Button>
            </ButtonSet>
          </div>
        </>
      )}
    </Form>
  );
};

const Section = ({ title, children, index }) => {
  return (
    <div className={styles.section}>
      <FormGroup legendText={''}>
        <h3 className={styles.sectionHeading}>
          {index}. {title}
        </h3>
        {children}
      </FormGroup>
    </div>
  );
};

const EmptyValue = () => {
  return (
    <div>
      <span style={{ fontSize: '1.75rem' }}>- -</span>
    </div>
  );
};

export default HtsEncounterForm;
