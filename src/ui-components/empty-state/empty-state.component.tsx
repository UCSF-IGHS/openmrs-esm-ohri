import React from 'react';
import SummaryCard from '../cards/summary-card.component';
import { DataCaptureComponentProps } from '../../widgets/shared-utils';
import styles from './empty-state.css';
import { match } from 'react-router-dom';
import { Trans } from 'react-i18next';

export default function EmptyState(props: EmptyStateProps) {
  return (
    <SummaryCard name={props.name} addComponent={props.addComponent} showComponent={props.showComponent}>
      <div style={props.styles} className={`omrs-medium ${styles.emptyStateText}`}>
        <p className="omrs-type-body-regular">
          <Trans i18nKey="emptyStateText" values={{ displayText: props.displayText }}>
            This patient has no {props.displayText} recorded in the system.
          </Trans>
        </p>
      </div>
    </SummaryCard>
  );
}

type EmptyStateProps = {
  name: string;
  displayText: string;
  styles?: React.CSSProperties;
  addComponent?: React.FC<RouteBasedComponentProps | DataCaptureComponentProps>;
  showComponent?: () => void;
};

type RouteBasedComponentProps = {
  basePath?: string;
  match?: match;
};
