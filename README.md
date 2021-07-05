## Badges
[![Node.js CI](https://github.com/UCSF-IGHS/openmrs-esm-ohri/actions/workflows/node.js.yml/badge.svg?branch=working)](https://github.com/UCSF-IGHS/openmrs-esm-ohri/actions/workflows/node.js.yml)

![Badges](badges/badge-branches.svg) ![Badges](badges/badge-functions.svg) ![Badges](badges/badge-lines.svg)
# OHRI ESM

A custom microfrontend for OpenMRS HIV Reference Implementation (OHRI)

## Overview

(tbd)

## Built With

* [React](https://reactjs.org/) ([TypeScript](https://www.typescriptlang.org)) - Front-end JS library
* [Formik](https://formik.org/docs/overview) - Form builder JS library
* [Day.js](https://day.js.org/) - Date library
* [Jest](https://jestjs.io/) - JS testing framework
* [React Testing Library](https://testing-library.com/) - JS testing library for React components
* [npm](https://www.npmjs.com/) - Node package manager
* [webpack](https://webpack.js.org/) - JS module bundler
* [ESLint](https://eslint.org/) - JS linter
* [Prettier](https://prettier.io/) - Code formatter
* [Babel](https://babeljs.io/) - JS compiler
* [Travis CI](https://travis-ci.org/) - CI service

## Installation

### Prerequisites

* [Node](https://nodejs.org/en/download/)
* [Git](https://git-scm.com/downloads)
* [openmrs-esm-ohri](https://github.com/UCSF-IGHS/openmrs-esm-ohri)

### Setup OHRI Module

1. Clone the [openmrs-esm-ohri](https://github.com/UCSF-IGHS/openmrs-esm-ohri) repo.

```sh
git clone https://github.com/UCSF-IGHS/openmrs-esm-ohri.git
```

2. Install dependencies in the root directory of the repo.
- make sure you are using a relatively recent version of node, LTE is 14.x.x, you can type node -version to find your current version. I would recommend using n to manage your node version: see https://www.npmjs.com/package/n
```sh
npm i
```

3. Run the module from `localhost:8080`.

```sh
npm run serve
```

### Setup Dev Tools

1. Click `Add new module` in the dev tools window.
2. Type in the `Module Name:` `@openmrs/esm-ohri-app`.
3. Type in the `Override URL:` `8080`.
4. Go to the browser's development tools (e.g. via `Inspect`).
5. Go to the `Application` tab.
6. Go to `Local Storage`.
7. Find the key: `import-map-override:@openmrs/esm-ohri-app`
8. Update the corresponding value to: `//localhost:8080/openmrs-esm-ohri.js`.
9. Click on the padlock/warning message next to the URL in the browser.
10. Select the `Allow` option from the `Insecure content` dropdown in the browser settings page.
11. Refresh the page.

## Tests

To verify that all of the tests run:

```sh
npm test
```

*Note: Run `npm i` before running tests for the first time.*

## Deployment

Currently, available releases for this module:
- [![DEMO](https://ohri-demo.globalhealthapp.net/)] 

## Configuration

This module is designed to be driven by configuration files. These files define the look and functionality required to drive the OHRI module.

*Note: Currently, the module cannot be configured as it is in the early stages of development.*

## Resources

(tbd)
## Acknowledgements

(tbd)
## License

(tbd)
