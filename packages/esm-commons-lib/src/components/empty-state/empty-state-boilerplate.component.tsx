import React from 'react';
import { Tile } from '@carbon/react';
import { EmptyDataIllustration } from './empty-data-illustration.component';
import { Trans, useTranslation } from 'react-i18next';
import styles from './empty-state.scss';

interface EmptyStateProps {
  headerTitle: string;
  displayText: string;
  launchForm?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = (props) => {
  const { t } = useTranslation();

  return (
    <Tile light className={styles.tile}>
      <h1 className={styles.heading}>{props.headerTitle}</h1>
      <EmptyDataIllustration />
      <p className={styles.content}>
        <Trans i18nKey="emptyStateText" values={{ displayText: props.displayText.toLowerCase() }}>
          Coming soon
        </Trans>
      </p>
    </Tile>
  );
};
