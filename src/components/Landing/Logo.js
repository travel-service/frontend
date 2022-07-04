import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const Img = styled.img`
  height: 40px;
  margin-right: 10px;
  ${(props) =>
    !props.auth &&
    css`
      @media screen and (max-width: 767px) {
        height: 25px;
      }
    `}
`;

const Logo = ({ auth }) => {
  return (
    <Link to={process.env.PUBLIC_URL + '/'}>
      <Img
        auth={auth}
        alt=""
        src={process.env.PUBLIC_URL + '/images/logoPainting.png'}
      />
      <Img
        auth={auth}
        alt=""
        src={process.env.PUBLIC_URL + '/images/FontLogo.png'}
      />
    </Link>
  );
};

export default Logo;
