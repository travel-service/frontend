import React from 'react';
import styled, { css } from 'styled-components';
import AuthHeader from 'components/Base/Header/AuthHeader';
import Logo from 'components/Landing/Logo';

const AuthTemplateBlock = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: #fff1a9;
`;

const WhiteBox = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  width: 45%;
  background: white;
  border-radius: 0 45px 45px 0;
`;

const Div = styled.div`
  padding: 50px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* width: 100px; */
  /* width: 70%; */
`;

const Main = styled.div`
  width: 55%;
  height: 100vh;
`;

const Illustration = styled.div`
  ${(props) =>
    props.plane &&
    css`
      margin-top: 20px;
      padding-left: 40px;
    `}

  ${(props) =>
    props.traveler &&
    css`
      position: relative;
      text-align: center;
      top: -30px;
    `}
`;

const MainCharacter = styled.img``;

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <Div>
          <Logo />
          {children}
        </Div>
      </WhiteBox>
      <Main>
        <AuthHeader />
        <Illustration plane>
          <MainCharacter src={process.env.PUBLIC_URL + '/images/plane.png'} />
        </Illustration>
        <Illustration traveler>
          <MainCharacter
            src={process.env.PUBLIC_URL + '/images/mainCharacter.png'}
          />
        </Illustration>
      </Main>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
