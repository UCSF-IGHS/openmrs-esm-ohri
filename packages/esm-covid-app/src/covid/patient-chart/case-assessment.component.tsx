import React from 'react';
import { useConfig } from '@openmrs/esm-framework';
import { EncounterList, getMenuItemTabConfiguration } from '@ohri/openmrs-esm-ohri-commons-lib';
import caseAssessmentSchemaConfig from './case-assessment-schema-config.json';

interface CovidAssessmentWidgetProps {
  patientUuid: string;
}

const CovidAssessment: React.FC<CovidAssessmentWidgetProps> = ({ patientUuid }) => {
  const config = useConfig();
  const tabs = getMenuItemTabConfiguration(caseAssessmentSchemaConfig, config);

  return (
    <>
      {tabs.map((tab) => (
        <EncounterList
          patientUuid={patientUuid}
          encounterType={tab.encounterType}
          formList={tab.formList}
          columns={tab.columns}
          description={tab.description}
          headerTitle={tab.headerTitle}
          launchOptions={tab.launchOptions}
        />
      ))}
    </>
  );
};

export default CovidAssessment;
