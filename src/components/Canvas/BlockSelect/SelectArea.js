import Button from 'components/common/Button';
import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../../modal/modal';


const WhiteBox = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 500px;
  height: 500px;
  margin-bottom: 20px;
  background: white;
  border-radius: 8px;
`;

const BlueBox = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 700px;
  height: 100px;
  background: skyblue;
  border-radius: 8px;
`;

const LocationBlock = styled.div`
  margin: 5px;
  width: 336px;
  height: 50px;
  left: 331px;
  top: 332px;
  background: violet;
`;

const BButton = styled.button`
  padding: 6px 12px;
  color: white;
  font-size: 10px;
  border: none;
  border-radius: 4px;
  background-color: #74b9ff;
`

const Location = {
  name: "박물관",
  address: "주소",
  tel: "010-1234-5678",
  category: "문화시설"
}

const SelectArea = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const OpenModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <WhiteBox>
        <h1>api test123</h1>
        <LocationBlock onClick={OpenModal}>
          {Location.name} {Location.address} {Location.tel}
          <BButton>선택</BButton>
        </LocationBlock>
        <LocationBlock onClick={OpenModal}>test2</LocationBlock>
        <Modal open={modalOpen} close={closeModal} header="Modal heading">
          로케이션팝업
        </Modal>
      </WhiteBox>
      <BlueBox>
        
      </BlueBox>
    </div>
  );
};

export default SelectArea;