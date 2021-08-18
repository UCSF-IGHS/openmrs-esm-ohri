import React, { useEffect, useMemo, useState } from 'react';
import { Button, Dropdown } from 'carbon-components-react';
import { Add16 } from '@carbon/icons-react';
import styles from './laucher-with-intent.scss';
import { filterFormByIntent } from '../../utils/forms-loader';

export const OHRIFormLauncherWithIntent: React.FC<{
  formJson: any;
  onClickLaunchForm: (formJson?: any) => void;
  onChangeIntent: (formJson: any) => void;
}> = ({ formJson, onClickLaunchForm, onChangeIntent }) => {
  const [processedForm, setProcessedForm] = useState(null);

  useEffect(() => {
    const processed = filterFormByIntent('*', formJson);
    setProcessedForm(processed);
    onChangeIntent(processed);
  }, []);

  const availableIntents = useMemo(() => {
    if (formJson['availableIntents']) {
      return formJson['availableIntents'];
    }
    const intents = new Set();
    formJson.pages.forEach(page => {
      page.sections.forEach(section => {
        section.questions.forEach(question => {
          question.behaviours?.forEach(behaviour => {
            intents.add(behaviour.intent);
          });
        });
      });
    });
    return [...intents];
  }, []);
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ paddingTop: '.3rem' }}>
        <Dropdown
          id="choose-intent"
          label="Choose Intent"
          items={availableIntents || ['*']}
          titleText=""
          onChange={({ selectedItem }) => {
            const processedForm = filterFormByIntent(selectedItem, formJson);
            setProcessedForm(processedForm);
            onChangeIntent(processedForm);
          }}
        />
      </div>
      <div className={styles.launchButtonWrapper}>
        <Button
          kind="ghost"
          renderIcon={Add16}
          iconDescription="New"
          onClick={e => {
            e.preventDefault();
            onClickLaunchForm && onClickLaunchForm(processedForm);
          }}>
          New
        </Button>
      </div>
    </div>
  );
};
