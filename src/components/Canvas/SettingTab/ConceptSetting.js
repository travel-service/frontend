import React from 'react';
import { useStore } from 'lib/store';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

const TitleSpan = styled.span`
  font-size: 1.2em;
`;
const ConceptSettingDiv = styled.div`
  margin-top: 10px;
  margin-left: 30px;
  width: 40%;
  height: 180px;
`;
const TooltipButton = styled.button`
  margin-left: 10px;
  border: 1px solid gray;
  cursor: pointer;
  border-radius: 100%;
  font-size: 1.2em;
  :hover {
    background: lightgray;
  }
`;
const CheckboxDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 20px;
  font-weight: bold;
`;
const ElementDiv = styled.li`
  list-style: none;
  width: 20%;
`;
const Concepts = [
  { id: 1, name: '우정', eword: 'Friendship' },
  { id: 2, name: '연인', eword: 'Lover' },
  { id: 3, name: '가족', eword: 'Family' },
  { id: 4, name: '혼자', eword: 'Alone' },
];

export const ConceptSetting = () => {
  const { userPlan, setConcept } = useStore();

  const onClickConcept = (checked, word) => {
    if (checked) {
      setConcept([...userPlan.concept, word]);
    } else {
      setConcept(userPlan.concept.filter((el) => el !== word));
    }
  };

  return (
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
        {Concepts.map((item, id) => {
          return (
            <ElementDiv key={id}>
              <input
                type="checkbox"
                onChange={(e) => {
                  onClickConcept(e.target.checked, `${item.eword}`);
                }}
              />{' '}
              {item.name}
            </ElementDiv>
          );
        })}
      </CheckboxDiv>
    </ConceptSettingDiv>
  );
};
