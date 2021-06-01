import React, { useState, useEffect } from 'react';
// import OHRIText from '../../forms/components/inputs/text/ohri-text.component';
// import OHRIRadio from '../../forms/components/inputs/radio/ohri-radio.component';
// import OHRIDate from '../../forms/components/inputs/date/ohri-date.component';

import OHRITextObs from '../components/inputs/ohri-text-obs.component';
import OHRIRadioObs from './inputs/ohri-radio-obs.component';
import OHRIDateObs from './inputs/ohri-date-obs.component';

import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Accordion, AccordionItem, Tabs, Tab } from 'carbon-components-react';

const OHRIForm = function({ pages }) {
  const [fields, setFields] = useState(pages[0].sections[0].questions);
  const [textValue, setTextValue] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const initialValues = {};

  const renderQuestions = questions =>
    questions.map((question, index) => {
      const type = question.questionOptions.rendering;

      if (type == 'number') {
        return <OHRITextObs questions={question} onChange={handleTextInput} key={index} />;
      } else if (type == 'radio') {
        return <OHRIRadioObs questions={question} onChange={handleRadioInput} key={index} />;
      } else if (type == 'date') {
        return <OHRIDateObs questions={question} onChange={handleDateInput} key={index} />;
      }
    });

  const renderSections = sections =>
    sections.map((section, index) => (
      <AccordionItem title={section.label} key={index} open={section.isExpanded == 'true' ? true : false}>
        {renderQuestions(section.questions)}
      </AccordionItem>
    ));

  const renderPages = pages =>
    pages.map((page, index) => (
      <Tab id={index.toString()} label={page.label} key={index}>
        <Accordion>{renderSections(page.sections)}</Accordion>
      </Tab>
    ));

  const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // return event;
    setTextValue(event.target.value);
    // eslint-disable-next-line no-console
    // console.log(textValue);
  };

  const handleRadioInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // return event;
    setRadioValue(event.target.value);
    // eslint-disable-next-line no-console
    console.log(radioValue);
  };

  const handleDateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // return event;
    setDateValue(event.target.value);
    // eslint-disable-next-line no-console
    console.log(dateValue);
  };

  const handleFormSubmit = () => {
    return;
  };

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={Yup.object({})} onSubmit={handleFormSubmit}>
        {props => (
          <Form>
            <Tabs type="container">{renderPages(pages)}</Tabs>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default OHRIForm;
