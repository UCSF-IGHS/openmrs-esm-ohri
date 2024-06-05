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
interface ColumnDefinition {
  id: string;
  title: string;
  isComplex?: boolean;
  concept?: string | Array<string>;
  fallbackConcepts?: Array<string>;
  actionOptions?: Array<ActionProps>;
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
}
export const getTabColumns = (columnsDefinition: Array<ColumnDefinition>) => {
  const columns: Array<FormattedColumn> = columnsDefinition.map((column: ColumnDefinition) => ({
    key: column.id,
    header: column.title,
    getValue: (encounter) => {
      if (column.id === 'actions') {
        return column.actionOptions.map((action: ActionProps) => ({
          form: { name: action.formName, package: action.package },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: action.label,
          mode: action.mode,
        }));
      } else if (column.useMultipleObs === true) {
        let conceptsArray = Array.isArray(column.concept) ? column.concept : [column.concept];
        return getMultipleObsFromEncounter(encounter, conceptsArray);
      } else {
        return getObsFromEncounter(
          encounter,
          column.concept,
          column.isDate,
          column.isTrueFalseConcept,
          column.type,
          column.fallbackConcepts,
          column.useMultipleObs,
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
