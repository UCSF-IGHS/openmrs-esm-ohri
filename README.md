[![Build Status](https://travis-ci.com/openmrs/openmrs-esm-drugorder.svg?branch=master)](https://travis-ci.com/github/openmrs/openmrs-esm-drugorder)

# Drug Order ESM

The Drug Order MF module for OpenMRS Version 3.0 Frontend.

## Overview

(tbd)

## Built With

* [React (TypeScript)](https://reactjs.org/) - Front-end JS library
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
* [openmrs-esm-drugorder](https://github.com/openmrs/openmrs-esm-drugorder)

### Setup Patient Registration Module

1. Clone the [openmrs-esm-drugorder](https://github.com/openmrs/openmrs-esm-drugorder) repo.

```sh
git clone https://github.com/openmrs/openmrs-esm-drugorder.git
```

2. Install dependencies in the root directory of the repo.

```sh
npm i
```

3. Run the module from `localhost:8080`.

```sh
npm start -- --https
```

### Setup Dev Tools

1. Click `Add new module` in the dev tools window.
2. Type in the `Module Name:` `@openmrs/esm-drugorder-app`.
3. Type in the `Override URL:` `8080`.
4. Go to the browser's development tools (e.g. via `Inspect`).
5. Go to the `Application` tab.
6. Go to `Local Storage`.
7. Find the key: `import-map-override:@openmrs/esm-drugorder-app`
8. Update the corresponding value to: `//localhost:8080/openmrs-esm-drugorder.js`.
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

Currently, there are no releases for this module and it can only be locally deployed by following the installation instructions.

## Configuration

This module is designed to be driven by configuration files. These files define the look and functionality required to drive the Patient Registration module.

*Note: Currently, the module cannot be configured as it is in the early stages of development.*

## Resources

* [JIRA Epic](https://issues.openmrs.org/browse/MF-?)

## Acknowledgements

* [Manuel Römer](https://github.com/ManuelRoemer) - maintenance, design, analysis, onboarding, and development.
* [Florian Rappl](https://github.com/FlorianRappl) - module scaffolding, onboarding, guidance, and review.

## License

The project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details. 
