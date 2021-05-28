import React from 'react';
import { OHRIFormField } from '../../../types';
import { Select, SelectItem, SelectItemGroup } from 'carbon-components-react';

const OHRISelectObs: React.FC<{ questions: OHRIFormField }> = ({ questions }) => {
  return (
    <div>
      <Select id="s" defaultValue="Select Value" helperText="Kindly select Value">
        <SelectItem text="Choose an option" value="placeholder-item" />

        <SelectItem text="Option 1" value="option-1" />
        <SelectItem text="Option 2" value="option-2" />

        <SelectItem text="Option 3" value="option-3" />
        <SelectItem text="Option 4" value="option-4" />
      </Select>
    </div>
  );
};

export default OHRISelectObs;
