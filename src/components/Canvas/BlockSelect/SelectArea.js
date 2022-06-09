import React from 'react';
import styled from 'styled-components';
import LocationList from './LocationList'
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

const BlockListArea = styled.div`
  width: 50%;
  float: left;
  background-color: #E0FFDB;
`

const MapArea = styled.div`
  width: 50%;
  float: left;
  background-color: brown;
`

const SelectArea = ({ location, selLocs, coords }) => {

  const { Attractions, Culture, Festival, Leports, Lodge, Restaurant } = location

  const { CoordsList } = coords

  const { attIsCheck, culIsCheck, fesIsCheck, lepIsCheck, lodIsCheck, resIsCheck } = filterStore();

  var noneCheck = !attIsCheck && !culIsCheck && !fesIsCheck && !lepIsCheck && !lodIsCheck && !resIsCheck;

  return (
    <ContentsArea>
      <TypeFilter />

      <BlockListArea>
        <WhiteBox>
          <div>
            { (attIsCheck === true || noneCheck === true) && <LocationList locations = {Attractions}/>}
          </div>
          <div>
            { (culIsCheck === true || noneCheck === true) && <LocationList locations = {Culture}/>}
          </div>
          <div>
            { (fesIsCheck === true || noneCheck === true) && <LocationList locations = {Festival}/>}
          </div>
          <div>
            { (lepIsCheck === true || noneCheck === true) && <LocationList locations = {Leports}/>}
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
        <Map coords={CoordsList}></Map>
      </MapArea>
    </ContentsArea>
  );
};

export default SelectArea;