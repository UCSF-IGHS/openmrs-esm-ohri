import * as semver from 'semver';
import defaultFormsRegistry from '../packages/forms-registry';

/**
 * Convinience function for loading form(s) associated to a given package or form version.
 *
 * @param packageName The package associated with the form
 * @param formNamespace The form namespace
 * @param version The form version
 * @param isStrict If `true`, throws error if specified form version wasn't found
 * @param formsRegistry Form registry. (This was added for testing purposes)
 * @returns The form json
 */
export function getForm(
  packageName: string,
  formNamespace: string,
  version?: string,
  isStrict?: boolean,
  formsRegistry?: any,
) {
  const forms = lookupForms(packageName, formNamespace, formsRegistry);
  if (version) {
    const form = getFormByVersion(forms, version, isStrict);
    if (form) {
      return form.json;
    }
  }
  return getLatestFormVersion(forms).json;
}

export function getLatestFormVersion(forms: FormJsonFile[]) {
  if (forms.length == 1) {
    return forms[0];
  }
  const latest = semver.maxSatisfying(
    forms.map(f => f.semanticVersion),
    '*',
  );
  return forms.find(f => f.semanticVersion == latest);
}

export function getFormByVersion(forms: FormJsonFile[], requiredVersion: string, isStrict?: boolean) {
  for (let form of forms) {
    if (semver.satisfies(form.semanticVersion, requiredVersion)) {
      return form;
    }
  }
  if (isStrict) {
    throw new Error(`Couldn't find form with version: ${requiredVersion}`);
  } else {
    return null;
  }
}

export function lookupForms(packageName, formNamespace, formsRegistry) {
  const pkg = formsRegistry ? formsRegistry[packageName] : defaultFormsRegistry[packageName];
  if (!pkg) {
    throw Error(`Package with name ${packageName} was not found in registry`);
  }
  if (!pkg[formNamespace]) {
    throw new Error(`Form namespace '${formNamespace}' was not found in forms registry`);
  }
  return Object.keys(pkg[formNamespace]).map(formVersion => {
    return {
      version: formVersion,
      semanticVersion: semver.coerce(formVersion).version,
      json: pkg[formNamespace][formVersion],
    };
  });
}

/**
 * Function parses JSON form input and filters validation behaviours according to a given intent
 *
 * @param {string} intent The specified intent
 * @param {object} originalJson The original JSON form schema object
 * @returns {object} The form json
 */
export function filterFormByIntent (intent, originalJson) {
  //Dee-copy orignal JSON
  console.log('intent', intent);
  console.log('originalJSON', originalJson);
  // Deep-copy original JSON
  const jsonBuffer = JSON.parse(JSON.stringify(originalJson));

  // Traverse the property tree with items of interest for validation
  jsonBuffer.pages.forEach(page => {
    page.sections.forEach(section => {
      section.questions.forEach(question => {
        // Check if question behaviours includes required intent
        const requiredIntentBehaviours = question.behaviours.find(behaviour => behaviour.intent === intent);

        // If required intent is present, substitute original props
        if (requiredIntentBehaviours) {
          question.required = requiredIntentBehaviours.required || undefined;
          question.unspecified = requiredIntentBehaviours.unspecified || undefined;
          question.hide = requiredIntentBehaviours.hide || undefined;
          question.validators = requiredIntentBehaviours.validators || undefined;

          delete question.behaviours;
        }
      });
    });
  });

  // Return constructed Json based on intent validation
  return jsonBuffer;
}

export interface FormJsonFile {
  version: string;
  semanticVersion?: string;
  json: any;
}
