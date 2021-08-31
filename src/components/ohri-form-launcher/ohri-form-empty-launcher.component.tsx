import React from 'react';
import { Button } from 'carbon-components-react';
import { Add16 } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next';

export const OHRIFormLauncherEmpty: React.FC<{
  launchForm: (formJson?: any) => void;
}> = ({ launchForm }) => {
  const { t } = useTranslation();
  return (
    <div style={{ paddingTop: '.1rem', paddingRight: '.9rem', width: '6rem' }}>
      <Button
        kind="ghost"
        renderIcon={Add16}
        onClick={e => {
          e.preventDefault();
          launchForm();
        }}>
        {t('add', 'Add')}
      </Button>
    </div>
  );
};
