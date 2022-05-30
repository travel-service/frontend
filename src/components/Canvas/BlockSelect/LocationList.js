import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import Modal from '../../modal/modal';
import {useStore} from '../../../lib/store';
import BlockInfo from '../BlockInfo/BlockInfo';

const BButton = styled.button`
  padding: 6px 12px;
  color: white;
  font-size: 10px;
  border: none;
  border-radius: 4px;
  background-color: #74b9ff;
  z-index: 0;
`

const Block = styled.li`
  list-style: none;
  margin: 15px;
  background-color: ${palette.gray[0]};
  box-shadow: 3px 3px 3px 3px ${palette.gray[5]};
  padding: 2%;
  width: 33%;
`;

const BlockDiv = styled.div`
  margin-left: 5px;
  font-weight: bold;
`;

const Img = styled.img`
  width: 95%;
  height: 90%;
`;

const Blocks = styled.div`
  display: flex;
`

function Location ({location}) {
  const [modalOpen, setModalOpen] = useState(false);

  const OpenModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const {selCateLoc, onAdd, remove} = useStore();

  return (
    <Block>
      <div onClick={OpenModal}>
        <Img src={location.image} alt="img" />
        <BlockDiv>
          {location.name}
          <br />
          {location.address}
        </BlockDiv>
      </div>
      <BButton 
        onClick={() => {
          if (location.isSelect === false) {
            onAdd(location, location.type.type)
            location.isSelect = true
          }
          else {
            remove(location.id, location.type.type);
            location.isSelect = false
          }
          console.log(location)
        } 
      }>{location.isSelect ? '취소' : '선택'}</BButton>
      <BButton onClick={() => {console.log(selCateLoc)}}>
        test
      </BButton>
      <Modal open={modalOpen} close={closeModal} header={location.name}>
        {location.info}
        <BlockInfo type={location.type.type} id={location.id}/>
      </Modal>
    </Block>
  )
}

function LocationList ({locations}) {
  return (
    <Blocks>
      {locations.map(location => (
        <Location location={location} key={location.id} />
      ))}
    </Blocks>
  );
};

export default LocationList;
