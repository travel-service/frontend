import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';
import Logo from './Logo';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 7%;
  background-color: #ffd0c0;
  @media screen and (max-width: 767px) {
    display: block;
  }
`;

const SubFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Menu = styled.div`
  display: flex;
  @media screen and (max-width: 767px) {
    display: block;
    ${(props) =>
      !props.btnMenu &&
      css`
        display: none;
      `}
  }
`;

const Div = styled.div`
  /* margin: 10px 0px; */
  padding: 10px 0px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 767px) {
    :hover {
      transition: all 0.15s linear;
      background-color: white;
    }
  }
`;

const MenuEl = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 17px;
  font-weight: 550;
  margin-left: 30px;
  text-decoration: none;
  @media screen and (max-width: 767px) {
    margin-left: 0px;
    width: 100%;
    text-align: center;
  }
`;

const MenuBtn = styled(MdMenu)`
  display: none;
  @media screen and (max-width: 767px) {
    display: block;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;

const Profile = styled.div`
  margin-left: 5px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: rgba(133, 207, 194, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Thumbnail = styled.img`
  width: 80%;
  /* height: 100%; */
`;

const Header = ({ userState, onLogout }) => {
  const [menu, setMenu] = useState(false);

  const btnClick = () => {
    setMenu(!menu);
  };

  return (
    <Container>
      <SubFlex>
        <Logo />
        <MenuBtn onClick={btnClick} />
      </SubFlex>
      <Menu btnMenu={menu}>
        {userState ? (
          <>
            <Div>
              <MenuEl to={process.env.PUBLIC_URL + '/mypage/MyInfo'}>
                {userState.nickName}
                <Profile>
                  <Thumbnail
                    src={process.env.PUBLIC_URL + '/images/face1.png'}
                    alt=""
                  />
                </Profile>
              </MenuEl>
              {/* 썸네일 이미지로 변환 필요 */}
            </Div>
            <Div>
              {/* <MenuEl to={process.env.PUBLIC_URL + '/login'}>로그아웃</MenuEl> */}
              <MenuEl to={process.env.PUBLIC_URL} onClick={onLogout}>
                로그아웃
              </MenuEl>
            </Div>
            <Div>
              <MenuEl to={process.env.PUBLIC_URL + '/canvas/directory'}>
                여행보관함
              </MenuEl>
            </Div>
          </>
        ) : (
          <>
            <Div>
              <MenuEl to={process.env.PUBLIC_URL + '/login'}>로그인</MenuEl>
            </Div>
            <Div>
              <MenuEl to={process.env.PUBLIC_URL + '/signup'}>회원가입</MenuEl>
            </Div>
          </>
        )}
        <Div>
          <MenuEl to={process.env.PUBLIC_URL + '/notice'}>공지사항</MenuEl>
        </Div>
      </Menu>
    </Container>
  );
};

export default Header;
