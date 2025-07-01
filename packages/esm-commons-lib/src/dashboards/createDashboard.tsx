import React, { useEffect, useMemo, useState } from 'react';
import PatientExtensionRenderer from '../components/extension-conditional-renderer/patient-based-extension-renderer';
import { type DashboardLinkConfig } from '../types';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ConfigurableLink } from '@openmrs/esm-framework';
import { DashboardGroupExtension } from './nav-group/DashboardGroupExtension';
import classNames from 'classnames';
import last from 'lodash-es/last';

export const DashboardLink: React.FC<DashboardLinkConfig> = ({ basePath, path, title }) => {
  const location = useLocation();
  const navLink = useMemo(() => decodeURIComponent(last(location.pathname.split('/'))), [location.pathname]);
  const [resolvedTitle, setResolvedTitle] = useState<string | undefined>();

  useEffect(() => {
    if (typeof title === 'function') {
      Promise.resolve((title as () => string | Promise<string>)())
        .then((resolvedValue) => {
          setResolvedTitle(resolvedValue);
        })
        .catch((e: Error) => {
          throw e;
        });
    } else {
      setResolvedTitle(title);
    }
  }, [title]);

  const activeClassName = path === navLink ? 'active-left-nav-link' : 'non-active';

  return (
    title &&
    resolvedTitle && (
      <div key={path} className={activeClassName}>
        <ConfigurableLink
          className={classNames('cds--side-nav__link', activeClassName)}
          to={`${basePath}/${encodeURIComponent(path)}`}
        >
          {resolvedTitle}
        </ConfigurableLink>
      </div>
    )
  );
};

export const createConditionalDashboardLink = (db: DashboardLinkConfig) => {
  return ({ basePath }: { basePath: string }) => {
    return (
      <PatientExtensionRenderer patientExpression={db.patientExpression}>
        <BrowserRouter>
          <DashboardLink basePath={basePath} path={db.path} title={db.title} />
        </BrowserRouter>
      </PatientExtensionRenderer>
    );
  };
};

export const createConditionalDashboardGroup = ({
  title,
  slotName,
  isExpanded,
  moduleName,
  patientExpression,
}: {
  title: string;
  slotName: string;
  patientExpression: string;
  moduleName?: string;
  isExpanded?: boolean;
}) => {
  const DashboardGroup = ({ basePath }: { basePath: string }) => {
    return (
      <PatientExtensionRenderer patientExpression={patientExpression}>
        <DashboardGroupExtension
          title={title}
          slotName={slotName}
          basePath={basePath}
          isExpanded={isExpanded}
          moduleName={moduleName}
        />
      </PatientExtensionRenderer>
    );
  };
  return DashboardGroup;
};
