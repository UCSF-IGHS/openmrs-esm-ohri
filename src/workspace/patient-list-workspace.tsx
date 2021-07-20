import React, { useCallback, useEffect, useState } from 'react';
import ArrowLeft16 from '@carbon/icons-react/lib/arrow--left/16';
import Button from 'carbon-components-react/lib/components/Button';
import Header from 'carbon-components-react/lib/components/UIShell/Header';
import styles from '../components/patient-banner/patient-banner.scss';

const PatientListWorkspace: React.FC<{ header: string; onClose?: () => void; isVisible?: boolean }> = ({
  header,
  children,
  isVisible,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isVisible);
  }, [isVisible]);

  const close = useCallback(() => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  }, [onClose]);
  return <>{isOpen && <Overflow header={header} close={close} children={children} />}</>;
};

const Overflow: React.FC<{ close: () => void; header: string }> = ({ close, children, header }) => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        top: '0px',
        left: '0px',
        zIndex: 9001,
        backgroundColor: '#ededed',
        color: '#ededed',
        padding: '1rem 2rem',
        marginTop: '48px',
      }}>
      <Header>
        <Button style={{ backgroundColor: 'transparent', padding: '15px' }} onClick={close}>
          <ArrowLeft16 onClick={close} />
        </Button>
        <div>{header}</div>
        <div>tezt</div>
      </Header>
      <div>
        <div className={styles.container}>
          <div className={styles.patientBanner}>
            <div className={styles.patientInfo}>
              <div className={styles.row}>
                <div className={styles.flexRow}>
                  <span className={styles.patientName}>Text one</span>
                </div>
                <div>text</div>
              </div>
              <div className={styles.row}>
                <div className={styles.demographics}>
                  <span>sample text</span> &middot; <span>more text</span>
                </div>
              </div>
              <div className={styles.row}>
                <span className={styles.identifiers}>tttt</span>
                <Button
                  kind="ghost"
                  renderIcon={''}
                  iconDescription="Toggle contact details"
                  onClick={''}
                  style={{ marginTop: '-0.25rem' }}></Button>
              </div>
            </div>
          </div>
          'overflow'
        </div>
      </div>
      {children}
    </div>
  );
};

export default PatientListWorkspace;
