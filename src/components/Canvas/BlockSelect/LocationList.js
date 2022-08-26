import React, { useState } from 'react';
import styled from 'styled-components';
import ModalModule from 'components/common/modal/ModalModule';
import { useStore, sysLocStore } from '../../../lib/zustand/planStore';
import BlockInfo from '../BlockInfo/BlockInfo';

const InfoButton = styled.button`
  width: 100px;
  height: 25px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  z-index: 0;
  background: #FFFFFF;
  border: 1px solid #E5E7E8;
  border-radius: 5px;
`;

const Block = styled.li`
  list-style: none;
  margin: 13px;
  border: 1px solid #E5E7E8;
  border-radius: 10px;
  background: #FFFFFF;
  padding: 12px;
  width: 252px;
  height: 134px;
  display: flex;
`;

const BlockDiv = styled.div`
  margin-left: 5px;
  p {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 800;
    font-size: 13px;
    line-height: 16px;
    margin-top: 0px;
    margin-bottom: 5px;
    height: 45px;
  }
  address {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    color: #7E7E7E;
    height: 35px;
  }
`;

const Img = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 10px;
`;

const Blocks = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TextArea = styled.div`
  padding-left: 18px;
`

function Location({ location }) {
  const [modalOpen, setModalOpen] = useState(false);

  const OpenModal = () => {
    setModalOpen(true);
    console.log(modalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  console.log(location);
  const blockSelect = () => {
    if (location.isSelect === false) {
      onAdd(location, location.type.type);
      location.isSelect = true;
    } else {
      remove(location.locationId, location.type.type);
      location.isSelect = false;
    }
  }

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
      </div>
      <TextArea>
        <BlockDiv
          onClick={() => {
            OpenModal();
            setLatLng(location.locationId, location.type.type);
          }}
        >
          <p>
            {location.name}
          </p>
          <address>
            {location.address1}
          </address>
        </BlockDiv>
        <InfoButton
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
        </InfoButton>
      </TextArea>

      <ModalModule
        modalIsOpen={modalOpen}
        closeModal={closeModal}
        title={location.name}
        blockSelect={blockSelect}
        isSel={location.isSelect ? '취소' : '선택'}
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
