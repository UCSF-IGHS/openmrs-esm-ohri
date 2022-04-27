import React from 'react';
import Loading from 'carbon-components-react/es/components/Loading';
import styles from './loading.component.scss';

export const LoadingIcon: React.FC = () => (
  <div className={styles['centerLoadingSVG']}>
    <Loading description="Active loading indicator" withOverlay={false} small />
  </div>
);
