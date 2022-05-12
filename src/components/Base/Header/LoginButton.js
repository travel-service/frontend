import React from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import { shadow } from 'lib/styleUtils';

const buttonStyle = css`
  border: 1px solid ${oc.cyan[6]};
  border-radius: 2px;
  font-weight: 600;
  padding: 0.5rem;
  padding-bottom: 0.4rem;
  color: ${oc.cyan[6]};
  cursor: pointer;
  text-decoration: none;
  transition: .2s all;
  background: white;

  &:hover {
    background: ${oc.cyan[6]};
    color: white;
    ${shadow(1)}
  }

  &:active {
    /* 마우스 클릭시 아래로 미세하게 움직임 */
    transform: translateY(3px);
  }
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const LoginButton = (props) => {
  return props.to ? (
    <StyledLink {...props} />
  ) : (
    <StyledButton {...props} />
  )
};

export default LoginButton;