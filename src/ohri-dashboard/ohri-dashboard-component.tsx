import React from 'react';
import { render } from 'react-dom';
import {
  Content,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
} from 'carbon-components-react/lib/components/UIShell';
import { Home32 } from '@carbon/icons-react';
import styles from '.ohri-dashboard.scss';

const StoryContent = () => {
  const content = (
    <div className="bx--grid">
      <div className="bx--row">
        <section className="">
          <h2>Content</h2>
          <p style={{ lineHeight: '20px' }}>
            The shell is perhaps the most crucial piece of any UI built with Carbon. It contains the shared navigation
            framework for the entire design system and ties the products in IBM’s portfolio together in a cohesive and
            elegant way. The shell is the home of the topmost navigation, where users can quickly and dependably gain
            their bearings and move between pages.
            <br />
            <br />
            The shell was designed with maximum flexibility built in, to serve the needs of a broad range of products
            and users. Adopting the shell ensures compliance with IBM design standards, simplifies development efforts,
            and provides great user experiences. All IBM products built with Carbon are required to use the shell’s
            header.
            <br />
            <br />
            To better understand the purpose and function of the UI shell, consider the “shell” of MacOS, which contains
            the Apple menu, top-level navigation, and universal, OS-level controls at the top of the screen, as well as
            a universal dock along the bottom or side of the screen. The Carbon UI shell is roughly analogous in
            function to these parts of the Mac UI. For example, the app switcher portion of the shell can be compared to
            the dock in MacOS.
          </p>
        </section>
      </div>
    </div>
  );

  return <Content id="main-content">{content}</Content>;
};

const OHRIDashboard = () => (
  <div className="container">
    <>
      <SideNav isFixedNav expanded={true} isChildOfHeader={false} aria-label="Side navigation">
        <SideNavItems>
          <SideNavLink href="javascript:void(0)">Home</SideNavLink>
          <SideNavLink href="javascript:void(0)">Patient Lists</SideNavLink>
          <SideNavMenu renderIcon={Home32} title="HIV">
            <SideNavMenuItem aria-current="page" href="javascript:void(0)">
              HTS (HTS POC Home Screen)
            </SideNavMenuItem>
            <SideNavMenuItem href="javascript:void(0)">Care and Treatment (C&T Home Screen)</SideNavMenuItem>
          </SideNavMenu>
          <SideNavMenu renderIcon={Home32} title="COVID">
            <SideNavMenuItem aria-current="page" href="javascript:void(0)">
              COVID-19 Cases (COVID Home Screen)
            </SideNavMenuItem>
          </SideNavMenu>
          <SideNavLink href="javascript:void(0)">Pharmacy</SideNavLink>
        </SideNavItems>
      </SideNav>
      <StoryContent />
    </>
  </div>
);

export default OHRIDashboard;
