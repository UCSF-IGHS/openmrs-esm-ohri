import { navigate } from '@openmrs/esm-framework';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '../empty-state/empty-state.component';
import { OHRIFormLauncherWithIntent } from '../ohri-form-launcher/ohri-form-launcher.component';
import styles from './encounter-list.scss';
import { OTable } from '../data-table/o-table.component';
import { Button, Link, OverflowMenu, OverflowMenuItem, Pagination, DataTableSkeleton } from '@carbon/react';
import { Add } from '@carbon/react/icons';
import { OHRIFormSchema, loadFormJson } from '@openmrs/openmrs-form-engine-lib';
import { launchEncounterForm } from './helpers';
import { useEncounterRows } from '../../hooks/useEncounterRows';
import { OpenmrsEncounter } from '../../api/types';
import { fetchDeathStatus } from '../../api/api';

export interface EncounterListColumn {
  key: string;
  header: string;
  getValue: (encounter: any) => string;
  link?: any;
}

export interface EncounterListProps {
  patientUuid: string;
  encounterType: string;
  columns: Array<any>;
  headerTitle: string;
  description: string;
  formList?: Array<{
    name: string;
    excludedIntents?: Array<string>;
    fixedIntent?: string;
    isDefault?: boolean;
  }>;
  launchOptions: {
    hideFormLauncher?: boolean;
    moduleName: string;
    displayText?: string;
  };
  filter?: (encounter: any) => boolean;
}

export const EncounterList: React.FC<EncounterListProps> = ({
  patientUuid,
  encounterType,
  columns,
  headerTitle,
  description,
  formList,
  filter,
  launchOptions,
}) => {
  const { t } = useTranslation();
  const [paginatedRows, setPaginatedRows] = useState([]);
  const [forms, setForms] = useState<OHRIFormSchema[]>([]);
  const [isDead, setIsDead] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoadingForms, setIsLoadingForms] = useState(true);
  const {
    encounters,
    isLoading: isLoadingEncounters,
    isValidating: isValidatingEncounters,
  } = useEncounterRows(patientUuid, encounterType, filter);

  const defaultActions = useMemo(
    () => [
      {
        label: t('viewEncounter', 'View'),
        form: {
          name: forms[0]?.name,
        },
        mode: 'view',
        intent: '*',
      },
      {
        label: t('editEncounter', 'Edit'),
        form: {
          name: forms[0]?.name,
        },
        mode: 'view',
        intent: '*',
      },
    ],
    [forms, t],
  );

  useEffect(() => {
    // load forms
    Promise.all(
      formList.map(async (formDescriptor) => {
        const formJson = await loadFormJson(formDescriptor.name, null, null);
        // handle excluded intents
        if (formDescriptor.excludedIntents?.length) {
          formJson['availableIntents'] = formJson['availableIntents'].filter(
            (intentEntry) => !formDescriptor.excludedIntents.includes(intentEntry.intent),
          );
        }
        // handle fixed intent
        if (formDescriptor.fixedIntent) {
          formJson['availableIntents'] = formJson['availableIntents'].filter(
            (intentEntry) => intentEntry.intent == formDescriptor.fixedIntent,
          );
        }
        return formJson;
      }),
    ).then((formsListResponse) => {
      setForms(formsListResponse);
      setIsLoadingForms(false);
    });
    // fetch death status
    // TODO: Do we need to do this fetch considering that we are on the patient chart?
    fetchDeathStatus(patientUuid).then((isDead) => setIsDead(isDead));
  }, [formList, patientUuid]);

  const headers = useMemo(() => {
    if (columns) {
      return columns.map((column) => {
        return { key: column.key, header: column.header };
      });
    }
    return [];
  }, [columns]);

  const constructPaginatedTableRows = useCallback(
    (encounters: OpenmrsEncounter[], currentPage: number, pageSize: number) => {
      const startIndex = (currentPage - 1) * pageSize;
      const paginatedEncounters = [];
      for (let i = startIndex; i < startIndex + pageSize; i++) {
        if (i < encounters.length) {
          paginatedEncounters.push(encounters[i]);
        }
      }
      const rows = paginatedEncounters.map((encounter) => {
        const tableRow: { id: string; actions: any } = { id: encounter.uuid, actions: null };
        // inject launch actions
        encounter['launchFormActions'] = {
          editEncounter: () => launchEncounterForm(forms[0], launchOptions.moduleName, 'edit', null, encounter.uuid),
          viewEncounter: () => launchEncounterForm(forms[0], launchOptions.moduleName, 'view', null, encounter.uuid),
        };
        // process columns
        columns.forEach((column) => {
          let val = column.getValue(encounter);
          if (column.link) {
            val = (
              <Link
                onClick={(e) => {
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
          tableRow[column.key] = val;
        });
        // If custom config is available, generate actions accordingly; otherwise, fallback to the default actions.
        const actions = tableRow.actions?.length ? tableRow.actions : defaultActions;
        tableRow['actions'] = (
          <OverflowMenu flipped className={styles.flippedOverflowMenu}>
            {actions.map((actionItem, index) => (
              <OverflowMenuItem
                itemText={actionItem.label}
                onClick={(e) => {
                  e.preventDefault();
                  launchEncounterForm(
                    forms.find((form) => form.name == actionItem?.form?.name),
                    launchOptions.moduleName,
                    actionItem.mode == 'enter' ? 'add' : actionItem.mode,
                    null,
                    encounter.uuid,
                    actionItem.intent,
                  );
                }}
              />
            ))}
          </OverflowMenu>
        );
        return tableRow;
      });
      setPaginatedRows(rows);
    },
    [columns, defaultActions, forms, launchOptions],
  );

  useEffect(() => {
    if (encounters?.length) {
      constructPaginatedTableRows(encounters, currentPage, pageSize);
    }
  }, [encounters, pageSize, constructPaginatedTableRows, currentPage]);

  const formLauncher = useMemo(() => {
    if (forms.length == 1 && !forms[0]['availableIntents']?.length) {
      // we only have one form with no intents
      // just return the "Add" button
      return (
        <Button
          kind="ghost"
          renderIcon={Add}
          iconDescription="Add "
          onClick={(e) => {
            e.preventDefault();
            launchEncounterForm(forms[0], launchOptions.moduleName);
          }}>
          {launchOptions.displayText}
        </Button>
      );
    } else if (forms.length > 1) {
      return (
        <OHRIFormLauncherWithIntent
          formList={forms}
          launchForm={launchEncounterForm}
          title={launchOptions.displayText}
          hideFormLauncher={launchOptions.hideFormLauncher ?? isDead}
        />
      );
    }
  }, [forms, launchOptions, isDead]);

  return (
    <>
      {isLoadingEncounters || isLoadingForms ? (
        <DataTableSkeleton rowCount={5} />
      ) : encounters.length > 0 ? (
        <>
          <div className={styles.widgetContainer}>
            <div className={styles.widgetHeaderContainer}>
              <h4 className={`${styles.productiveHeading03} ${styles.text02}`}>{headerTitle}</h4>
              {!(launchOptions.hideFormLauncher ?? isDead) && (
                <div className={styles.toggleButtons}>{formLauncher}</div>
              )}
            </div>
            <OTable tableHeaders={headers} tableRows={paginatedRows} />
            <Pagination
              page={currentPage}
              pageSize={pageSize}
              pageSizes={[10, 20, 30, 40, 50]}
              totalItems={encounters.length}
              onChange={({ page, pageSize }) => {
                setCurrentPage(page);
                setPageSize(pageSize);
                // constructPaginatedTableRows(encounters, page, pageSize);
              }}
            />
          </div>
        </>
      ) : (
        <EmptyState
          displayText={description}
          headerTitle={headerTitle}
          launchForm={() => launchEncounterForm(forms[0], launchOptions.moduleName)}
          launchFormComponent={formLauncher}
          hideFormLauncher={launchOptions.hideFormLauncher ?? isDead}
        />
      )}
    </>
  );
};
