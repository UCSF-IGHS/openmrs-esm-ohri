import { useVisit } from '@openmrs/esm-framework';
import { Tag } from 'carbon-components-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchPatientCovidOutcome } from '../../api/api';

const PatientCovidOutcomesBannerTag = ({ patientUuid }) => {
  // const { currentVisit } = useVisit(patientUuid);
  const { t } = useTranslation();
  const [isCovidOutComeLoaded, setIsCovidOutcomeLoaded] = useState(false);
  const possibleOutcomes = {
    active: {
      translationKey: 'covidOutcomeActive',
      description: 'COVID: Active',
    },
    unknown: {
      translationKey: 'covidOutcomeUnknown',
      description: 'COVID: Unknown Status',
    },
    recovered: {
      transalationKey: 'covidOutComeRecovered',
      description: 'COVID: Recovered',
    },
  };

  const [covidOutcome, setCovidOutcome] = useState(possibleOutcomes.unknown);
  
  return <>{isCovidOutComeLoaded && <Tag type="purple"> {t('covidOutcomeUnknown', 'Unknown Covid Statuts')} </Tag>}</>;
};

export default PatientCovidOutcomesBannerTag;
