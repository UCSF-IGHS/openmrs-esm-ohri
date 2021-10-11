import React from 'react';
import Link from 'carbon-components-react/es/components/Link';
import { Tile } from 'carbon-components-react/es/components/Tile';
import EmptyDataIllustration from './empty-data-illustration.component';
import styles from './empty-state.scss';
import { Trans, useTranslation } from 'react-i18next';
import { Button } from 'carbon-components-react';

interface EmptyStateProps {
  headerTitle: string;
  displayText?: string;
  launchForm?: () => void;
  launchFormComponent?: any;
  hideFormLauncher?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  headerTitle,
  displayText,
  launchFormComponent,
  hideFormLauncher = true,
  launchForm,
}) => {
  const { t } = useTranslation();
  return (
    <Tile light>
      <div className={styles.headerWrapper}>
        <h1 className={styles.heading}>{headerTitle}</h1>
        {launchFormComponent}
      </div>
      <div className={styles.contentWrapper}>
        <EmptyDataIllustration />
        <p className={styles.content}>
          <Trans i18nKey="emptyStateText" values={{ displayText: displayText.toLowerCase() }}>
            There are no {displayText.toLowerCase()} to display
            {displayText.toLowerCase() != 'patients' ? ' for this patient' : ''}
          </Trans>
        </p>
        {launchFormComponent && !hideFormLauncher && (
          <p className={styles.action}>
            <Link onClick={() => launchForm()}>
              {t('record', 'Record')} {displayText.toLowerCase()}
            </Link>
          </p>
        )}
      </div>
      <Button kind="ghost" displayText={t('add', 'Add')} id="choose-intent" label="Add +"></Button>
    </Tile>
  );
};

export default EmptyState;
