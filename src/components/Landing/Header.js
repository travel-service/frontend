import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;

const Img = styled.img`
  height: 40px;
  margin-right: 10px;
`;

const Menu = styled.div`
  display: flex;
`;

const MenuEl = styled(Link)`
  margin-left: 30px;
  text-decoration: none;
`;

const Header = () => {
  return (
    <Container>
      <Link to={process.env.PUBLIC_URL + '/'}>
        <Img alt="" src={process.env.PUBLIC_URL + '/images/logoPainting.png'} />
        <Img alt="" src={process.env.PUBLIC_URL + '/images/FontLogo.png'} />
      </Link>
      <Menu>
        <MenuEl to={process.env.PUBLIC_URL + '/login'}>로그인</MenuEl>
        <MenuEl to={process.env.PUBLIC_URL + '/signup'}>회원가입</MenuEl>
        <MenuEl to={process.env.PUBLIC_URL + '/notice/noticelist'}>
          공지사항
        </MenuEl>
      </Menu>
    </Container>
  );
};

export default Header;
