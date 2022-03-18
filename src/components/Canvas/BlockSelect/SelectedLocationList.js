import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import Modal from '../../modal/modal';

const Block = styled.li`
  display: flex;
  list-style: none;
  margin-bottom: 11px;
  background-color: ${palette.gray[0]};
  box-shadow: 3px 3px 3px 3px ${palette.gray[5]};
  padding: 5px;
`;

const BlockDiv = styled.div`
  margin-left: 5px;
  font-weight: bold;
`;

const SelectedLocations = ({selectedLocation}) => {
    const [modalOpen, setModalOpen] = useState(false);

    const OpenModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };

    return (
        <Block>
            {/* <Img src={location.image} alt="img" /> */}
            <BlockDiv onClick={OpenModal}>
                {selectedLocation.name}
                <br />
                {selectedLocation.address}
                <br />
                {selectedLocation.tel}
            </BlockDiv>
            <Modal open={modalOpen} close={closeModal} header={selectedLocation.name}>
            {selectedLocation.info}
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