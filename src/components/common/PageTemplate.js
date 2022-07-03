import React from 'react';
import HeaderContainer from 'containers/common/HeaderContainer';

const PageTemplate = ({ children }) => {
  return (
    <>
      <HeaderContainer />
      {children}
    </>
  );
};

export default PageTemplate;
