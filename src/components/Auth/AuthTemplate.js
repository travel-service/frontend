import React from 'react';
import styled from 'styled-components';
import palette from 'lib/styles/palette';
import { Link } from 'react-router-dom';
// import { shadow } from 'lib/styleUtils';
// import oc from 'open-color';

const AuthTemplateBlock = styled.div`
  margin-top: 60px;
  /* position: absolute; */
  /* left: 0; */
  /* top: 0; */
  /* bottom: 0; */
  /* right: 0; */
  /* background: ${palette.gray[2]}; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

const WhiteBox = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 500px;
  background: white;
  border-radius: 8px;
`;

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        {children}
      </WhiteBox>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;