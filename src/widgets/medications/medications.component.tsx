import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import MedicationsDetailedSummary from './medications-detailed-summary.component';
import MedicationRecord from './medication-record.component';

function Medications(props) {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={match.path}>
        <MedicationsDetailedSummary />
      </Route>
      <Route exact path={`${match.path}/:medicationUuid`}>
        <MedicationRecord />
      </Route>
    </Switch>
  );
}

export default Medications;
