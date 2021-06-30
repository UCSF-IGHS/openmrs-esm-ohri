import React, { useState } from 'react';

import styles from './patient-list.scss';
import Button from 'carbon-components-react/es/components/Button';
import { Add16 } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next';
import OTable from '../../components/data-table/o-table.component';
import { attach, openmrsFetch, switchTo, age } from '@openmrs/esm-framework';
import { DataTableSkeleton } from 'carbon-components-react';
import EmptyState from '../../components/empty-state/empty-state.component';
import { launchOHRIWorkSpace } from '../../workspace/ohri-workspace-utils';
import HTSRestroForm from '../../forms/test-forms/hts_retrospective_form-schema';
import moment from 'moment';
import { capitalize } from 'lodash';
import dayjs from 'dayjs';

interface HtsOverviewListProps {
  patientUuid: string;
}

const PatientList: React.FC<HtsOverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const [tableRows, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const rowCount = 5;

  const forceComponentUpdate = () => setCounter(counter + 1);
  const launchHTSForm = () => {
    launchOHRIWorkSpace('ohri-forms-view-ext', {
      title: 'HTS Entry form',
      state: { updateParent: forceComponentUpdate, formJson: HTSRestroForm },
    });
  };
  const tableHeaders = [
    { key: 'name', header: 'Name' },
    { key: 'gender', header: 'Gender' },
    { key: 'age', header: 'Age' },
    { key: 'last_visit', header: 'Last Visit', isSortable: true },
  ];

  function getPatients() {
    return openmrsFetch(`/ws/fhir2/R4/Patient`).then(({ data }) => {
      let rows = [];
      data.entry.map(patient => {
        const patientName = () => {
          return `${patient.resource.name[0].given.join(' ')} ${patient.resource.name[0].family}`;
        };
        rows.push({
          // name: patient.fullUrl,
          name: patient.resource.name[0].family,
          gender: capitalize(patient.resource.gender),
          age: age(patient.resource.birthDate),
          // last_visit: moment(patient.encounterDatetime).format('DD-MMM-YYYY'),
          last_visit: '',
        });
      });

      setTableRows(rows);
      setIsLoading(false);
    });
  }
  React.useEffect(() => {
    getPatients();
  }, [counter]);

  const headerTitle = 'Patient List';

  return (
    <>
      {isLoading ? (
        <DataTableSkeleton rowCount={rowCount} />
      ) : tableRows.length > 0 ? (
        <div className={styles.widgetContainer}>
          <div className={styles.widgetHeaderContainer}>
            <h4 className={`${styles.productiveHeading03} ${styles.text02}`}>{headerTitle}</h4>
            <div className={styles.toggleButtons}>
              <Button
                kind="ghost"
                renderIcon={Add16}
                iconDescription="New"
                onClick={e => {
                  e.preventDefault();
                  // todo Add New Patient
                }}>
                {t('add', 'New')}
              </Button>
            </div>
          </div>
          <OTable tableHeaders={tableHeaders} tableRows={tableRows} />
        </div>
      ) : (
        <EmptyState
          displayText={t('patientList', 'patient list')}
          headerTitle={headerTitle}
          // launchForm={launchHTSForm}
        />
      )}
    </>
  );
};

export default PatientList;
