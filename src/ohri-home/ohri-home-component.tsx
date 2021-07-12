import React from 'react';
import { ExtensionSlot } from '@openmrs/esm-framework';
import { Grid, Row } from 'carbon-components-react';

function OhriHome() {
  return (
    <Grid>
      <Row>
        <ExtensionSlot extensionSlotName={OHRIHomeHeaderSlot} />
      </Row>
      {/* <Row> */}
      <ExtensionSlot extensionSlotName={OHRIHomeTileSlot} />
      {/* </Row> */}
      <Row>
        <ExtensionSlot extensionSlotName={OHRIHomeTabSlot} />
      </Row>
    </Grid>
  );
}

export default OhriHome;
export const OHRIHomeHeaderSlot = 'hts-home-header-slot';
export const OHRIHomeTileSlot = 'hts-home-tiles-slot';
export const OHRIHomeTabSlot = 'hts-home-tabs-slot';
