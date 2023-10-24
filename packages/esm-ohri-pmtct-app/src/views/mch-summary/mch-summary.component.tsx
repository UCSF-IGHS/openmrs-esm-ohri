import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, Tab, TabList, TabPanels, TabPanel, DataTableSkeleton } from '@carbon/react';
import styles from '../common.scss';
import { PatientChartProps } from '@ohri/openmrs-esm-ohri-commons-lib';
import CurrentPregnancy from './tabs/current-pregnancy.component';
import HivExposedInfant from './tabs/hiv-exposed-infant.component';
import { usePatient } from '@openmrs/esm-framework';
import moment from 'moment';

const MaternalSummary: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { patient, isLoading } = usePatient(patientUuid);
  const dob = patient?.birthDate;
  const age = moment().diff(patient?.birthDate, 'years');
  const gender = patient?.gender;

  return (
    <>
      {isLoading ? (
        <DataTableSkeleton rowCount={5} />
      ) : (
        <div className={styles.tabContainer}>
          {age > 10 ? (
            gender === 'female' ? (
            <Tabs>
              <TabList contained>
                <Tab>{t('recentPregnancy', 'Recent Pregnancy')}</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <CurrentPregnancy patientUuid={patientUuid} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          ) : (
          null // Don't render anything for male >10
           )
          ) : (
            <Tabs>
              <TabList contained>
                <Tab>{t('hivExposedInfant', 'HIV Exposed Infant')}</Tab>
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
