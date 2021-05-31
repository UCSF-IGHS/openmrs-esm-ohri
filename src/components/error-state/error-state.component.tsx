import React from 'react';
import { Tile } from 'carbon-components-react/es/components/Tile';
import { useTranslation } from 'react-i18next';
import styles from './error-state.scss';

interface ErrorStateProps {
  error: any;
  headerTitle: string;
}

const EmptyState: React.FC<ErrorStateProps> = ({ error, headerTitle }) => {
  const { t } = useTranslation();

  return (
    <Tile light className={styles.tile}>
      <h1 data-testid="header-title" className={styles.heading}>
        {headerTitle}
      </h1>
      <p className={styles.errorMessage}>
        {t('error', 'Error')} {`${error?.response?.status}: `}
        {error?.response?.statusText}
      </p>
      <p className={styles.errorCopy}>
        {t(
          'errorCopy',
          'Sorry, there was a problem displaying this information. You can try to reload this page, or contact the site administrator and quote the error code above.',
        )}
      </p>
    </Tile>
  );
};

export default EmptyState;
