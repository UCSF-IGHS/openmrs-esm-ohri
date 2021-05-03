import React from 'react';
import { TextInput } from 'carbon-components-react';

const OHRITextObs: React.FC<{ id: string; label: string }> = ({ id, label }) => {
  return (
    <div>
      <TextInput id={id} labelText={label} />
    </div>
  );
};

export default OHRITextObs;
