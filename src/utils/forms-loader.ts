import * as semver from 'semver';
import { OHRIFormField } from '../forms/types';
import defaultFormsRegistry from '../packages/forms-registry';

export interface FormJsonFile {
  version: string;
  semanticVersion?: string;
  json: any;
}

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
export function filterFormByIntent(intent, originalJson) {
  // Deep-copy original JSON
  const jsonBuffer = JSON.parse(JSON.stringify(originalJson));
  // Set the default page based on the current intent
  jsonBuffer.defaultPage = jsonBuffer.availableIntents?.find(candidate => candidate.intent === intent)?.defaultPage;
  // Traverse the property tree with items of interest for validation
  jsonBuffer.pages.forEach(page => {
    const pageBehaviour = page.behaviours?.find(behaviour => behaviour.intent === intent);
    if (pageBehaviour) {
      page.hide = pageBehaviour?.hide;
    } else {
      const fallBackBehaviour = page.behaviours?.find(behaviour => behaviour.intent === '*');
      page.hide = fallBackBehaviour?.hide;
    }
    page.sections.forEach(section => {
      const secBehaviour = section.behaviours?.find(behaviour => behaviour.intent === intent);
      if (secBehaviour) {
        section.hide = secBehaviour?.hide;
      } else {
        const fallBackBehaviour = section.behaviours?.find(behaviour => behaviour.intent === '*');
        section.hide = fallBackBehaviour?.hide;
      }
      section.questions.forEach((question: OHRIFormField) => {
        if (question['behaviours']) {
          updateQuestionRequiredBehaviour(question, intent);
        }
        if (question.questions && question.questions.length) {
          question.questions.forEach(childQuestion => {
            updateQuestionRequiredBehaviour(childQuestion, intent);
          });
        }
      });
    });
  });

  return jsonBuffer;
}

// Helpers

function updateQuestionRequiredBehaviour(question, intent) {
  const requiredIntentBehaviour = question.behaviours?.find(behaviour => behaviour.intent === intent);
  // If required intent is present, substitute original props
  if (requiredIntentBehaviour) {
    question.required = requiredIntentBehaviour.required || undefined;
    question.unspecified = requiredIntentBehaviour.unspecified || undefined;
    question.hide = requiredIntentBehaviour.hide || undefined;
    question.validators = requiredIntentBehaviour.validators || undefined;
  } else {
    // Attempt to retrieve default behaviours
    const defaultIntentBehaviour = question.behaviours.find(behaviour => behaviour.intent === '*');
    if (defaultIntentBehaviour) {
      question.required = defaultIntentBehaviour.required || undefined;
      question.unspecified = defaultIntentBehaviour.unspecified || undefined;
      question.hide = defaultIntentBehaviour.hide || undefined;
      question.validators = defaultIntentBehaviour.validators || undefined;
    }
  }

  // make sure behaviours prop is always deleted
  if (question.behaviours) {
    delete question.behaviours;
  }
}
