import React from 'react';
import { Add } from '@carbon/react/icons';
import styles from './launcher-with-intent.scss';
import { useTranslation } from 'react-i18next';
import { OHRIOverflowMenu } from '../overflow-menu-button/ohri-overflow-menu.component';

export const OHRIFormLauncherWithIntent: React.FC<{
  launchForm: (formJson?: any, intent?: string) => void;
  title?: string;
  formJsonList?: Array<any>;
}> = ({ launchForm, formJsonList, title }) => {
  const { t } = useTranslation();
  return (
    <div style={{ paddingTop: '.3rem' }}>
      <OHRIOverflowMenu
        menuTitle={
          <>
            <span className={styles.actionsButtonText}>{title || t('add', 'Add')}</span>{' '}
            <Add size={16} style={{ marginLeft: '0.5rem' }} />
          </>
        }
        overflowItems={formJsonList.map((item) => {
          return { formJson: item, availableIntents: item.availableIntents };
        })}
        launchForm={launchForm}
      />
    </div>
  );
};
