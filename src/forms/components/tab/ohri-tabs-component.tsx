import React from 'react';
import { Tabs, Tab, Row } from 'carbon-components-react';

function OHRIPatientTabs() {
  return (
    <Row>
      <Tabs type="container">
        <Tab id="tab-1" label="Waiting for pre-test counselling">
          <p>Content for first tab goes here.</p>
        </Tab>
        <Tab id="tab-2" label="Waiting for HIV test">
          <p>Content for second tab goes here.</p>
        </Tab>
        <Tab id="tab-3" label="Waiting for post-test counselling" title="Tab label 3 shows truncation">
          <p>Content for third tab goes here.</p>
        </Tab>
        <Tab label={<div>Custom Label</div>}>
          <p>Content for fourth tab goes here.</p>
        </Tab>
      </Tabs>
    </Row>
  );
}

export default OHRIPatientTabs;
