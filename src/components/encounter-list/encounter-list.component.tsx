import { openmrsFetch } from '@openmrs/esm-framework';
import DataTableSkeleton from 'carbon-components-react/lib/components/DataTableSkeleton';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../empty-state/empty-state.component';
import { launchOHRIWorkSpace } from '../../workspace/ohri-workspace-utils';
import { getForm } from '../../utils/forms-loader';
import { OHRIFormLauncherWithIntent } from '../ohri-form-launcher/ohri-form-laucher.componet';
import styles from '../../hts/care-and-treatment/service-enrolment/service-enrolment-list.scss';
import OTable from '../data-table/o-table.component';
import { OverflowMenu, OverflowMenuItem } from 'carbon-components-react';
import { clinicalVisitEncounterType, encounterRepresentation, visitTypeConcept } from '../../constants';

export interface EncounterListColumn {
  key: string;
  header: string;
  getValue: (encounter: any) => string;
}

export interface EncounterListProps {
  patientUuid: string;
  encounterUuid: string;
  form?: { package: string; name: string };
  columns: Array<any>;
  headerTitle: string;
  description: string;
}

const EncounterList: React.FC<EncounterListProps> = ({ patientUuid, form, columns, headerTitle, description }) => {
  const { t } = useTranslation();
  const [tableRows, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [encounterForm, setEncounterForm] = useState(getForm(form.package, form.name));

  const editServiceEnrolmentEncounter = encounterUuid => {
    launchOHRIWorkSpace('ohri-forms-view-ext', {
      title: encounterForm.name,
      screenSize: 'maximize',
      encounterUuid: encounterUuid,
      state: { updateParent: forceComponentUpdate, formJson: encounterForm },
    });
  };
  const viewHTSEncounter = encounterUuid => {
    launchOHRIWorkSpace('ohri-forms-view-ext', {
      title: encounterForm.name,
      screenSize: 'maximize',
      encounterUuid: encounterUuid,
      mode: 'view',
      state: { updateParent: forceComponentUpdate, formJson: encounterForm },
    });
  };

  const headers = useMemo(() => {
    if (columns) {
      return columns.map(column => {
        return { key: column.key, header: column.header };
      });
    }
    return [];
  }, [columns]);

  const loadRows = useCallback(
    encounterType => {
      const query = `encounterType=${encounterType}&patient=${patientUuid}`;

      openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${encounterRepresentation}`).then(({ data }) => {
        const rows = data.results.map(encounter => {
          const row = {};
          columns.forEach(column => {
            row[column.key] = column.getValue(encounter);
          });
          row['actions'] = (
            <OverflowMenu flipped className={styles.flippedOverflowMenu}>
              <OverflowMenuItem
                itemText={t('viewHTSEncounter', 'View')}
                onClick={e => {
                  e.preventDefault();
                  viewHTSEncounter(encounter.uuid);
                }}
              />
              <OverflowMenuItem
                itemText={t('editServiceEnrolmentEncounter', 'Edit')}
                onClick={e => {
                  e.preventDefault();
                  editServiceEnrolmentEncounter(encounter.uuid);
                }}
              />
            </OverflowMenu>
          );
          return row;
        });
        setTableRows(rows);
        setIsLoading(false);
      });
    },
    [patientUuid],
  );

  const forceComponentUpdate = () => setCounter(counter + 1);

  const launchEncounterForm = (form?: any) => {
    launchOHRIWorkSpace('ohri-forms-view-ext', {
      title: encounterForm?.name,
      screenSize: 'maximize',
      state: { updateParent: forceComponentUpdate, formJson: form || encounterForm },
    });
  };

  useEffect(() => {
    loadRows(clinicalVisitEncounterType);
  }, [loadRows]);

  return (
    <>
      {isLoading ? (
        <DataTableSkeleton rowCount={5} />
      ) : tableRows.length > 0 ? (
        <>
          <div className={styles.widgetContainer}>
            <div className={styles.widgetHeaderContainer}>
              <h4 className={`${styles.productiveHeading03} ${styles.text02}`}>{headerTitle}</h4>
              <div className={styles.toggleButtons}>
                <OHRIFormLauncherWithIntent
                  formJson={encounterForm}
                  launchForm={launchEncounterForm}
                  onChangeIntent={encounterForm}
                />
              </div>
            </div>
            <OTable tableHeaders={headers} tableRows={tableRows} />
          </div>
        </>
      ) : (
        <EmptyState
          displayText={description}
          headerTitle={headerTitle}
          launchForm={launchEncounterForm}
          launchFormComponent={
            <OHRIFormLauncherWithIntent
              formJson={encounterForm}
              launchForm={launchEncounterForm}
              onChangeIntent={encounterForm}
            />
          }
        />
      )}
    </>
  );
};

export default EncounterList;
