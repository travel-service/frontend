import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import Modal from '../../modal/modal';
import {useStore} from '../../../lib/store';
import BlockInfo from '../BlockInfo/BlockInfo';

const Block = styled.li`
  display: flex;
  list-style: none;
  margin-bottom: 11px;
  background-color: ${palette.gray[0]};
  box-shadow: 3px 3px 3px 3px ${palette.gray[5]};
  padding: 5px;

  text {
    display: flex;
    width: 85%;
  }
  buttoncont {
    width: 15%;
  }
`;

const BlockDiv = styled.div`
  margin-left: 5px;
  font-weight: bold;
`;

const Img = styled.img`
  width: 5vw;
  height: 3.2vw;
`;

const BButton = styled.button`
  padding: 6px 12px;
  color: white;
  font-size: 10px;
  border: none;
  border-radius: 4px;
  background-color: #74b9ff;
  z-index: 0;
  width: 95%;
  height: 95%;
`

const SelectedLocations = ({selectedLocation}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const OpenModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const {remove} = useStore();

  return (
    <Block>
      <text onClick={OpenModal}>
        <Img src={selectedLocation.image} alt="img" />
          <BlockDiv>
              {selectedLocation.name}
              <br />
              {selectedLocation.address}
          </BlockDiv>
      </text>
      <buttoncont>
        <BButton
            onClick={() => {
              console.log(selectedLocation.id)
              remove(selectedLocation.id, selectedLocation.type)
              }
            }>취소</BButton>
      </buttoncont>
      <Modal open={modalOpen} close={closeModal} header={selectedLocation.name}>
        {selectedLocation.info}
        <BlockInfo type={selectedLocation.type} id={selectedLocation.id}/>
      </Modal>
    </Block>
  )
}

const SelectedLocationList = ({ selectedLocations }) => {
    return (
        <div>
            {selectedLocations.map(selectedLocation => (
                <SelectedLocations selectedLocation={selectedLocation} key={selectedLocation.id}/>
            ))}
        </div>
    );
};

export default SelectedLocationList;