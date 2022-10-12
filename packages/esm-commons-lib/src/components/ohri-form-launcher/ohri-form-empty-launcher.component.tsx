import React from 'react';
import { Button } from '@carbon/react';
import { Add } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';

export const OHRIFormLauncherEmpty: React.FC<{
  launchForm: (formJson?: any) => void;
}> = ({ launchForm }) => {
  const { t } = useTranslation();
  return (
    <div style={{ paddingTop: '.1rem', paddingRight: '.9rem', width: '6rem' }}>
      <Button
        kind="ghost"
        renderIcon={<Add size={16} />}
        onClick={(e) => {
          e.preventDefault();
          launchForm();
        }}>
        {t('add', 'New')}
      </Button>
    </div>
  );
};
