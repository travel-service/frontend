import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Close from 'lib/Icons/Close';
import 'lib/styles/Modal.css';
import MapContainer from 'components/Canvas/BuildTab/Map/MapContainer';
import MapMove from 'components/Canvas/BuildTab/Map/MapMove';
import BlackCustomBtn from 'components/Canvas/common/BlackCustomBtn';

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
  padding: 15px;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
`;

const Section = styled.div`
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: #fff;
  border-radius: 10px;
  animation: modal-show 0.3s;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  main {
    border: none;
    padding: 5px 16px;
    max-height: 55vh;
    overflow: auto;
  }

  @media screen and (max-width: 767px) {
    overflow: auto;

    main {
      flex: 1;
      /* display: flex; */
      justify-content: center;
    }

    margin-top: 15px;
    margin-bottom: 15px;
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
        <main>{children}</main>
        <Btn>
          <BlackCustomBtn onClick={onSubmit} value="완료" color="black" />
        </Btn>
      </Section>
      {map && (
        <Section2>
          {map === 'memberLoc' && (
            <Div>
              <Header>
                <div>kakao 지도</div>
                <Close size="20" onClick={onClickAddress} tooltip={false} />
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
          {/* <Btn>
            <button onClick={onSubmit}>닫기</button>
          </Btn> */}
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
