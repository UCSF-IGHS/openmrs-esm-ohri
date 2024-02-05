import React from 'react';
import styles from './visit-header.scss';
import { formatDatetime, parseDate } from '@openmrs/esm-framework';
import { useTranslation } from 'react-i18next';

interface VisitHeaderProps {
  currentVisit: any;
}

const VisitHeader: React.FC<VisitHeaderProps> = ({ currentVisit }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.header}>
      <div className={styles.visitInfo}>
        <div>
          <h4 className={styles.visitType}>{currentVisit?.visitType?.display}</h4>
          <div className={styles.displayFlex}>
            <h6 className={styles.dateLabel}>{t('start', 'Start')}:</h6>
            <span className={styles.date}>{formatDatetime(parseDate(currentVisit?.startDatetime))}</span>
            {currentVisit?.stopDatetime ? (
              <>
                <h6 className={styles.dateLabel}>{t('end', 'End')}:</h6>
                <span className={styles.date}>{formatDatetime(parseDate(currentVisit?.stopDatetime))}</span>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitHeader;
