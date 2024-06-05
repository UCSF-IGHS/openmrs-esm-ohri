import { getObsFromEncounter, findObs, getMultipleObsFromEncounter } from './encounter-list-utils';

interface MenuProps {
  menuId: string;
  tabDefinitions: Array<TabSchema>;
}
interface ActionProps {
  mode: string;
  label: string;
  package: string;
  formName: string;
}

interface ConditionalActionProps {
  mode: string;
  label: string;
  package: string;
  formName: string;
  dependsOn: string;
  dependantConcept: string;
}

interface ColumnDefinition {
  id: string;
  title: string;
  isComplex?: boolean;
  concept?: string;
  multipleConcepts?: Array<string>;
  fallbackConcepts?: Array<string>;
  actionOptions?: Array<ActionProps>;
  conditionalActionOptions?: Array<ConditionalActionProps>;
  isDate?: boolean;
  isTrueFalseConcept?: boolean;
  type?: string;
  isLink?: boolean;
  useMultipleObs?: boolean;
}

interface LaunchOptions {
  displayText: string;
  moduleName: string;
}
interface TabSchema {
  tabName: string;
  hasFilter?: boolean;
  headerTitle: string;
  displayText: string;
  encounterType: string;
  columns: Array<ColumnDefinition>;
  formList: Array<{ name: string; uuid: string; fixedIntent?: string; excludedIntents?: Array<string> }>;
  launchOptions: LaunchOptions;
}

interface FormattedColumn {
  key: string;
  header: string;
  getValue: (encounter: any) => string;
  link?: any;
  concept?: string;
}

export const getTabColumns = (columnsDefinition: Array<ColumnDefinition>) => {
  const columns: Array<FormattedColumn> = columnsDefinition.map((column: ColumnDefinition) => ({
    key: column.id,
    header: column.title,
    concept: column.concept,
    getValue: (encounter) => {
      if (column.id === 'actions') {
        const conditionalActions = [];
        const baseActions = column.actionOptions.map((action: ActionProps) => ({
          form: { name: action.formName, package: action.package },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: action.label,
          mode: action.mode,
        }));

        if (column?.conditionalActionOptions?.length) {
          column?.conditionalActionOptions?.map((action) => {
            const dependantObsValue = getObsFromEncounter(encounter, action.dependantConcept);

            if (dependantObsValue === action.dependsOn) {
              return conditionalActions.push({
                form: { name: action.formName, package: action.package },
                encounterUuid: encounter.uuid,
                intent: '*',
                label: action.label,
                mode: action.mode,
              });
            }
          });
        }
        return [...baseActions, ...conditionalActions];
      } else if (column.useMultipleObs === true) {
        return getMultipleObsFromEncounter(encounter, column.multipleConcepts);
      } else {
        return getObsFromEncounter(
          encounter,
          column.concept,
          column.isDate,
          column.isTrueFalseConcept,
          column.type,
          column.fallbackConcepts,
        );
      }
    },
    link: column.isLink
      ? {
          getUrl: (encounter) => encounter.url,
          handleNavigate: (encounter) => {
            encounter.launchFormActions?.viewEncounter();
          },
        }
      : null,
  }));

  return columns;
};

export const getMenuItemTabConfiguration = (schemaConfig: MenuProps) => {
  const tabs = schemaConfig.tabDefinitions.map((tab) => {
    return {
      name: tab.tabName,
      hasFilter: tab.hasFilter || false,
      encounterType: tab.encounterType,
      headerTitle: tab.headerTitle,
      description: tab.displayText,
      formList: tab.formList,
      columns: getTabColumns(tab.columns),
      launchOptions: tab.launchOptions,
    };
  });

  return tabs;
};
