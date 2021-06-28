import React from 'react';

export const OHRILabel: React.FC<{ value: string }> = ({ value }) => {
  return (
    <div>
      <span className="bx--label">{value}</span>
    </div>
  );
};
