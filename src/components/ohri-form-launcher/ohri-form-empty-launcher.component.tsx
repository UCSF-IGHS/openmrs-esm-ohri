import React, { useEffect, useMemo, useState } from 'react';
import { Button, Dropdown } from 'carbon-components-react';
import { Add16 } from '@carbon/icons-react';
import styles from './laucher-with-intent.scss';
import { launchOHRIWorkSpace } from '../../workspace/ohri-workspace-utils';
import { useTranslation } from 'react-i18next';
import { getForm } from '../../utils/forms-loader';

export const OHRIFormLauncherEmpty: React.FC<{
  launchForm: (formJson?: any) => void;
}> = ({ launchForm }) => {
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
    <div style={{ paddingTop: '.1rem', paddingRight: '.9rem', width: '6rem' }}>
      <Button 
        renderIcon={Add16}
        onClick={e => {
          e.preventDefault();
          launchServiceEnrolmentForm();
        }}>
        {t('add', 'Add')}
      </Button>
    </div>
  );
};
