import React, { useCallback, useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Header } from '@carbon/react';
import { ArrowLeft, OverflowMenuVertical } from '@carbon/react/icons';
import moment from 'moment';
import styles from './patient-list-workspace.scss';

export const PatientListWorkspace: React.FC<
  React.PropsWithChildren<{
    header: string;
    onClose?: () => void;
    isVisible?: boolean;
    meta: { numberOfClients: number; subTitle: string; dateLastUpdated: string };
  }>
> = ({ header, children, isVisible, onClose, meta }) => {
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

const Overflow: React.FC<
  React.PropsWithChildren<{
    close: () => void;
    header: string;
    meta: { numberOfClients: number; subTitle: string; dateLastUpdated: string };
  }>
> = ({ close, children, header, meta }) => {
  return (
    <div className={styles.patientListWorkspaceContainer}>
      <Header>
        <Button style={{ backgroundColor: 'transparent', padding: '15px' }} onClick={close}>
          <ArrowLeft size={16} onClick={close} />
        </Button>
        <div>{header}</div>
      </Header>
      <div className={styles.container}>
        <div className={styles.listBanner}>
          <div className={styles.listInfo}>
            <div
              className={styles.patientListRow}
              style={{
                borderBottom: '1px solid #e0e0e0',
                marginTop: '0.4rem',
                paddingTop: '11px',
                paddingBottom: '11px',
                paddingLeft: '16px',
              }}
            >
              <Breadcrumb>
                <BreadcrumbItem className={''}>
                  <a
                    href="/#"
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                  >
                    Patient Lists
                  </a>
                </BreadcrumbItem>
                <BreadcrumbItem
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                  isCurrentPage
                >
                  {header}
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
            <div
              className={styles.patientListRow}
              style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '4px', paddingRight: '1rem' }}
            >
              <div className={styles.flexRow}>
                <span className={styles.bannerTitle}>{meta.subTitle}</span>
              </div>
              {/* @ts-ignore */}
              <Button size="small" kind="ghost" onClick="#">
                Actions <OverflowMenuVertical size={32} style={{ height: '20px' }} />
              </Button>
            </div>
            <div className={styles.patientListRow}>
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
