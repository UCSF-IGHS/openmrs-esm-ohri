import React from 'react';
import { Loading } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import styles from './loading.component.scss';

// eslint-disable-next-line no-empty-pattern
export const LoadingIcon: React.FC = ({}) => {
  const { t } = useTranslation();
  return (
    <div className={styles['centerLoadingSVG']}>
      <Loading description={t('activeLoadingIndicator', 'Active loading indicator')} withOverlay={false} small />
    </div>
  );
};
