import * as fs from 'fs';
import * as semver from 'semver';
import { ROOT_DIR } from '../constants';
import path from 'path';

const extension = '.json';

/**
 * Convinience function for loading form(s) associated to a given package or form version.
 *
 * @param packageName The package associated with the form
 * @param formNamespace The form namespace
 * @param basePath The basepath, by default uses ROOT_DIR: `~/../openmrs-esm-ohri/src`
 * @param version The form version
 * @returns The form json
 */
export async function getForm(packageName: string, formNamespace: string, basePath?: string, version?: string) {
  const forms = await readFiles(
    `${path.resolve(__dirname, basePath) || ROOT_DIR}/packages/${packageName}/forms/${formNamespace}`,
  );
  if (version) {
    const form = getFormByVersion(forms, version);
    if (form) {
      return require(form.path);
    }
  }
  const latestForm = getLatestFormVersion(forms);
  if (latestForm) {
    return require(latestForm.path);
  }
  return null;
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

export function getFormByVersion(forms: FormJsonFile[], requiredVersion: string) {
  for (let form of forms) {
    if (semver.satisfies(form.semanticVersion, requiredVersion)) {
      return form;
    }
  }
  // TODO: Should we silently log this or fallback to the latest?
  throw new Error(`Couldn't find form with version: ${requiredVersion}`);
}

function extractVersion(fileName: String, extension: string) {
  return fileName.replace(extension, '').trim();
}

export function readFiles(path: string): Promise<Array<FormJsonFile>> {
  return new Promise((resolve, reject) =>
    fs.readdir(path, function(err, filenames) {
      if (err) {
        reject(`Couldn't read form(s) with path: ${path}`);
        return;
      }
      resolve(
        filenames
          .filter(name => name.endsWith(extension))
          .map(fileName => ({
            name: fileName,
            path: `${path}/${fileName}`,
            version: extractVersion(fileName, extension),
            semanticVersion: semver.coerce(extractVersion(fileName, extension)),
          })),
      );
    }),
  );
}

export interface FormJsonFile {
  name: string;
  path: string;
  version: string;
  semanticVersion?: string;
}
