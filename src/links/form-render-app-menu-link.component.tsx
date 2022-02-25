import React from 'react';
import { useTranslation } from 'react-i18next';
import { ConfigurableLink } from '@openmrs/esm-framework';

export default function FormRenderAppMenuLink() {
  const { t } = useTranslation();
  return (
    <ConfigurableLink to="${openmrsSpaBase}/form-render-test">
      {t('formRenderMenuLink', 'Form render')}
    </ConfigurableLink>
  );
}
