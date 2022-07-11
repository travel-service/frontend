import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Close from 'lib/Icons/Close';
import 'lib/styles/Modal.css';
import MapContainer from 'components/Canvas/BuildTab/Map/MapContainer';
import MapMove from 'components/Canvas/BuildTab/Map/MapMove';

const StyledModal = styled(Modal)`
  @media screen and (max-width: 767px) {
    flex-direction: column-reverse;
    justify-content: center;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  background-color: #f1f1f1;
  font-weight: 700;
`;

const Section = styled.div`
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: #fff;
  animation: modal-show 0.3s;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 767px) {
    width: 100%;
    overflow: auto;

    main {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    margin-top: 30px;
    margin-bottom: 30px;
  }
`;

const Section2 = styled.div`
  width: 65vw;
  margin-right: 20px;
  border-radius: 0.3rem;
  background-color: #fff;
  animation: modal-show 0.3s;
  overflow: hidden;

  @media screen and (max-width: 767px) {
    width: 100%;
    margin: 0;
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
        <main>{children}</main>
        <Btn>
          <button onClick={onSubmit}>확인</button>
        </Btn>
      </Section>
      {map && (
        <Section2>
          {map === 'memberLoc' && (
            <Div>
              <Header>
                <div>kakao 지도</div>
                <Close size="20" onClick={closeModal} tooltip={false} />
              </Header>
              <MapContainer onSelect={onSelect} />
            </Div>
          )}
          {map === 'moveLoc' && (
            <>
              <Header>
                <div>
                  kakao 지도 {fromLocName} -&gt; {toLocName}
                </div>
                <Close size="20" onClick={closeModal} tooltip={false} />
              </Header>
              <MapMove fromLocName={fromLocName} toLocName={toLocName} />
            </>
          )}
          <Btn>
            <button onClick={onSubmit}>닫기</button>
          </Btn>
        </Section2>
      )}
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
