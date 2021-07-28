import React, { useCallback, useEffect, useState } from 'react';
import ArrowLeft16 from '@carbon/icons-react/lib/arrow--left/16';
import Button from 'carbon-components-react/lib/components/Button';
import Header from 'carbon-components-react/lib/components/UIShell/Header';
import styles from './patient-list-workspace.scss';
import moment from 'moment';
import { Breadcrumb, BreadcrumbItem } from 'carbon-components-react';
import { OverflowMenuVertical32 } from '@carbon/icons-react';

const PatientListWorkspace: React.FC<{
  header: string;
  onClose?: () => void;
  isVisible?: boolean;
}> = ({ header, children, isVisible, onClose }) => {
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
      </Header>
      <div className={styles.container}>
        <div className={styles.listBanner}>
          <div className={styles.listInfo}>
            <div className={styles.row} style={{ borderBottom: '1px' }}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <a href={'home'}>Patient Lists</a>
                </BreadcrumbItem>
                <BreadcrumbItem href="#">Lost to follow-up</BreadcrumbItem>
              </Breadcrumb>
            </div>
            <div className={styles.row}>
              <div className={styles.flexRow}>
                <span className={styles.bannerTitle}>A list of {header}</span>
              </div>
              <div>
                <Button size="small" kind="ghost" onClick="#">
                  Actions <OverflowMenuVertical32 style={{ height: '20px' }} />
                </Button>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.demographics}>
                <span>2 Clients</span> &middot; <span>Last Updated {moment().format('l')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '150px' }}>{children}</div>
    </div>
  );
};

export default PatientListWorkspace;
