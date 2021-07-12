import React from 'react';
import { Tabs, Tab } from 'carbon-components-react';

function HTSPatientTabs() {
  return (
    <div>
      <Tabs scrollIntoView={false} type="container">
        <Tab href="#" id="tab-1" label="Tab label 1">
          <div className="some-content">Content for first tab goes here.</div>
        </Tab>
        <Tab href="#" id="tab-1" label="Tab label 1">
          <div className="some-content">Content for second tab goes here.</div>
        </Tab>
        <Tab href="#" id="tab-1" label="Tab label 1">
          <div className="some-content">Content for third tab goes here.</div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default HTSPatientTabs;
