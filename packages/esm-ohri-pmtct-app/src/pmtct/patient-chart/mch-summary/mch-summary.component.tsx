import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, Tab, TabList, TabPanels, TabPanel, DataTableSkeleton } from '@carbon/react';
import type { PatientChartProps } from '@ohri/openmrs-esm-ohri-commons-lib';
import CurrentPregnancy from './tabs/current-pregnancy.component';
import HivExposedInfant from './tabs/hiv-exposed-infant.component';
import { usePatient, useConfig } from '@openmrs/esm-framework';
import dayjs from 'dayjs';
import styles from '../common.scss';

const MaternalSummary: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { identifiersTypes, showRecentPregnancy, showHivExposedInfantSummary } = useConfig();
  const { patient, isLoading } = usePatient(patientUuid);
  const dob = patient?.birthDate;
  const age = useMemo(() => dayjs().diff(dayjs(patient?.birthDate), 'year'), [patient?.birthDate]);
  const [pTrackerId, setPtrackerId] = useState('');

  useEffect(() => {
    if (patient) {
      const reversedIdentifiers = patient.identifier.slice().reverse();
      const pTrackerIdentifier = reversedIdentifiers.find((identifier) => {
        return identifier.type.coding[0].code === identifiersTypes.ptrackerIdentifierType;
      });

      if (pTrackerIdentifier) {
        setPtrackerId(pTrackerIdentifier.value);
      }
    }
  }, [identifiersTypes.ptrackerIdentifierType, patient]);

  return (
    <>
      {isLoading ? (
        <DataTableSkeleton rowCount={5} />
      ) : (
        <div className={styles.tabContainer}>
          {age > 10 ? (
            <Tabs>
              <TabList contained>
                {showRecentPregnancy && <Tab>{t('recentPregnancy', 'Recent Pregnancy')}</Tab>}
              </TabList>
              <TabPanels>
                <TabPanel>
                  <CurrentPregnancy patientUuid={patientUuid} pTrackerId={pTrackerId} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          ) : (
            <Tabs>
              <TabList contained>
                {showHivExposedInfantSummary && <Tab>{t('hivExposedInfant', 'HIV Exposed Infant')}</Tab>}
              </TabList>
              <TabPanels>
                <TabPanel>
                  <HivExposedInfant patientUuid={patientUuid} dateOfBirth={dob} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
        </div>
      )}
    </>
  );
};

export default MaternalSummary;
