import React from 'react';
import styled from 'styled-components';
import LocationList from './LocationList'
import SelectedLocationList from './SelectedLocationList';
import {useStore} from '../../../lib/store';
import mapimg from './map.jpg'
import TypeFilter from './TypeFilter';
import { filterStore } from 'lib/filterStore';
import Map from 'containers/Canvas/MapContainer'

const ContentsArea = styled.div`
  overflow: auto;
  background-color: skyblue;
`

const WhiteBox = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2em;
  margin: 2em;
  background: white;
  border-radius: 8px;
  width: 90%;
`;

const BlueBox = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 500px;
  height: 200px;
  margin: 5px;
  background: skyblue;
  border-radius: 8px;
  float: left;
`;

const BlockListArea = styled.div`
  width: 60%;
  float: left;
  background-color: #E0FFDB;
`

const MapArea = styled.div`
  width: 40%;
  float: left;
  background-color: brown;
`

const SelectArea = ({ location, selLocs }) => {

  const { Attractions, Restaurant, Lodge } = location
  // const { selAttractions, selRestaurant, selLodge } = selLocs
  
  // const { selLodge, selAttractions, selRestaurant } = useStore();
  const { selCateLoc } = useStore();
  const { selLodge, selAttractions, selRestaurant } = selCateLoc;
  const { attIsCheck, culIsCheck, fesIsCheck, lepIsCheck, lodIsCheck, resIsCheck } = filterStore();

  var noneCheck = !attIsCheck && !lodIsCheck && !resIsCheck;

  return (
    <ContentsArea>
      <TypeFilter />

      <BlockListArea>
        <WhiteBox>
          {/* <div>전체 블록</div> */}
          <div>
            { (attIsCheck === true || noneCheck === true) && <LocationList locations = {Attractions}/>}
          </div>
          <div>
            { (lodIsCheck === true || noneCheck === true) && <LocationList locations = {Lodge}/>}
          </div>
          <div>
            { (resIsCheck === true || noneCheck === true) && <LocationList locations = {Restaurant}/>}
          </div>
        </WhiteBox>
      </BlockListArea>
      <MapArea>
        <Map></Map>
        {/* <img src={mapimg} /> */}
      </MapArea>
      {/* <WhiteBox>
        <div>관광지 블록</div>
        <LocationList locations = {Attractions}/>
      </WhiteBox>
      <WhiteBox>
        <div>음식점 블록</div>
        <LocationList locations = {Restaurant} />
      </WhiteBox>
      <WhiteBox>
        <div>숙소 블록</div>
        <LocationList locations = {Lodge} />
      </WhiteBox>
      <BlueBox>
        <SelectedLocationList selectedLocations = {selAttractions} />
      </BlueBox>
      <BlueBox>
        <SelectedLocationList selectedLocations = {selLodge} />
      </BlueBox>
      <BlueBox>
        <SelectedLocationList selectedLocations = {selRestaurant} />
      </BlueBox> */}
    </ContentsArea>
  );
};

export default SelectArea;