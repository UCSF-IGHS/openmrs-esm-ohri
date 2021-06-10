import React from 'react';
import Button from 'carbon-components-react/es/components/Button';
import { Add16 } from '@carbon/icons-react';
import styles from '../../../../src/hts/encounters-list/hts-overview-list.scss';
import { useTranslation } from 'react-i18next';

const ClientLinkage = ({ sectionTitle }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.widgetContainer} style={{ marginTop: '2.5rem' }}>
      <div className={styles.widgetHeaderContainer}>
        <h4 className={`${styles.productiveHeading03} ${styles.text02}`}>{sectionTitle}</h4>
        <div className={styles.toggleButtons}>
          <Button
            kind="ghost"
            renderIcon={Add16}
            iconDescription="New"
            onClick={e => {
              e.preventDefault();
            }}>
            {t('add', 'New')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientLinkage;
