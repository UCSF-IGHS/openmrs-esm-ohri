import { navigate, openmrsFetch } from '@openmrs/esm-framework';
import DataTableSkeleton from 'carbon-components-react/lib/components/DataTableSkeleton';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '../empty-state/empty-state.component';
import { OHRIFormLauncherWithIntent } from '../ohri-form-launcher/ohri-form-launcher.component';
import styles from './encounter-list.scss';
import { OTable } from '../data-table/o-table.component';
import { Button, Link, OverflowMenu, OverflowMenuItem, Pagination } from 'carbon-components-react';
import { encounterRepresentation } from '../../constants';
import moment from 'moment';
import { Add16 } from '@carbon/icons-react';
import {
  launchForm,
  launchFormInEditMode,
  launchFormInViewMode,
  launchFormWithCustomTitle,
} from '../../utils/ohri-forms-commons';
import { getForm, applyFormIntent, updateExcludeIntentBehaviour } from 'openmrs-ohri-form-engine-lib';

export interface EncounterListColumn {
  key: string;
  header: string;
  getValue: (encounter: any) => string;
  link?: any;
}

export interface EncounterListProps {
  patientUuid: string;
  encounterUuid: string;
  form?: { package: string; name: string; view?: string };
  columns: Array<any>;
  headerTitle: string;
  description: string;
  dropdownText?: string;
  hideFormLauncher?: boolean;
  forms?: Array<{
    package: string;
    name: string;
    view?: string;
    excludedIntents?: Array<string>;
    fixedIntent?: string;
  }>;
  filter?: (encounter: any) => boolean;
}

export function getEncounterValues(encounter, param: string, isDate?: Boolean) {
  if (isDate) return moment(encounter[param]).format('DD-MMM-YYYY');
  else return encounter[param] ? encounter[param] : '--';
}

export function formatDateTime(dateString: string): any {
  const format = 'YYYY-MM-DDTHH:mm:ss';
  if (dateString.includes('.')) {
    dateString = dateString.split('.')[0];
  }
  return moment(dateString, format, true).toDate();
}

function obsArrayDateComparator(left, right) {
  return formatDateTime(right.obsDatetime) - formatDateTime(left.obsDatetime);
}

export function findObs(encounter, obsConcept): Record<string, any> {
  const allObs = encounter?.obs?.filter(observation => observation.concept.uuid === obsConcept) || [];
  return allObs?.length == 1 ? allObs[0] : allObs?.sort(obsArrayDateComparator)[0];
}

export function getObsFromEncounters(encounters, obsConcept) {
  const filteredEnc = encounters?.find(enc => enc.obs.find(obs => obs.concept.uuid === obsConcept));
  return getObsFromEncounter(filteredEnc, obsConcept);
}

export function getObsFromEncounter(encounter, obsConcept, isDate?: Boolean, isTrueFalseConcept?: Boolean) {
  const obs = findObs(encounter, obsConcept);

  if (isTrueFalseConcept) {
    return obs ? 'Yes' : 'No';
  }
  if (!obs) {
    return '--';
  }
  if (isDate) {
    return moment(obs.value).format('DD-MMM-YYYY');
  }
  if (typeof obs.value === 'object') {
    return obs.value.names?.find(conceptName => conceptName.conceptNameType === 'SHORT')?.name || obs.value.name.name;
  }
  return obs.value;
}

export const EncounterList: React.FC<EncounterListProps> = ({
  patientUuid,
  encounterUuid,
  form,
  columns,
  headerTitle,
  description,
  dropdownText,
  hideFormLauncher,
  forms,
  filter,
}) => {
  const { t } = useTranslation();
  const [allRows, setAllRows] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [encounterForm, setEncounterForm] = useState(getForm(form.package, form.name));
  const [isDead, setIsDead] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  dropdownText = dropdownText ? 'Add' : 'New';
  hideFormLauncher = hideFormLauncher || false;

  if (isDead) {
    hideFormLauncher = isDead;
  }

  const editEncounter = encounterUuid => {
    launchFormInEditMode(applyFormIntent('', encounterForm), encounterUuid, forceComponentUpdate);
  };
  const viewEncounter = encounterUuid => {
    launchFormInViewMode(
      form.view ? getForm(form.package, form.view) : encounterForm,
      encounterUuid,
      forceComponentUpdate,
    );
  };

  const checkDeathStatus = () => {
    openmrsFetch(`/ws/rest/v1/person/${patientUuid}`).then(({ data }) => {
      if (data.dead) {
        setIsDead(true);
      }
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

  useEffect(() => {
    checkDeathStatus();
  });

  const loadRows = useCallback(
    encounterType => {
      setIsLoading(true);
      const query = `encounterType=${encounterType}&patient=${patientUuid}`;
      openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${encounterRepresentation}`).then(({ data }) => {
        if (data.results?.length > 0) {
          let sortedEncounters = data.results.sort(
            (firstEncounter, secondEncounter) =>
              new Date(secondEncounter.encounterDatetime).getTime() -
              new Date(firstEncounter.encounterDatetime).getTime(),
          );

          if (filter) {
            sortedEncounters = sortedEncounters.filter(encounter => filter(encounter));
          }
          setAllRows(sortedEncounters);
          updateTable(sortedEncounters, 0, pageSize);
        } else {
          setAllRows([]);
        }
        setIsLoading(false);
      });
    },
    [patientUuid],
  );

  const updateTable = (fullDataset, start, itemCount) => {
    let currentRows = [];

    for (let i = start; i < start + itemCount; i++) {
      if (i < fullDataset.length) {
        currentRows.push(fullDataset[i]);
      }
    }
    const rows = currentRows.map(encounter => {
      const row = { id: encounter.uuid };
      encounter['launchFormActions'] = {
        viewEncounter: () => viewEncounter(encounter.uuid),
        editEncounter: () => editEncounter(encounter.uuid),
      };
      columns.forEach(column => {
        let val = column.getValue(encounter);
        if (column.link) {
          val = (
            <Link
              onClick={e => {
                e.preventDefault();
                if (column.link.handleNavigate) {
                  column.link.handleNavigate(encounter);
                } else {
                  column.link?.getUrl && navigate({ to: column.link.getUrl() });
                }
              }}>
              {val}
            </Link>
          );
        }
        row[column.key] = val;
      });

      if (row['actions']) {
        const actionItems = row['actions'];
        row['actions'] = (
          <OverflowMenu flipped className={styles.flippedOverflowMenu}>
            {actionItems.map((actionItem, index) => (
              <OverflowMenuItem
                itemText={actionItem.label}
                onClick={e => {
                  e.preventDefault();
                  if (actionItem.mode == 'edit') {
                    launchEncounterForm(
                      applyFormIntent(actionItem.intent, getForm(actionItem.form.package, actionItem.form.name)),
                      actionItem.intent,
                      'edit',
                      actionItem.encounterUuid,
                    );
                  } else if (actionItem.mode == 'enter') {
                    launchForm(
                      applyFormIntent(actionItem.intent, getForm(actionItem.form.package, actionItem.form.name)),
                      forceComponentUpdate,
                    );
                  } else {
                    launchEncounterForm(
                      applyFormIntent(actionItem.intent, getForm(actionItem.form.package, actionItem.form.name)),
                      actionItem.intent,
                      'view',
                      actionItem.encounterUuid,
                    );
                  }
                }}
              />
            ))}
          </OverflowMenu>
        );
      } else {
        row['actions'] = (
          <OverflowMenu flipped className={styles.flippedOverflowMenu}>
            <OverflowMenuItem
              itemText={t('viewEncounter', 'View')}
              onClick={e => {
                e.preventDefault();
                launchEncounterForm(
                  form.view ? getForm(form.package, form.view) : encounterForm,
                  '*',
                  'view',
                  encounter.uuid,
                );
              }}
            />
            <OverflowMenuItem
              itemText={t('editEncounter', 'Edit')}
              onClick={e => {
                e.preventDefault();
                launchEncounterForm(
                  form.view ? getForm(form.package, form.view) : encounterForm,
                  '*',
                  'edit',
                  encounter.uuid,
                );
              }}
            />
          </OverflowMenu>
        );
      }
      return row;
    });
    setTableRows(rows);
  };
  const forceComponentUpdate = () => setCounter(counter + 1);

  const capitalize = word => word[0].toUpperCase() + word.substr(1);

  const launchEncounterForm = (form?: any, intent: string = '*', action: string = 'add', encounterUuid?: any) => {
    const launcherTitle = `${capitalize(action)} ` + (form?.name || encounterForm?.name);

    if (action === 'view') {
      launchFormWithCustomTitle(form || encounterForm, launcherTitle, 'view', encounterUuid, forceComponentUpdate);
    } else if (action === 'edit') {
      launchFormWithCustomTitle(form || encounterForm, launcherTitle, 'edit', encounterUuid, forceComponentUpdate);
    } else {
      launchFormWithCustomTitle(form || encounterForm, launcherTitle, 'enter', '', forceComponentUpdate);
    }
  };

  const formLauncher = useMemo(() => {
    let encounterForms = [];
    if (forms && forms.length > 1) {
      encounterForms = forms.map(formV => {
        let tempForm = getForm(formV.package, formV.name);
        const excludedIntents = formV.fixedIntent
          ? tempForm.availableIntents
              .filter(candidate => candidate.intent != formV.fixedIntent)
              .map(intent => intent.intent)
          : formV.excludedIntents;
        return excludedIntents.length ? updateExcludeIntentBehaviour(excludedIntents, tempForm) : tempForm;
      });

      return (
        <OHRIFormLauncherWithIntent
          launchForm={launchEncounterForm}
          dropDownText={dropdownText}
          hideFormLauncher={hideFormLauncher}
          formsJson={encounterForms}
        />
      );
    } else if (encounterForm.availableIntents && encounterForm.availableIntents.length > 0) {
      return (
        <OHRIFormLauncherWithIntent
          formJson={encounterForm}
          launchForm={launchEncounterForm}
          dropDownText={dropdownText}
          hideFormLauncher={hideFormLauncher}
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
        {dropdownText}
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
      ) : allRows.length > 0 ? (
        <>
          <div className={styles.widgetContainer}>
            <div className={styles.widgetHeaderContainer}>
              <h4 className={`${styles.productiveHeading03} ${styles.text02}`}>{headerTitle}</h4>
              {!hideFormLauncher && <div className={styles.toggleButtons}>{formLauncher}</div>}
            </div>
            <OTable tableHeaders={headers} tableRows={tableRows} />
            <Pagination
              page={page}
              pageSize={pageSize}
              pageSizes={[10, 20, 30, 40, 50]}
              totalItems={allRows.length}
              onChange={({ page, pageSize }) => {
                let startOffset = (page - 1) * pageSize;
                updateTable(allRows, startOffset, pageSize);
                setPage(page);
                setPageSize(pageSize);
              }}
            />
          </div>
        </>
      ) : (
        <EmptyState
          displayText={description}
          headerTitle={headerTitle}
          launchForm={launchEncounterForm}
          launchFormComponent={formLauncher}
          hideFormLauncher
        />
      )}
    </>
  );
};
