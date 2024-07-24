import React from 'react';
import { useConfig } from '@openmrs/esm-framework';

export function ConditionalNavLinkRenderer({ children, conditionalConfigKey }) {
  const config = useConfig();

  if (conditionalConfigKey) {
    return <>{config[conditionalConfigKey] ? children : null}</>;
  }
  return <>{children}</>;
}

export default ConditionalNavLinkRenderer;
