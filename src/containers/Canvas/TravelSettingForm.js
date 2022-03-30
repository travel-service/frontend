import React, { useState } from 'react';
import { useStore } from 'lib/store';
import ReactTooltip from 'react-tooltip';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import oc from 'open-color';
import Close from 'lib/Icons/Close';

const TitleSpan = styled.span`
  font-size: 1.2em;
`;

const DateSettingDiv = styled.div`
  position: relative;
  margin-top: 10px;
  margin-left: 30px;
  height: 100px;
  width: 95%;
`;

const DepartSettingDiv = styled.div`
  position: relative;
  margin-top: 10px;
  margin-left: 30px;
  height: 350px;
  width: 95%;
`;

const ConceptSettingDiv = styled.div`
  position: relative;
  margin-top: 10px;
  margin-left: 30px;
  width: 40%;
  height: 180px;
`;

const ThumbnailSettingDiv = styled.div`
  position: relative;
  margin-top: 10px;
  margin-left: 30px;
  width: 47%;
  height: 180px;
`;

const Datediv = styled.div`
  display: flex;
  width: 65%;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  font-weight: bold;
`;

const TooltipButton = styled.button`
  margin: 0;
  margin-left: 10px;
  border: 1px solid gray;
  cursor: pointer;
  border-radius: 100%;
  font-size: 1.2em;
  :hover {
    background: lightgray;
  }
`;

const TabMenu = styled.ul`
  background-color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  list-style: none;
  margin: 0;
  height: 12%;
  border: 1px solid;
  padding-left: 0.3%;
  padding-right: 0.3%;
  .submenu {
    flex: 0 1 50%;
    cursor: pointer;
    height: 80%;
    padding-top: 2px;
  }
  .focused {
    /* background-color: ${oc.teal[6]}; */
    background-color: rgb(109, 144, 176);
    color: white;
  }
  & div.desc {
    text-align: center;
  }
`;

//탭내용
const Desc = styled.ul`
  background-color: white;
  display: flex;
  flex-flow: row wrap;
  justify-items: center;
  align-content: flex-start;
  height: 80%;
  padding: 20px;
  list-style: none;
  margin-top: 5px;
  margin-bottom: 0;
  border: 1px solid;
  .submenu {
    flex: 0 1 19%;
    align-self: flex-start;
    cursor: pointer;
    text-align: center;
    border: 1px solid gray;
  }
  .focused {
    /* background-color: ${oc.teal[3]}; */
    background-color: rgb(109, 144, 176);
    color: white;
    height: 100%;
    align-items: center;
  }
`;

const TabDiv = styled.div`
  height: 90%;
  padding-left: 20px;
  padding-top: 20px;
  width: 95%;
`;

const CheckboxDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr 2fr);
  margin-top: 20px;
  margin-left: 20px;
  font-weight: bold;
`;
const ThumbnailboxDiv = styled.div`
  display: flex;
  align-items: flex-end;
  height: 130px;
  margin: 20px;
`;
const PreviewboxDiv = styled.div`
  align-items: center;
  ${({ uploading }) => {
    return uploading
      ? `width: 100px;
      margin-left: 5%;`
      : `width: 173px;
    height: 130px;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    color: white;`;
  }};
`;
const StyledFile = styled.label`
  text-align: center;
  justify-content: center;
  border: 1px solid lightgray;
  border-radius: 5px;
  background: white;
  padding-right: 7%;
  padding-left: 7%;
  padding-top: 2%;
  padding-bottom: 2%;
  cursor: pointer;
  :hover {
    background: lightgray;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);
  }
`;

const tabTitle = ['인기', '국내'];
const DestinationArr = {
  0: ['제주도'],
  1: ['제주도'],
};

const TravelSettingForm = () => {
  const {
    userPlan,
    setDepart,
    setPeriods,
    setConcept,
    setDestination,
    setThumbnail,
  } = useStore();

  // 여행 일자
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const onClickStartDate = (date) => {
    setStartDate(date);
    setDepart(date);
  };
  const onClickEndDate = (date) => {
    setEndDate(date);
    const diff = date.getTime() - startDate.getTime();
    const pPeriods = Math.ceil(diff / 1000 / 60 / 60 / 24) + 1;
    setPeriods(pPeriods);
  };

  //여행지
  const [activeTab, setActiveTab] = useState(0);
  const [activeDest, setActiveDest] = useState(0);
  const onClickTab = (idx) => {
    setActiveTab(idx);
  };
  const onClickDestination = (destination, idx2) => {
    setActiveDest(idx2);
    setDestination(destination);
  };

  //여행 컨셉
  const onClickConcept = (checked, id) => {
    if (checked) {
      setConcept([...userPlan.concept, id]);
    } else {
      setConcept(userPlan.concept.filter((el) => el !== id));
    }
  };

  //이미지 업로드
  const [imgData, setImgData] = useState(null);

  const insertImg = (e) => {
    let reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onloadend = () => {
      const previewImgUrl = reader.result;

      if (previewImgUrl) {
        const formData = new FormData();
        formData.append('file', previewImgUrl);
        setThumbnail(formData);

        setImgData(previewImgUrl);
      }
    };
  };
  const deleteImg = () => {
    setImgData(null);
    setThumbnail([]);
  };
  console.log(userPlan);
  return (
    <div>
      <DateSettingDiv>
        <TitleSpan>1. 여행 일자 설정 </TitleSpan>
        <TooltipButton data-tip data-for="datesetting">
          ?
        </TooltipButton>
        <ReactTooltip id="datesetting" place="right" type="info" effect="solid">
          <div>출발 블록을 생성하기 위해 입력해주세요.</div>
        </ReactTooltip>
        <Datediv>
          <span>출발일 </span>
          <span>
            <DatePicker
              dateFormat="yyyy/MM/dd"
              showPopperArrow={false}
              selected={startDate}
              onChange={(date) => onClickStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
            />
          </span>
          <span>도착일 </span>
          <span>
            <DatePicker
              dateFormat="yyyy/MM/dd"
              showPopperArrow={false}
              selected={endDate}
              onChange={(date) => onClickEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </span>
          <div>
            {userPlan.periods - 1}박 {userPlan.periods}일
          </div>
        </Datediv>
      </DateSettingDiv>

      <DepartSettingDiv>
        <TitleSpan>2. 여행지 설정 </TitleSpan>
        <TooltipButton data-tip data-for="departsetting">
          ?
        </TooltipButton>
        <ReactTooltip
          id="departsetting"
          place="right"
          type="info"
          effect="solid"
        >
          <div>
            현재 서비스 중인 여행지만 선택할 수 있습니다.
            <br />
            향후 서비스 될 여행지는 공지사항을 참고해주세요.
          </div>
        </ReactTooltip>
        <TabDiv>
          <TabMenu>
            {tabTitle.map((el, idx) => {
              return (
                <li
                  key={idx}
                  className={`${
                    idx === activeTab ? 'submenu focused' : 'submenu'
                  }`}
                  onClick={() => onClickTab(idx)}
                >
                  {el}
                </li>
              );
            })}
          </TabMenu>
          <Desc>
            {DestinationArr[activeTab].map((destination, idx2) => {
              return (
                <li
                  key={idx2}
                  className={`${
                    idx2 === activeDest ? 'submenu focused' : 'submenu'
                  }`}
                  onClick={() => onClickDestination(destination, idx2)}
                >
                  {destination}
                </li>
              );
            })}
          </Desc>
        </TabDiv>
      </DepartSettingDiv>

      <div style={{ display: 'flex' }}>
        <ConceptSettingDiv>
          <TitleSpan>3. 여행 컨셉 </TitleSpan>
          <TooltipButton data-tip data-for="conceptsetting">
            ?
          </TooltipButton>
          <ReactTooltip
            id="conceptsetting"
            place="right"
            type="info"
            effect="solid"
          >
            <div>블록 추천을 위해 누구와 함께 여행하는지 알려주세요.</div>
          </ReactTooltip>
          <CheckboxDiv>
            <input
              type="checkbox"
              onChange={(e) => {
                onClickConcept(e.target.checked, 'Friendship');
              }}
            />{' '}
            <span>우정</span>
            <input
              type="checkbox"
              onChange={(e) => {
                onClickConcept(e.target.checked, 'Lover');
              }}
            />{' '}
            <span>연인</span>
            <input
              type="checkbox"
              onChange={(e) => {
                onClickConcept(e.target.checked, 'Family');
              }}
            />{' '}
            <span>가족</span>
            <input
              type="checkbox"
              onChange={(e) => {
                onClickConcept(e.target.checked, 'Alone');
              }}
            />{' '}
            <span>혼자</span>
          </CheckboxDiv>
        </ConceptSettingDiv>

        <ThumbnailSettingDiv>
          <TitleSpan>4. 썸네일 등록 </TitleSpan>
          <TooltipButton data-tip data-for="thumbnailsetting">
            ?
          </TooltipButton>
          <ReactTooltip
            id="thumbnailsetting"
            place="right"
            type="info"
            effect="solid"
          >
            <div>플랜을 원하는 사진으로 꾸며보세요.</div>
          </ReactTooltip>
          <ThumbnailboxDiv>
            <PreviewboxDiv uploading={false}>
              <img src={imgData} alt="미리보기" height="130" />
            </PreviewboxDiv>
            <PreviewboxDiv uploading={true}>
              <form encType="multipart/form-data">
                <StyledFile htmlFor="input-file">파일 선택</StyledFile>
                <input
                  type="file"
                  id="input-file"
                  accept="image/*"
                  onChange={(e) => insertImg(e)}
                  style={{ display: 'none' }}
                />
              </form>
            </PreviewboxDiv>
            <Close size="20" onClick={() => deleteImg()} />
          </ThumbnailboxDiv>
        </ThumbnailSettingDiv>
      </div>
    </div>
  );
};

export default TravelSettingForm;
