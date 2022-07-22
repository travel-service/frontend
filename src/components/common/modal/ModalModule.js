import React from 'react';
import Modal from 'react-modal';
import styled, { css } from 'styled-components';
import Close from 'lib/Icons/Close';
import 'lib/styles/Modal.css';
import MapContainer from 'components/Canvas/BuildTab/Map/MapContainer';
import MapMove from 'components/Canvas/BuildTab/Map/MapMove';
import BlackCustomBtn from 'components/Canvas/common/BlackCustomBtn';

const StyledModal = styled(Modal)`
  display: flex;
  /* justify-content: center; */

  @media screen and (max-width: 767px) {
    flex-direction: column-reverse;
    justify-content: center;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
`;

const Section = styled.div`
  /* border-radius: 0.3rem; */
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  animation: modal-show 0.3s;
  /* overflow: hidden; */
  /* margin: 0 auto; */
  @media screen and (max-width: 767px) {
    overflow: auto;
    margin-top: 15px;
    margin-bottom: 15px;
  }
`;

const Main = styled.main`
  border: none;
  ${(props) =>
    props.map === 'moveLoc' &&
    css`
      width: 90vw;
    `}

  padding: 5px 16px;
  max-height: 80vh;
  overflow: auto;
  @media screen and (max-width: 767px) {
    overflow: auto;
    flex: 1;
    justify-content: center;
  }
`;

const Section2 = styled.div`
  width: 50vw;
  margin-right: 20px;
  border-radius: 0.3rem;
  background-color: #fff;
  animation: modal-show 0.3s;
  overflow: hidden;

  @media screen and (max-width: 767px) {
    margin: 15px 0px 15px 15px;
    width: 100%;
    /* margin: 0; */
    display: flex;
    flex-direction: column;
  }
`;

const Div = styled.div`
  @media screen and (max-width: 767px) {
    height: 40vh;
  }
`;

const Btn = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px 16px;
  text-align: right;
`;

const ModalModule = ({
  modalIsOpen,
  closeModal,
  children,
  title,
  map,
  onSubmit,
  day,
  fromLocName,
  toLocName,
  onSelect,
  onClickAddress,
}) => {
  return (
    <StyledModal
      className={modalIsOpen ? 'openModal modal' : 'modal'}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
    >
      <Section>
        <Header>
          <div>{title} 설정</div>
          <Close size="20" onClick={closeModal} tooltip={false} />
        </Header>
        <Main map={map}>{children}</Main>
        <Btn>
          <BlackCustomBtn onClick={onSubmit} value="완료" color="black" />
        </Btn>
      </Section>
      {/* {map && ( */}
      {map === 'memberLoc' && (
        <Section2>
          <Div>
            <Header>
              <div>kakao 지도</div>
              <Close size="20" onClick={onClickAddress} tooltip={false} />
            </Header>
            <MapContainer onSelect={onSelect} />
          </Div>
        </Section2>
      )}
      {/* {map === 'moveLoc' && (
            <>
              <div>
                kakao 지도 {fromLocName} -&gt; {toLocName}
              </div>
              <MapMove fromLocName={fromLocName} toLocName={toLocName} />
            </>
          )} */}
      {/* <Btn>
            <button onClick={onSubmit}>닫기</button>
          </Btn> */}
      {/* )} */}
    </StyledModal>
  );
};

export default ModalModule;

/* 해당 모듈은 아래와 같은 형태로 호출해야합니다
const [modalIsOpen, setModalIsOpen] = useState(false);

const openModal = () => {
  setModalIsOpen(true);
};

const closeModal = () => {
  setModalIsOpen(false);

  <ModalModule
  modalIsOpen={modalIsOpen}
  openModal={openModal}
  closeModal={closeModal}
  header="이동수단 설정"
>
  <MoveSettingChild /> 내부요소, children
</ModalModule>
*/
// 0313
