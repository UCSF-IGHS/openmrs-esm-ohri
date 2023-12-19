import { ExtensionSlot } from '@openmrs/esm-framework';
import React from 'react';
import styles from './home-widgets.scss';

interface HomeWidgetsProps {}

const HomeWidgets: React.FC<HomeWidgetsProps> = () => {
  return <ExtensionSlot className={styles.homePageWidget} name="home-widgets-slot" />;
};

export default HomeWidgets;
