/**
 * This script writes the content of microfrontends.json based on a given json and a selected
 * distro type
 *
 * Usage: node <script file name> --src <source file> --type <type of distro> --dest <destination file path>
 *
 */

const fs = require('fs');
const path = require('path');

//Load command-line parameters ignoring the "node" and script name
const params = process.argv.slice(2);

const getDataFromParam = function(param) {
  const index = params.indexOf(param);
  if (index > -1 && params.length > index + 1) {
    return params[index + 1];
  } else {
    throw Error('Parameter is missing: ' + param);
  }
};

// Set variables for desired parameters
const src = getDataFromParam('--src');
const distroType = getDataFromParam('--type');
const destination = getDataFromParam('--dest');

//Lad contentes from src file
const filePath = path.join(__dirname, src);
let srcFileContents;

if (fs.existsSync(filePath)) {
  srcFileContents = JSON.parse(fs.readFileSync(filePath));
} else {
  throw Error('src file does not exist ');
}
console.info('SOURCE FILE Loaded Sucessful:', src);

//Check if selected type is present in src file
if (!srcFileContents.hasOwnProperty(distroType)) {
  throw Error('src file does not have desired distro type: ' + distroType);
}

console.info(`TYPE |${distroType}| found in release types`);

// Update destination file
const destFileContents = JSON.stringify(srcFileContents[distroType], null, 2);
const destinationFilePath = path.join(__dirname, destination);

console.info(`Writing Updated Import Map to  |${destinationFilePath}| `);

fs.writeFile(destinationFilePath, destFileContents, function(err) {
  if (err && err.code == 'ENOENT') {
    throw Error('ENON: no such file or directory: ' + destinationFilePath);
  }
});

console.info(`Finished writing contents to |${destinationFilePath}| `);
