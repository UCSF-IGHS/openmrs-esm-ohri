import React from 'react';

export const OHRILabel: React.FC<{ value: string }> = ({ value }) => {
  return (
    <div style={{ width: '50% !important' }}>
      <span className="bx--label">{value}</span>
    </div>
  );
};
