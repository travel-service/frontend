import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Title = styled.div`
    font-size: 1.5rem;
    font-weight: 500;
    color: ${oc.gray[8]};
    margin-bottom: 1rem;
    text-align: center;
`;

const SubTitle = styled.div`
  text-align: center;
`;

const AuthContent = ({ title, subtitle, children }) => (
  <div>
    <Title>{title}</Title>
    <SubTitle>{subtitle}</SubTitle>
    {children}
  </div>
);

export default AuthContent;