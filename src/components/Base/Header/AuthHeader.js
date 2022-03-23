import React from 'react';
import styled from 'styled-components';
import AuthButton from 'components/common/AuthButton';

const Div = styled.div`
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AuthHeader = ({ user, onLogout }) => {
  return (
    <>
      <Div>
        <AuthButton to={process.env.PUBLIC_URL + '/canvas/setting'}>
          Go Plan
        </AuthButton>
        <AuthButton to="/about">About</AuthButton>
        <AuthButton to="/contact">Contact</AuthButton>
      </Div>
    </>
  );
};

export default AuthHeader;
