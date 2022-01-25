import React/*, { useState }*/ from 'react';
import ReactTooltip from 'react-tooltip';
//import styled from 'styled-components';

/*const dateSet = styled.div`
  font-weight: 
`;*/

const TravelSettingForm = () => {
  //const [startDate, setstartDate] = useState(); 
  //const [endDate, setendDate] = useState();

  return (
    <div>
        <div>
            <span>1. 여행 일자 설정 </span>
            <button data-tip data-for='daysetting'>?
            </button>
            <ReactTooltip id='daysetting' place="right" type="info" effect="solid">
              <div>출발 블록을 생성하기 위해 입력해주세요.</div>
            </ReactTooltip>
            <div>
              <span>출발일 <input id='startdate'type='date' /> </span>
              <span>도착일 <input id='enddate' type='date' /> </span>
            </div>
            <div>
              총 숙박일 {/*계산*/}
            </div>
        </div>

        <div>
            <span>2. 여행지 설정 </span>
            <button data-tip data-for='departsetting'>?
            </button>
            <ReactTooltip id='departsetting' place="right" type="info" effect="solid">
              <div>현재 서비스 중인 여행지만 선택할 수 있습니다.<br />향후 서비스 될 여행지는 공지사항을 참고해주세요.</div>
            </ReactTooltip>
            {/*탭 추가*/}
        </div>

        <div>
            <span>3. 여행 컨셉 </span>
            <button data-tip data-for='conceptsetting'>?
            </button>
            <ReactTooltip id='conceptsetting' place="right" type="info" effect="solid">
              <div>블록 추천을 위해 누구와 함께 여행하는지 알려주세요.</div>
            </ReactTooltip>
            <div>
              <input id='0' type="checkbox" /> <span>우정</span>
              <input id='1' type="checkbox" /> <span>연인</span>
              <input id='2'type="checkbox" /> <span>가족</span>
              <input id='3'type="checkbox" /> <span>혼자</span>
            </div>
        </div>
    </div>
  );
};

export default TravelSettingForm;