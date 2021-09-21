import { openmrsFetch } from '@openmrs/esm-framework';
import DataTableSkeleton from 'carbon-components-react/lib/components/DataTableSkeleton';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../empty-state/empty-state.component';
import { launchOHRIWorkSpace } from '../../workspace/ohri-workspace-utils';
import { clinicalVisitEncounterType, encounterRepresentation } from '../../constants';
import { getForm } from '../../utils/forms-loader';
import { launchForm } from '../../utils/ohri-forms-commons';
import { OHRIFormLauncherWithIntent } from '../ohri-form-launcher/ohri-form-laucher.componet';
import styles from '../../hts/care-and-treatment/service-enrolment/service-enrolment-list.scss';
import OTable from '../data-table/o-table.component';
import { Button } from 'carbon-components-react';
import { Add16 } from '@carbon/icons-react';

interface EncounterListProps {
  patientUuid: string;
  encounterUuid: string;
  form?: { package: string; name: string };
  columns: Array<any>;
  headerTitle: string;
  tableHeaders: Array<string>;
  displayText: string;
}

const EncounterList: React.FC<EncounterListProps> = ({
  patientUuid,
  encounterUuid,
  form,
  columns,
  headerTitle,
  tableHeaders,
  displayText,
}) => {
  const { t } = useTranslation();
  const [tableRows, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const [encounterForm, setEncounterForm] = useState(getForm(form.package, form.name));

  const forceComponentUpdate = () => setCounter(counter + 1);

  const launchEncounterForm = (form?: any) => {
    launchOHRIWorkSpace('ohri-forms-view-ext', {
      title: encounterForm?.name,
      screenSize: 'maximize',
      state: { updateParent: forceComponentUpdate, formJson: form || encounterForm },
    });
  };

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
                <Button
                  kind="ghost"
                  renderIcon={Add16}
                  iconDescription="New"
                  onClick={e => {
                    e.preventDefault();
                    launchEncounterForm();
                  }}>
                  {t('Add')}
                </Button>
              </div>
            </div>
            <OTable tableHeaders={tableHeaders} tableRows={tableRows} />
          </div>
        </>
      ) : (
        <EmptyState
          displayText={displayText}
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
