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
import { Button, OverflowMenu, OverflowMenuItem } from 'carbon-components-react';
import { dateOfEncounterConcept, encounterRepresentation } from '../../constants';
import moment from 'moment';
import { Add16 } from '@carbon/icons-react';

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
export function getEncounterValues(encounter, param: string, isDate?: Boolean) {
  if (isDate) return moment(encounter[param]).format('DD-MMM-YYYY');
  else return encounter[param] ? encounter[param] : '--';
}

export function getObsFromEncounter(encounter, obsConcept, isDate?: Boolean, isTrueFalseConcept?: Boolean) {
  const obs = encounter?.obs.find(observation => observation.concept.uuid === obsConcept);

  if (!obs) {
    return '--';
  }

  if (isDate) {
    return moment(obs.value).format('DD-MMM-YYYY');
  }

  if (isTrueFalseConcept) {
    return obs.value ? 'Yes' : 'No';
  }

  if (typeof obs.value === 'object') {
    return obs.value.name.name;
  }
  return obs.value;
}

const EncounterList: React.FC<EncounterListProps> = ({
  patientUuid,
  encounterUuid,
  form,
  columns,
  headerTitle,
  description,
}) => {
  const { t } = useTranslation();
  const [tableRows, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [encounterForm, setEncounterForm] = useState(getForm(form.package, form.name));

  const editEncounter = encounterUuid => {
    launchOHRIWorkSpace('ohri-forms-view-ext', {
      title: encounterForm.name,
      screenSize: 'maximize',
      encounterUuid: encounterUuid,
      state: { updateParent: forceComponentUpdate, formJson: encounterForm },
    });
  };
  const viewEncounter = encounterUuid => {
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
          const row = { id: encounter.uuid };
          columns.forEach(column => {
            row[column.key] = column.getValue(encounter);
          });
          row['actions'] = (
            <OverflowMenu flipped className={styles.flippedOverflowMenu}>
              <OverflowMenuItem
                itemText={t('viewEncounter', 'View')}
                onClick={e => {
                  e.preventDefault();
                  viewEncounter(encounter.uuid);
                }}
              />
              <OverflowMenuItem
                itemText={t('editEncounter', 'Edit')}
                onClick={e => {
                  e.preventDefault();
                  editEncounter(encounter.uuid);
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

  const formLauncher = useMemo(() => {
    if (encounterForm.availableIntents && encounterForm.availableIntents.length > 0) {
      return (
        <OHRIFormLauncherWithIntent
          formJson={encounterForm}
          launchForm={launchEncounterForm}
          onChangeIntent={encounterForm}
        />
      );
    }
    return (
      <Button
        kind="ghost"
        renderIcon={Add16}
        iconDescription="Add "
        onClick={e => {
          e.preventDefault();
          launchEncounterForm();
        }}>
        {t('Add')}
      </Button>
    );
  }, [encounterForm, launchEncounterForm]);

  useEffect(() => {
    loadRows(encounterUuid);
  }, [counter]);

  return (
    <>
      {isLoading ? (
        <DataTableSkeleton rowCount={5} />
      ) : tableRows.length > 0 ? (
        <>
          <div className={styles.widgetContainer}>
            <div className={styles.widgetHeaderContainer}>
              <h4 className={`${styles.productiveHeading03} ${styles.text02}`}>{headerTitle}</h4>
              <div className={styles.toggleButtons}>{formLauncher}</div>
            </div>
            <OTable tableHeaders={headers} tableRows={tableRows} />
          </div>
        </>
      ) : (
        <EmptyState
          displayText={description}
          headerTitle={headerTitle}
          launchForm={launchEncounterForm}
          launchFormComponent={formLauncher}
        />
      )}
    </>
  );
};

export default EncounterList;
