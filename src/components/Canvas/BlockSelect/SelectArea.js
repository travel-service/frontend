import React from 'react';
import styled from 'styled-components';
import LocationList from './LocationList'
import SelectedLocationList from './SelectedLocationList';
import {useStore} from '../../../lib/store';

const ContentsArea = styled.div`
  padding: 3rem;
  background-color: black;

  content1 {
    display: flex;
  }
  content2 {
    display: flex;

  }
`

const WhiteBox = styled.div`
  overflow: auto;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 30%;
  height: 500px;
  margin: 1%;
  background: white;
  border-radius: 8px;
`;

const BlueBox = styled.div`
  overflow: auto;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 30%;
  height: 200px;
  margin: 1%;
  background: skyblue;
  border-radius: 8px;
`;


const SelectArea = ({ location, selLocs }) => {

  const { Attractions, Restaurant, Lodge } = location
  // const { selAttractions, selRestaurant, selLodge } = selLocs
  
  // const { selLodge, selAttractions, selRestaurant } = useStore();
  const { selCateLoc } = useStore();
  const { selLodge, selAttractions, selRestaurant } = selCateLoc;

  return (
    <ContentsArea>
      <content1>
        <WhiteBox>
          <div>관광지 블록</div>
          <LocationList locations = {Attractions}/>
        </WhiteBox>
        <WhiteBox>
          <div>숙소 블록</div>
          <LocationList locations = {Lodge} />
        </WhiteBox>
        <WhiteBox>
          <div>음식점 블록</div>
          <LocationList locations = {Restaurant} />
        </WhiteBox>
      </content1>
      <content2>
        <BlueBox>
          <SelectedLocationList selectedLocations = {selAttractions} />
        </BlueBox>
        <BlueBox>
          <SelectedLocationList selectedLocations = {selLodge} />
        </BlueBox>
        <BlueBox>
          <SelectedLocationList selectedLocations = {selRestaurant} />
        </BlueBox>
      </content2>
    </ContentsArea>
  );
};

export default SelectArea;