import React, { useState } from 'react';
import { useStore } from 'lib/store';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import oc from 'open-color';

const TitleSpan = styled.span`
  font-size: 1.2em;
`;
const TooltipButton = styled.button`
  margin-left: 10px;
  border: 1px solid gray;
  border-radius: 100%;
  cursor: pointer;
  font-size: 1.2em;
  :hover {
    background: lightgray;
  }
`;
const DestinationSettingDiv = styled.div`
  margin-top: 10px;
  margin-left: 30px;
  height: 350px;
  width: 95%;
`;
const TabMenu = styled.ul`
  background: white;
  height: 12%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0;
  padding-left: 0.3%;
  padding-right: 0.3%;
  font-weight: bold;
  list-style: none;
  border: 1px solid;
  .submenu {
    flex: 0 1 50%;
    cursor: pointer;
    height: 80%;
    padding-top: 2px;
  }
  .focused {
    //background-color: ${oc.teal[6]};
    background-color: rgb(109, 144, 176);
    color: white;
  }
  & div.desc {
    text-align: center;
  }
`;
//탭내용
const Desc = styled.ul`
  background: white;
  display: flex;
  flex-flow: row wrap;
  justify-items: center;
  height: 80%;
  margin-top: 5px;
  margin-bottom: 0;
  padding: 20px;
  list-style: none;
  border: 1px solid;
  .submenu {
    flex: 0 1 19%;
    align-self: flex-start;
    cursor: pointer;
    text-align: center;
    border: 1px solid gray;
  }
  .focused {
    //background-color: ${oc.teal[3]};
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

const tabTitle = ['인기', '국내'];
const DestinationArr = {
  0: ['제주도'],
  1: ['제주도'],
};

export const DestSetting = () => {
  const { setDestination } = useStore();

  const [activeTab, setActiveTab] = useState(0);
  const [activeDest, setActiveDest] = useState(0);
  const onClickTab = (idx) => {
    setActiveTab(idx);
  };
  const onClickDestination = (destination, idx2) => {
    setActiveDest(idx2);
    setDestination(destination);
  };

  return (
    <DestinationSettingDiv>
      <TitleSpan>2. 여행지 설정 </TitleSpan>
      <TooltipButton data-tip data-for="departsetting">
        ?
      </TooltipButton>
      <ReactTooltip id="departsetting" place="right" type="info" effect="solid">
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
    </DestinationSettingDiv>
  );
};
