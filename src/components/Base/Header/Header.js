import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Responsive from 'common/Responsive';
import Button from 'common/Button';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

/*Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성*/
const Wrapper = styled(Responsive)`
  height: 4em;
  display: flex;
  align-items: center;
  justify-content: space-between; /*자식 엘리먼트 사이의 여백을 최대로 설정*/
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

/*헤더가 fixed로 되어있어 페이지의 콘텐츠가 4rem 아래 나타나게*/
const Spacer = styled.div`
  height: 4rem;
`;

//로그인 상태
const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

//로그인 시 로그아웃으로 버튼 바뀌게
const Header = ({ user }) => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link style={{textDecoration: 'none'}} to="/" className="logo">TRABLOCK</Link>
          {user ? (
            <div className="right">
              <UserInfo>{user.username}</UserInfo>
              <Button>여행 보관함</Button>
              <Button>공지사항</Button>
              <Button>로그아웃</Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login">로그인</Button>
              <Button to="/signup">회원가입</Button>
              <Button>공지사항</Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer/>
    </>
  );
};

/*const Header = () => {
  return (
    <ul>
      <li>
        <Link to="/">main</Link>
      </li>
      <li>
        <Link to="/signup">signup</Link>
      </li>
      <li>
        <Link to="/login">login</Link>
      </li>
    </ul>
  );
};*/

export default Header;