import * as semver from 'semver';
import { OHRIFormField, OHRIFormPage, OHRIFormSchema } from '../forms/types';
import defaultFormsRegistry from '../packages/forms-registry';

export interface FormJsonFile {
  version: string;
  semanticVersion?: string;
  json: any;
}

/**
 * This is a form behaviour property applied on `page` or `section` or `question`
 */
interface BehaviourProperty {
  name: string;
  type: 'field' | 'section' | 'page' | 'all';
  value: string;
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
  let form = null;
  if (version) {
    form = getFormByVersion(forms, version, isStrict);
  }
  if (!form) {
    form = getLatestFormVersion(forms);
  }
  form.json.pages.forEach(page => {
    if (page.isSubform && page.subform?.name && page.subform.package) {
      try {
        const subform = getForm(page.subform.package, page.subform.name);
        if (!subform) {
          console.error(`Form with name "${page.subform.package}/${page.subform.name}" was not found in registry.`);
        }
        page.subform.form = subform;
      } catch (error) {
        console.error(error);
      }
    }
  });

  return form.json;
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
export function applyFormIntent(intent: string, originalJson) {
  const parentOverrides: Array<BehaviourProperty> = [];
  // Deep-copy original JSON
  const jsonBuffer = JSON.parse(JSON.stringify(originalJson));
  // Set the default page based on the current intent
  jsonBuffer.defaultPage = jsonBuffer.availableIntents?.find(candidate => candidate.intent === intent)?.defaultPage;

  // filter form-level markdown behaviour
  if (jsonBuffer.markdown) {
    updateMarkdownRequiredBehaviour(jsonBuffer.markdown, intent);
  }

  // Traverse the property tree with items of interest for validation
  jsonBuffer.pages.forEach(page => {
    if (page.isSubform && page.subform?.form) {
      const targetBehaviour = page.subform.behaviours?.find(behaviour => behaviour.intent == intent);
      if (targetBehaviour?.readonly !== undefined || targetBehaviour?.readonly != null) {
        parentOverrides.push({ name: 'readonly', type: 'field', value: targetBehaviour?.readonly });
      }
      page.subform.form = applyFormIntent(targetBehaviour?.subform_intent || '*', page.subform?.form);
    }
    // TODO: Apply parentOverrides to pages if applicable
    const pageBehaviour = page.behaviours?.find(behaviour => behaviour.intent === intent);
    if (pageBehaviour) {
      page.hide = pageBehaviour?.hide;
    } else {
      const fallBackBehaviour = page.behaviours?.find(behaviour => behaviour.intent === '*');
      page.hide = fallBackBehaviour?.hide;
    }

    // filter page-level markdown behaviour
    if (page.markdown) {
      updateMarkdownRequiredBehaviour(page.markdown, intent);
    }
    page.sections.forEach(section => {
      // TODO: Apply parentOverrides to sections if applicable
      const secBehaviour = section.behaviours?.find(behaviour => behaviour.intent === intent);
      if (secBehaviour) {
        section.hide = secBehaviour?.hide;
      } else {
        const fallBackBehaviour = section.behaviours?.find(behaviour => behaviour.intent === '*');
        section.hide = fallBackBehaviour?.hide;
      }

      // filter section-level markdown behaviour
      if (section.markdown) {
        updateMarkdownRequiredBehaviour(section.markdown, intent);
      }

      section.questions.forEach((question: OHRIFormField) => {
        if (question['behaviours']) {
          updateQuestionRequiredBehaviour(question, intent);
          parentOverrides
            .filter(override => override.type == 'all' || override.type == 'field')
            .forEach(override => {
              question[override.name] = override.value;
            });
        }

        // filter question-level markdown behaviour
        if (question.markdown) {
          updateMarkdownRequiredBehaviour(question.markdown, intent);
        }

        if (question.questions && question.questions.length) {
          question.questions.forEach(childQuestion => {
            updateQuestionRequiredBehaviour(childQuestion, intent);
            // filter child-question-level markdown behaviour
            if (childQuestion.markdown) {
              updateMarkdownRequiredBehaviour(childQuestion.markdown, intent);
            }

            parentOverrides
              .filter(override => override.type == 'all' || override.type == 'field')
              .forEach(override => {
                childQuestion[override.name] = override.value;
              });
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

  const defaultIntentBehaviour = question.behaviours?.find(bevahiour => bevahiour.intent === '*');

  // If both required and default intents exist, combine them and update to question
  if (requiredIntentBehaviour || defaultIntentBehaviour) {
    // Remove the intent name props from each object
    delete requiredIntentBehaviour?.intent;
    delete defaultIntentBehaviour?.intent;

    // Combine required and default intents following the rules:
    // 1. The default intent is applied to all other intents
    // 2. Intent-specific behaviour overrides default behaviour
    const combinedBehaviours = Object.assign(defaultIntentBehaviour || {}, requiredIntentBehaviour || {});

    // Add the combinedBehaviours data to initial question
    question = Object.assign(question, combinedBehaviours);
    // Remove behaviours list
    delete question.behaviours;
  }
}

function updateMarkdownRequiredBehaviour(markdown, intent) {
  const requiredIntentBehaviour = markdown.behaviours?.find(behaviour => behaviour.intent === intent);
  const defaultIntentBehaviour = markdown.behaviours?.find(behaviour => behaviour.intent === '*');

  if (requiredIntentBehaviour && defaultIntentBehaviour) {
    delete requiredIntentBehaviour.intent;
    delete defaultIntentBehaviour.intent;
    const combinedBehaviours = Object.assign(defaultIntentBehaviour, requiredIntentBehaviour);

    markdown = Object.assign(markdown, combinedBehaviours);
    delete markdown.behaviours;
  } else if (!requiredIntentBehaviour && defaultIntentBehaviour) {
    delete defaultIntentBehaviour.intent;

    markdown = Object.assign(markdown, defaultIntentBehaviour);
    delete markdown.behaviours;
  }
}
