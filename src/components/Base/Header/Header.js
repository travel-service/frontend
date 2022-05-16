import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { shadow, media } from 'lib/styleUtils';
import oc from 'open-color';
// import Button from 'components/Base/Header/Button';
import Button from 'components/common/Button';
import ModalModule from 'components/common/modal/ModalModule';
import InsertCanvas from './InsertCanvas';

// 상단 고정, 그림자
const Positioner = styled.div`
  display: flex;
  flex-direction: column;
  top: 0px;
  width: 100%;
  /* ${shadow(1)} */
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
  color: ${oc.teal[6]};
`;

const Header = ({ user, onLogout }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // const onClick = () => {openModal()};
  return (
    <Positioner>
      <WhiteBackground>
        <HeaderContents>
          <Logo to={process.env.PUBLIC_URL}>TRABLOCK</Logo>
          <Spacer />

          {/* 임시로 만듦 */}
          <Button
            // to={process.env.PUBLIC_URL + '/canvas/insert'}
            onClick={openModal}
          >
            여행 계획 세우러 가기
          </Button>
          <Spacer />

          {user ? (
            <>
              <UserInfo>{user.username}</UserInfo>
              <Button onClick={onLogout}>로그아웃</Button>
            </>
          ) : (
            <Button to={process.env.PUBLIC_URL + '/login'}>로그인</Button>
          )}
        </HeaderContents>
        <ModalModule
          modalIsOpen={modalIsOpen}
          openModal={openModal}
          closeModal={closeModal}
          title="새로운 여행? 이미 있는 여행?"
        >
          <InsertCanvas closeModal={closeModal} />
        </ModalModule>
      </WhiteBackground>
      <GradientBorder />
    </Positioner>
  );
};

export default Header;
