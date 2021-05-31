import React, { useState } from 'react';
import OHRIForm from './ohri-form';
import BreadcrumbNavigation from './breadcrumb-navigation';
import Sample from '../sample';
import { Grid, Row, Column, Button } from 'carbon-components-react';
import styles from '../../styles.scss';

const Home: React.FC = () => {
  const [formSchema, setFormSchema] = useState(Sample);

  const navState = [
    {
      title: 'Patients',
      href: '#',
      isCurrentPage: false,
    },
    {
      title: 'Agnes Testerson',
      href: '#',
      isCurrentPage: false,
    },
    {
      title: 'Add HTS Record',
      href: '#',
      isCurrentPage: true,
    },
  ];

  return (
    <>
      <Grid className={styles['mt-4']}>
        <Row>
          <Column>
            <BreadcrumbNavigation state={navState} />
          </Column>
        </Row>
        <Row className={styles['mt-1']}>
          <Column lg={{ span: 3 }}>
            <Button kind="primary" className={styles['left-panel-button']}>
              Create Record
            </Button>
            <Button kind="tertiary" className={styles['left-panel-button']}>
              Cancel
            </Button>
          </Column>
          <Column lg={{ span: 9 }}>
            <OHRIForm pages={formSchema.pages} />
          </Column>
        </Row>
      </Grid>
    </>
  );
};

export default Home;
