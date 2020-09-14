import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import { ExtensionSlotReact } from '@openmrs/esm-extension-manager';

const { bootstrap, mount, unmount } = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: () => {
    return (
      <main className="omrs-main-content">
        <ExtensionSlotReact extensionSlotName="patientChartWidgets" />
      </main>
    );
  },
});

export { bootstrap, mount, unmount };
