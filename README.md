# OHRI ESM

A custom microfrontend for OpenMRS HIV Reference Implementation (OHRI)
## Badges
[![Node.js CI](https://github.com/UCSF-IGHS/openmrs-esm-ohri/actions/workflows/node.js.yml/badge.svg?branch=dev)](https://github.com/UCSF-IGHS/openmrs-esm-ohri/actions/workflows/node.js.yml)
[![Node.js CI](https://github.com/UCSF-IGHS/openmrs-esm-ohri/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/UCSF-IGHS/openmrs-esm-ohri/actions/workflows/node.js.yml)

## Overview

This is a Lerna project containing the OHRI packages built on top of OpenMRS Frontend.

[🌍DEMO](https://ohri-demo.globalhealthapp.net/openmrs/spa)

### Available Packages

- [esm-ohri-core-app](https://github.com/UCSF-IGHS/openmrs-esm-ohri/tree/master/packages/esm-ohri-core-app) (OHRI Core App)
- [esm-commons-lib](https://github.com/UCSF-IGHS/openmrs-esm-ohri/tree/master/packages/esm-commons-lib) (Common Libraries)
- [esm-form-render-app](https://github.com/UCSF-IGHS/openmrs-esm-ohri/tree/master/packages/esm-form-render-app) (Form Render App)
- [esm-hiv-app](https://github.com/UCSF-IGHS/openmrs-esm-ohri/tree/master/packages/esm-hiv-app) (HIV App)
- [esm-covid-app](https://github.com/UCSF-IGHS/openmrs-esm-ohri/tree/master/packages/esm-covid-app) (COVID-19 App)
- [esm-cervical-cancer-app](https://github.com/UCSF-IGHS/openmrs-esm-ohri/tree/master/packages/esm-cervical-cancer-app) (Cervical Cancer App)

## Installation

### Prerequisites

* [Node](https://nodejs.org/en/download/)
* [Git](https://git-scm.com/downloads)

### Setup OHRI Module

1. Clone the [openmrs-esm-ohri](https://github.com/UCSF-IGHS/openmrs-esm-ohri) repo.

```sh
git clone https://github.com/UCSF-IGHS/openmrs-esm-ohri.git
```

2. Setup repository
```sh
yarn setup
```

3. Start all packages on `localhost:8080`.

```sh
yarn start
```
This command start each package inside the `packages` directory with the *development* mode connected to the *https://ohri-demo.globalhealthapp.net* backend. This is the actual script:

If you would like to run individual packages, you can use the following command:

```sh
yarn start:<package-name>

# for example

# To start ohri core
yarn start:core

# To start covid esm
yarn start:covid

# To start hiv esm
yarn start:hiv

# To start cervical-cancer esm
yarn start:cervical-cancer

# To start form-render esm
yarn start:form-render
```

## Tests

To verify that all of the tests run:

```sh
yarn test
```

*Note: Run `npm i` before running tests for the first time.*

## Deployment

TBD

## Configuration

This module is designed to be driven by configuration files. These files define the look and functionality required to drive the OHRI module.

*Note: Currently, the module cannot be configured as it is in the early stages of development.*

## Resources
Optional Steps:
To run against a deployment server (to reflect local changes that will be on server upon Deployment):
On terminal run ->  ```npx openmrs develop --backend https://{server-address}```

(tbd)
## Acknowledgements

(tbd)
## License

[MPL 2.0 w/ HD](http://openmrs.org/license/) © [OpenMRS Inc.](http://www.openmrs.org/)
