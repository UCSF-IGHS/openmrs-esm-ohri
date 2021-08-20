import React from 'react';

export const OHRILabel: React.FC<{ value: string }> = ({ value }) => {
  return (
    <div style={{ width: 'auto !important' }}>
      <span className="bx--label">{value}</span>
    </div>
  );
};
