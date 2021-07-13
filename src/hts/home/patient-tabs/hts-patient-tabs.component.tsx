import React from 'react';
import { Tabs, Tab } from 'carbon-components-react';

function HTSPatientTabs() {
  return (
    <Tabs type="container">
      <Tab id="tab-1" label="Tab label 1">
        <p>Content for first tab goes here.</p>
      </Tab>
      <Tab id="tab-2" label="Tab label 2">
        <p>Content for second tab goes here.</p>
      </Tab>
      <Tab id="tab-3" label="Tab label 3 shows truncation" title="Tab label 3 shows truncation">
        <p>Content for third tab goes here.</p>
      </Tab>
      <Tab label={<div>Custom Label</div>}>
        <p>Content for fourth tab goes here.</p>
      </Tab>
    </Tabs>
  );
}

export default HTSPatientTabs;
