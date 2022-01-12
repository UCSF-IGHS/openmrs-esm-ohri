# OHRI ESM Docker Distribution

A Docker distribution for a custom microfrontend for OpenMRS HIV Reference Implementation (OHRI)

### Prerequisites

* [Docker](https://www.docker.com/products/docker-desktop)

## Installation

1. Download and install [Docker](https://www.docker.com/products/docker-desktop) on your machine
2. Clone this [openmrs-esm-ohri-distro-dev]() and enter the newly-created folder
```sh
git clone <repo> && cd openmrs-esm-ohri-distro-dev`
```
## Running Docker Image
The docker image can be used in two ways: static or dynamic. In the static mode, you will get to test the ESM without being able to make changes to its source code. In the dynamic mode, you will be able to change files on the `src` directory and seee the changes reflected on the webpage.

**Static: view-only**:
```sh
npm run docker
```

**Dynamic: live-reload**:
```sh
npm run docker:dev
```

Next, on your web browser, go to `localhost:8080/openmrs/spa`.

