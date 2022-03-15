import React from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import { useState } from 'react';
import Modal from '../../modal/modal';

const BButton = styled.button`
  padding: 6px 12px;
  color: white;
  font-size: 10px;
  border: none;
  border-radius: 4px;
  background-color: #74b9ff;
  z-index: 0;
`

const List = styled.li`
  display: flex;
  list-style: none;
  margin-bottom: 11px;
  background-color: ${palette.gray[0]};
  box-shadow: 3px 3px 3px 3px ${palette.gray[5]};
  padding: 5px;
`;

const ListDiv = styled.div`
  margin-left: 5px;
  font-weight: bold;
`;

const Location = () => {
    const [isSelect, setIsSelect] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const OpenModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };

    const locationInfo = {
        name: "한라산",
        address: "주소",
        tel: "010-1234-5678",
        category: "문화시설",
        info: "제주도의 대표적인 산인 한라산입니다"
    }

    return (
        <List>
            {/* <Img src={location.image} alt="img" /> */}
            <ListDiv onClick={OpenModal}>
                {locationInfo.name}
                <br />
                {locationInfo.address}
                <br />
                {locationInfo.tel}
            </ListDiv>
            <BButton onClick={() => setIsSelect(!isSelect)}>{isSelect ? '취소' : '선택'}</BButton>
            <Modal open={modalOpen} close={closeModal} header={locationInfo.name}>
                {locationInfo.info}
            </Modal>
        </List>
    );
};

export default Location;