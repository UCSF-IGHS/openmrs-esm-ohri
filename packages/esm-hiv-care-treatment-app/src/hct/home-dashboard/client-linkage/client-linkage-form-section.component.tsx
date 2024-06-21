import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '@ohri/openmrs-esm-ohri-commons-lib';
import { Button } from '@carbon/react';
import { Add } from '@carbon/react/icons';

import styles from '../../common.scss';

const ClientLinkage = () => {
  const { t } = useTranslation();
  const headerTitle = 'Client Linkage';
  const [rows, setRows] = useState([]);

  return (
    <>
      {rows.length ? (
        <div className={styles.widgetContainer} style={{ marginTop: '2.5rem' }}>
          <div className={styles.widgetHeaderContainer}>
            <h4 className={`${styles.productiveHeading03} ${styles.text02}`}>{headerTitle}</h4>
            <div className={styles.toggleButtons}>
              <Button
                kind="ghost"
                renderIcon={<Add size={16} />}
                iconDescription="New"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {t('add', 'Add')}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState
          displayText={t('clientLinkage', 'client linkage')}
          headerTitle={headerTitle}
          launchForm={() => {}}
        />
      )}
    </>
  );
};

export default ClientLinkage;
