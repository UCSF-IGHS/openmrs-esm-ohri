import React from 'react';
import { Tag } from '@carbon/react';
import { getObsFromEncounter, findObs } from './encounter-list-utils';

export const renderTag = (encounter, concept, statusColorMap) => {
  const columnStatus = getObsFromEncounter(encounter, concept);
  const columnStatusObs = findObs(encounter, concept);
  if (columnStatus == '--') {
    return '--';
  } else {
    return (
      <Tag type={statusColorMap[columnStatusObs?.value?.uuid]} title={columnStatus} style={{ minWidth: '80px' }}>
        {columnStatus}
      </Tag>
    );
  }
};
