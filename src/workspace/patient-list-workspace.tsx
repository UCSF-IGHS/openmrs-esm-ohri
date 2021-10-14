import React, { useCallback, useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Header } from 'carbon-components-react';
import ArrowLeft16 from '@carbon/icons-react/lib/arrow--left/16';
import { OverflowMenuVertical32 } from '@carbon/icons-react';
import moment from 'moment';
import styles from './patient-list-workspace.scss';

const PatientListWorkspace: React.FC<{
  header: string;
  onClose?: () => void;
  isVisible?: boolean;
  meta: { numberOfClients: number; subTitle: string; dateLastUpdated: string };
}> = ({ header, children, isVisible, onClose, meta }) => {
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
  return <>{isOpen && <Overflow header={header} close={close} children={children} meta={meta} />}</>;
};

const Overflow: React.FC<{
  close: () => void;
  header: string;
  meta: { numberOfClients: number; subTitle: string; dateLastUpdated: string };
}> = ({ close, children, header, meta }) => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        top: '0px',
        left: '0px',
        zIndex: 9001,
        backgroundColor: '#e0e0e0',
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
            <div
              className={styles.row}
              style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '1rem', paddingLeft: '16px' }}>
              <Breadcrumb>
                <BreadcrumbItem className={''}>
                  <a
                    href="/#"
                    onClick={event => {
                      event.preventDefault();
                    }}>
                    Patient Lists
                  </a>
                </BreadcrumbItem>
                <BreadcrumbItem
                  href="#"
                  onClick={event => {
                    event.preventDefault();
                  }}
                  isCurrentPage>
                  {header}
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
            <div
              className={styles.row}
              style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '1rem', paddingRight: '1rem' }}>
              <div className={styles.flexRow}>
                <span className={styles.bannerTitle}>{meta.subTitle}</span>
              </div>
              {/* @ts-ignore */}
              <Button size="small" kind="ghost" onClick="#">
                Actions <OverflowMenuVertical32 style={{ height: '20px' }} />
              </Button>
            </div>
            <div className={styles.row}>
              <div className={styles.demographics}>
                <span>{meta.numberOfClients} Clients</span> &middot; <span>Last Updated {moment().format('l')}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.childPadding}>{children}</div>
      </div>
    </div>
  );
};

export default PatientListWorkspace;
