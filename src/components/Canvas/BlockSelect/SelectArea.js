import Button from 'components/common/Button';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import LocationList from './LocationList'
import SelectedLocationList from './SelectedLocationList';
import useStore from './SelectedLocations';

const ContentsArea = styled.div`
  padding: 3rem;
  background-color: black;
  .area_grid {
    display: grid;
    grid-template-columns: 50% 50%;
  }
`

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
  height: 200px;
  background: skyblue;
  border-radius: 8px;
`;


const SelectArea = ({ location }) => {

  const { attractions, restaurants, accommodations } = location

  const {test} = useStore();

  return (
    <ContentsArea>
      <div className='area_gird'>
        <WhiteBox>
          <div>관광지 블록</div>
          <LocationList locations = {attractions} useStore = {useStore()}/>
        </WhiteBox>
        <WhiteBox>
          <div>음식점 블록</div>
          <LocationList locations = {restaurants} />
        </WhiteBox>
        <WhiteBox>
          <div>숙소 블록</div>
          <LocationList locations = {accommodations} />
        </WhiteBox>
      </div>
      <BlueBox>
        <SelectedLocationList selectedLocations = {test} />
      </BlueBox>
    </ContentsArea>
  );
};

export default SelectArea;