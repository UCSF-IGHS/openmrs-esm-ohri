import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MedicationsDetailedSummary from './medications-detailed-summary.component';
import MedicationRecord from './medication-record.component';

function Medications(props) {
  return (
    <Switch>
      <Route exact path="/drugorder/patient/:patientUuid">
        <MedicationsDetailedSummary />
      </Route>
      <Route exact path="/drugorder/patient/:patientUuid/medication-orders/:medicationUuid">
        <MedicationRecord />
      </Route>
    </Switch>
  );
}

export default Medications;
