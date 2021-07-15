import React from 'react';
import { ExtensionSlot } from '@openmrs/esm-framework';
import { Grid } from 'carbon-components-react';
import styles from './ohri-home.scss';

function OhriHome() {
  return (
    <Grid className={styles.mainWrapper}>
      <ExtensionSlot extensionSlotName={OHRIHomeHeaderSlot} />
      <ExtensionSlot extensionSlotName={OHRIHomeTileSlot} />
      <ExtensionSlot extensionSlotName={OHRIHomeTabSlot} />
    </Grid>
  );
}

export default OhriHome;
export const OHRIHomeHeaderSlot = 'hts-home-header-slot';
export const OHRIHomeTileSlot = 'hts-home-tiles-slot';
export const OHRIHomeTabSlot = 'hts-home-tabs-slot';
