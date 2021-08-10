import React from 'react';
import { ExtensionSlot } from '@openmrs/esm-framework';
import { Grid } from 'carbon-components-react';
import styles from './form-render.scss';

function FormRenderTest() {
  return (
    <div className={styles.container}>
      <Grid className={styles.mainWrapper}>
        <ExtensionSlot extensionSlotName={FormJsonInput} />
        <ExtensionSlot extensionSlotName={FormRenderDisplay} />
      </Grid>
    </div>
  );
}

export default FormRenderTest;
export const FormJsonInput = 'form-render-json-slot';
export const FormRenderDisplay = 'form-render-view-slot';
