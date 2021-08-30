import React, { useEffect, useMemo, useState } from 'react';
import { Button, Dropdown } from 'carbon-components-react';
import styles from './empty-state.scss';
import Link from 'carbon-components-react/es/components/Link';
import { Tile } from 'carbon-components-react/es/components/Tile';
import EmptyDataIllustration from './empty-data-illustration.component';
import { Trans, useTranslation } from 'react-i18next';
import { launchOHRIWorkSpace } from '../../workspace/ohri-workspace-utils';
import { getForm } from '../../utils/forms-loader';

interface EmptyStateProps {
  headerTitle: string;
  displayText?: string;
  launchForm?: () => void;
  launchFormComponent?: any;
  showLaunchLink?: boolean;
}

const EmptyStateServiceEnrollment: React.FC<EmptyStateProps> = ({
  headerTitle,
  displayText,
  launchFormComponent,
  showLaunchLink = true,
  launchForm,
}) => {
  const { t } = useTranslation();
  const [counter, setCounter] = useState(0);

  const forceComponentUpdate = () => setCounter(counter + 1);

  const serviceEnrolmentForm = useMemo(() => {
    return getForm('hiv', 'service_enrolment');
  }, []);

  const launchServiceEnrolmentForm = () => {
    launchOHRIWorkSpace('ohri-forms-view-ext', {
      title: serviceEnrolmentForm?.name,
      screenSize: 'maximize',
      state: { updateParent: forceComponentUpdate, formJson: serviceEnrolmentForm },
    });
  };

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
        <Button
          kind="ghost"
          displayText={t('serviceEnrolments', 'service enrolments')}
          id="choose-intent"
          label="Add +"
          launchForm={launchServiceEnrolmentForm}></Button>
        {showLaunchLink && !launchFormComponent && (
          <p className={styles.action}>
            <Link onClick={() => launchForm()}>
              {t('record', 'Record')} {displayText.toLowerCase()}
            </Link>
          </p>
        )}
      </div>
    </Tile>
  );
};

export default EmptyStateServiceEnrollment;
