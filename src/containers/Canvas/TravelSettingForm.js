import React from 'react';
import ReactTooltip from 'react-tooltip';
//import styled from 'styled-components';

const TravelSettingForm = () => {

  return (
    <div>
        <div>
            1. 여행 일자 설정 
            <button data-tip="React-tooltip">
              ?</button>
            <ReactTooltip place="right" type="info" effect="solid">
              <span>rrkrk</span>
            </ReactTooltip>
            <input type="date"></input>
        </div>
        <div>
            2. 여행지 설정 <button>?</button>
        </div>
        <div>
            3. 여행 컨셉 <button>?</button>
        </div>
    </div>
  );
};

export default TravelSettingForm;