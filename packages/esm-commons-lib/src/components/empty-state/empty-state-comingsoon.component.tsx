import React from 'react';
import { EmptyDataIllustration } from './empty-data-illustration.component';
import styles from './empty-state.scss';
import { Trans, useTranslation } from 'react-i18next';
import { Button, Tile } from '@carbon/react';

interface EmptyStateProps {
  headerTitle: string;
  displayText?: string;
  launchForm?: () => void;
  launchFormComponent?: any;
  showLaunchLink?: boolean;
}

export const EmptyStateComingSoon: React.FC<EmptyStateProps> = ({ headerTitle, displayText }) => {
  const { t } = useTranslation();
  return (
    <Tile light>
      <div className={styles.headerWrapper}>
        <h1 className={styles.heading}>{headerTitle}</h1>
      </div>
      <div className={styles.contentWrapper}>
        <EmptyDataIllustration />
        <p className={styles.content}>
          <Trans i18nKey="emptyStateText" values={{ displayText: displayText.toLowerCase() }}>
            Coming Soon (Under Development)
          </Trans>
        </p>
      </div>
      {/* @ts-ignore */}
      <Button kind="ghost" displayText={t('add', 'Add')} id="choose-intent" label={t('add', 'Add +')}></Button>
    </Tile>
  );
};
