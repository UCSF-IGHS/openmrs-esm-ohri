import React, { useMemo } from 'react';
import { Navigate } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

const RedirectToDashboard: React.FC<{}> = () => {
  const openmrsSpaBase = window['getOpenmrsSpaBase']();
  const shouldRedirect = useMemo(() => `${window.location.origin}${openmrsSpaBase}dashboard` != document.referrer, [
    openmrsSpaBase,
  ]);
  return (
    <>
      {shouldRedirect && (
        <BrowserRouter>
          <Navigate
            to={{
              pathname: `${openmrsSpaBase}dashboard`,
            }}
            replace
          />
        </BrowserRouter>
      )}
    </>
  );
};

export default RedirectToDashboard;
