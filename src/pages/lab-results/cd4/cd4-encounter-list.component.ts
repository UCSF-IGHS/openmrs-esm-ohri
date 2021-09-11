import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../common.scss';
import EmptyState from '../../../components/empty-state/empty-state.component';
import OTable from '../../../components/data-table/o-table.component';
import { DataTableSkeleton } from 'carbon-components-react';
import { OHRIFormLauncherEmpty } from '../../../components/ohri-form-launcher/ohri-form-empty-launcher.component';
import { launchOHRIWorkSpace } from '../../../workspace/ohri-workspace-utils';

interface OverviewListProps {
  patientUuid: string;
}

const CD4OverviewList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  // const { t } = useTranslation();
  // const [tableRows, setTableRows] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const rowCount = 5;

  // const tableHeaders = [
  //   { key: 'date', header: 'CD4 Date', isSortable: true },
  //   { key: 'load', header: 'CD4 Load' },
  //   { key: 'reason', header: 'Reason for CD4' },
  // ];

  // const launchHTSForm = (form?: any) => {};

  // const headerTitle = t('cd4', 'CD4');
  // const displayText = t('cd4', 'CD4');

  // useEffect(() => {
  //   setTimeout(() => {
  //     tableRows.push({});
  //     setIsLoading(false);
  //   }, 1000);
  // }, []);

  return (<div></div>);
};

export default CD4OverviewList;
