import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { shadow, media } from 'lib/styleUtils';
import oc from 'open-color';
import LoginButton from 'components/Base/Header/LoginButton';

// 상단 고정, 그림자
const Positioner = styled.div`
    display: flex;
    flex-direction: column;
    top: 0px;
    width: 100%;
    ${shadow(1)}
`;

// 흰 배경, 내용 중간 정렬
const WhiteBackground = styled.div`
    background: white;
    display: flex;
    justify-content: center;
    height: auto;
`;

// 해더의 내용
const HeaderContents = styled.div`
    width: 1200px;
    height: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;

    padding-right: 1rem;
    padding-left: 1rem;
    ${media.wide`
        width: 992px;
    `}

    ${media.tablet`
        width: 100%;
    `}
`;

// 로고
const Logo = styled(Link)`
    letter-spacing: 2px;
    font-size: 1.4rem;
    color: ${oc.teal[7]};
    font-family: 'Rajdhani';
    text-decoration: none;
`;

// 중간 여백
const Spacer = styled.div`
    flex-grow: 1;
`;

// 하단 그래디언트 테두리
const GradientBorder = styled.div`
    height: 3px;
    background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
`;

const UserInfo = styled.div`
  font-weight: 600;
  margin-right: 1rem;
  color: ${oc.teal[7]};
`;

const Header = ({ user, onLogout }) => {
  return (
    <Positioner>
      <WhiteBackground>
        <HeaderContents>
          <Logo to="/">TRABLOCK</Logo>
          <Spacer />
          {user ? (
            <>
              <UserInfo>{user.username}</UserInfo>
              <LoginButton onClick={onLogout}>로그아웃</LoginButton>
            </>
          ) : (
            <LoginButton to='/login'>로그인</LoginButton>
          )}
        </HeaderContents>
      </WhiteBackground>
      <GradientBorder />
    </Positioner>
  );
};

export default Header;