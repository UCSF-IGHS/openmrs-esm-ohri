import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getForm, applyFormIntent, OHRIForm, OHRIFormSchema, SessionMode } from 'openmrs-ohri-form-engine-lib';

interface URLParams {
  packageName: string;
  formName: string;
  patientUUID: string;
}

/**
 * This component renders a form for a patient encounter.
 * @param {string} package Name of the form package
 * @param {string} name Name of the form inside the package
 * @param {string} patientUUID UUID of the patient whose form will be accessed
 * @param {string} [encounterUUID] UUID of the patient encounter. If not provided, form opens in enter mode
 * @param {string=enter, view, edit} [mode=enter] Mode to access the form
 * @param {string} [intent=*] Form intent
 * @returns OHRIForm A form component
 */
const FormRenderComponent = () => {
  const [form, setForm] = useState<OHRIFormSchema>();
  const [formMode, setFormMode] = useState<SessionMode>('enter');
  const [formEncounter, setFormEncounter] = useState('');
  const [isFormLoaded, setIsFormLoaded] = useState(false);
  const { packageName, formName, patientUUID } = useParams<URLParams>();

  // Get URL search params
  const urlSearchParams = new URLSearchParams(window.location.search.slice(1));
  const getURLParam = parameter => (urlSearchParams.has(parameter) ? urlSearchParams.get(parameter) : null);

  useEffect(() => {
    let formJSON = getForm(packageName, formName);

    if (formJSON) {
      const formIntent = getURLParam('intent') ? getURLParam('intent') : '*';
      formJSON = applyFormIntent(formIntent, formJSON);
      setForm(formJSON);

      const mode = getURLParam('mode');
      if (mode) {
        switch (mode) {
          case 'edit':
            setFormMode('edit');
            break;
          case 'view':
            setFormMode('view');
            break;
          default:
        }
      }

      const encounter = getURLParam('encounter') || '';
      if (encounter) {
        setFormEncounter(encounter);
      }

      setIsFormLoaded(true);
    }
  }, []);

  return (
    <>
      {isFormLoaded ? (
        <div>
          <OHRIForm formJson={form} mode={formMode} patientUUID={patientUUID} encounterUuid={formEncounter} />
        </div>
      ) : (
        <h1>There was an issue in processing your form. Please try again</h1>
      )}
    </>
  );
};

export default FormRenderComponent;
