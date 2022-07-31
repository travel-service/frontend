import React from 'react';
import styled from 'styled-components';

const Displaybox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1px;
  .travelRecent {
    font-size: 21px;
    font-weight: bold;
  }
`;

const MyTravel = () => {
  return (
    <div>
      <Displaybox>
        <div className="travelRecent">최근 플랜</div>
      </Displaybox>
    </div>
  );
};

export default MyTravel;
