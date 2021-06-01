import { Breadcrumb, BreadcrumbItem } from 'carbon-components-react';
import React from 'react';

const BreadcrumbNavigation = props => {
  return (
    <Breadcrumb>
      {props.state.map((item, index) => {
        <BreadcrumbItem href={item.href} key={index} isCurrentPage={item.isCurrentPage}>
          {item.title}
        </BreadcrumbItem>;
      })}
    </Breadcrumb>
  );
};

export default BreadcrumbNavigation;
