import React, { useState } from 'react';
import styled from 'styled-components';
import Button2 from 'components/common/AuthPageButton';
import ModalModule from 'components/common/modal/ModalModule';
import InsertCanvas from './InsertCanvas';

const Div = styled.div`
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AuthPageButton = ({ user, onLogout }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Div>
        <Button2 onClick={openModal}>Go Plan</Button2>
        <Button2 to="/about">About</Button2>
        <Button2 to="/contact">Contact</Button2>
        <Button2 to={process.env.PUBLIC_URL + '/notice/noticeList'}>
          Notice
        </Button2>
      </Div>
      <ModalModule
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        title="새로운 여행? 이미 있는 여행?"
      >
        <InsertCanvas closeModal={closeModal} />
      </ModalModule>
    </>
  );
};

export default AuthPageButton;
