import React, { useMemo } from 'react';
import { Redirect } from 'react-router';
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
          <Redirect
            to={{
              pathname: `${openmrsSpaBase}dashboard`,
            }}
          />
        </BrowserRouter>
      )}
    </>
  );
};

export default RedirectToDashboard;
