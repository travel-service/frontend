import React from 'react';
import styled from 'styled-components';

const Displaybox = styled.div`
  display: flex;
  margin: 0px 0px 0px 90px;
  text-align: left;
  .travelRecent {
    font-size: 21px;
    font-weight: bold;
    text-align: left;
  }
`;
const Box = styled.div`
  margin: 0px 0px 0px 90px;
  .travelbox {
    display: grid;
    grid-template-rows: repeat(1, 180px);
    grid-template-columns: repeat(4, 180px);
    border-radius: 10px;
    justify-content: space-evenly;
  }
  .travelitem {
    border-radius: 10px;
    width: 170px;
    height: 170px;
    margin: 10px 0px 10px 0px;
    background: rgba(255, 241, 169, 0.5);
  }
`;

const MyTravel = () => {
  return (
    <div>
      <Displaybox>
        <div className="travelRecent">최근 플랜</div>
      </Displaybox>
      <Box>
        <div className="travelbox">
          <div className="travelitem"></div>
          <div className="travelitem"></div>
          <div className="travelitem"></div>
          <div className="travelitem"></div>
        </div>
      </Box>
    </div>
  );
};

export default MyTravel;
