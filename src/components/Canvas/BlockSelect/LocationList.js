import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import ModalModule from 'components/common/modal/ModalModule';
import { useStore, sysLocStore } from '../../../lib/zustand/planStore';
import BlockInfo from '../BlockInfo/BlockInfo';

const BButton = styled.button`
  padding: 6px 12px;
  color: white;
  font-size: 10px;
  border: none;
  border-radius: 4px;
  background-color: #74b9ff;
  z-index: 0;
`;

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
  flex-wrap: wrap;
`;

function Location({ location }) {
  const [modalOpen, setModalOpen] = useState(false);

  const OpenModal = () => {
    setModalOpen(true);
    console.log(modalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const { onAdd, remove } = useStore();
  const { setLatLng } = sysLocStore();

  return (
    <Block>
      <div
        onClick={() => {
          OpenModal();
          setLatLng(location.locationId, location.type.type);
        }}
      >
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
            onAdd(location, location.type.type);
            location.isSelect = true;
          } else {
            remove(location.locationId, location.type.type);
            location.isSelect = false;
          }
        }}
      >
        {location.isSelect ? '취소' : '선택'}
      </BButton>
      <ModalModule
        modalIsOpen={modalOpen}
        closeModal={closeModal}
        header={location.name}
      >
        <BlockInfo type={location.type.type} id={location.locationId} />
      </ModalModule>
    </Block>
  );
}

function LocationList({ locations, search }) {
  var arr = locations.filter((val) => val.name.includes(search));
  return (
    <Blocks>
      {arr.map((location) => (
        <Location location={location} key={location.locationId} />
      ))}
    </Blocks>
  );
}

export default LocationList;
