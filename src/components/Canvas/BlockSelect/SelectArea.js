import React, { useState } from 'react';
import styled from 'styled-components';
import LocationList from './LocationList';
import TypeFilter from './TypeFilter';
import { filterStore } from 'lib/filterStore';
import Map from 'containers/Canvas/MapContainer';

const ContentsArea = styled.div`
  overflow: auto;
  background-color: skyblue;
  
`

const FilterArea = styled.div`
  background-color: lemonchiffon;
`

const WhiteBox = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2em;
  margin: 2em;
  background: white;
  border-radius: 8px;
  width: 93%;
  height: 536px;
  overflow-y: scroll;
`;

const BlockListArea = styled.div`
  width: 50%;
  float: left;
  background-color: #e0ffdb;
`;

const MapArea = styled.div`
  width: 50%;
  float: left;
  background-color: brown;
`;

const SelectArea = ({ location, selLocs, coords }) => {
  const { Attraction, Culture, Festival, Leports, Lodge, Restaurant } = location;
  const [search, setSearch] = useState("");

  const { CoordsList } = coords;

  const {
    attIsCheck,
    culIsCheck,
    fesIsCheck,
    lepIsCheck,
    lodIsCheck,
    resIsCheck,
    selectedOnly,
  } = filterStore();
  
  const { selAttraction, selCulture, selFestival, selLeports, selLodge, selRestaurant } = selLocs

  var noneCheck =
    !attIsCheck &&
    !culIsCheck &&
    !fesIsCheck &&
    !lepIsCheck &&
    !lodIsCheck &&
    !resIsCheck;

  // const { selLodge, selAttraction, selRestaurant } = useStore();
  // const {
  //   selLodge,
  //   selAttraction,
  //   selRestaurant,
  //   selCulture,
  //   selFestival,
  //   selLeports,
  // } = selCateLoc;
  return (
    <ContentsArea>
      <FilterArea>
        <TypeFilter />
        <input 
          type="text"
          placeholder="블록 검색"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </FilterArea>
      <BlockListArea>
        <WhiteBox>
          { ((attIsCheck === true || noneCheck === true) && selectedOnly === false) && <LocationList locations = {Attraction} search = {search}/>}
          { ((culIsCheck === true || noneCheck === true) && selectedOnly === false) && <LocationList locations = {Culture} search = {search}/>}
          { ((fesIsCheck === true || noneCheck === true) && selectedOnly === false) && <LocationList locations = {Festival} search = {search}/>}
          { ((lepIsCheck === true || noneCheck === true) && selectedOnly === false) && <LocationList locations = {Leports} search = {search}/>}
          { ((lodIsCheck === true || noneCheck === true) && selectedOnly === false) && <LocationList locations = {Lodge} search = {search}/>}
          { ((resIsCheck === true || noneCheck === true) && selectedOnly === false) && <LocationList locations = {Restaurant} search = {search}/>}
          { ((attIsCheck === true || noneCheck === true) && selectedOnly === true) && <LocationList locations = {selAttraction} search = {search}/>}
          { ((culIsCheck === true || noneCheck === true) && selectedOnly === true) && <LocationList locations = {selCulture} search = {search}/>}
          { ((fesIsCheck === true || noneCheck === true) && selectedOnly === true) && <LocationList locations = {selFestival} search = {search}/>}
          { ((lepIsCheck === true || noneCheck === true) && selectedOnly === true) && <LocationList locations = {selLeports} search = {search}/>}
          { ((lodIsCheck === true || noneCheck === true) && selectedOnly === true) && <LocationList locations = {selLodge} search = {search}/>}
          { ((resIsCheck === true || noneCheck === true) && selectedOnly === true) && <LocationList locations = {selRestaurant} search = {search}/>}
        </WhiteBox> 
      </BlockListArea>
      <MapArea>
        <Map coords={CoordsList}></Map>
      </MapArea>
    </ContentsArea>
  );
};

export default SelectArea;
