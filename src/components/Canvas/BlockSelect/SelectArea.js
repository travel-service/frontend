import Button from 'components/common/Button';
import React, { useRef, useState } from 'react';
import user from 'redux/modules/user';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import LocationList from './LocationList'
import SelectedLocationList from './SelectedLocationList';

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

  // const [locations, setLocations] = useState([
  //   {
  //     id: 1,
  //     name: "한라산",
  //     address: "주소",
  //     tel: "010-1234-5678",
  //     category: "문화시설",
  //     info: "제주도의 대표적인 산인 한라산입니다",
  //   },
  //   {
  //     id: 2,
  //     name: "박물관",
  //     address: "주소",
  //     tel: "010-1234-5678",
  //     category: "문화시설",
  //     info: "제주도의 대표적인 박물관입니다",
  //   },
  //   {
  //     id: 3,
  //     name: "식당",
  //     address: "주소",
  //     tel: "010-1234-5678",
  //     category: "식당",
  //     info: "제주도의 대표적인 식당입니다",
  //   }
  // ]);

  // const [selectedLocations, setSelectedLocations] =useState([
  //   {
  //     id: 1,
  //     locname: "한라산",
  //     address: "주소",
  //     tel: "010-1234-5678",
  //     category: "문화시설",
  //     info: "제주도의 대표적인 산인 한라산입니다",
  //   }]);

  // const onSelect = () => {
  //   const selectedLocation = {
  //     id,
  //     locname,
  //     address,
  //     tel,
  //     category,
  //     info 
  //   };

  //   setSelectedLocations(selectedLocations.concat(selectedLocation));
  // }

  return (
    <ContentsArea>
      <div className='area_gird'>
        <WhiteBox>
          <div>관광지 블록</div>
          <LocationList locations = {attractions} />
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
        {/* <SelectedLocationList selectedLocations = {selectedLocations} /> */}
      </BlueBox>
    </ContentsArea>
  );
};

export default SelectArea;