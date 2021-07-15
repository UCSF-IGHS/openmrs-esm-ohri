import React, { useState } from 'react'; 
import styles from '../encounters-list/hts-overview-list.scss';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../components/empty-state/empty-state-boilerplate.component';

const ClientLinkage = () => {
  const { t } = useTranslation();
  const headerTitle = 'Client Linkage';
  const [rows, setRows] = useState([]);

  return (
      <> 
          <div className={styles.widgetContainer} style={{ marginTop: '2.5rem' }}>
            <div className={styles.widgetHeaderContainer}>
              <h4 className={`${styles.productiveHeading03} ${styles.text02}`}>{headerTitle}</h4>
            </div>
          </div>

      </>
  );
};

export default ClientLinkage;
