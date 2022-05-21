import React from 'react';
import styled from 'styled-components';

const PlanContainer = styled.div`
  //display: flex;
  padding: 10px;
  border: 3px solid gray;
  //border-radius: 5px;
  width: 300px;
  height: 250px;
`;
const PlanTitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PlanNameDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  height: 30px;
  width: 80%;
`;
const PeriodsDiv = styled.div`
  text-align: center;
  font-size: 12px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  width: 20%;
`;
const ThumbnailContainer = styled.div`
  border: 1px solid lightgray;
  height: 70%;
  margin: 10px 10px 7px 10px;
  &:hover {
    background: gray;
    cursor: pointer;
  }
`;
const DateDiv = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`;
const MoreButton = styled.button`
  margin-right: 10px;
  border: none;
  font-weight: bold;
  background: none;
  cursor: pointer;
`;

const PlanLayout = () => {
  return (
    <PlanContainer>
      <PlanTitleDiv>
        <PlanNameDiv>새 여행</PlanNameDiv>
        <PeriodsDiv>3일</PeriodsDiv>
      </PlanTitleDiv>
      <ThumbnailContainer></ThumbnailContainer>
      <PlanTitleDiv>
        <DateDiv>2021.09.22</DateDiv>
        <MoreButton>:</MoreButton>
      </PlanTitleDiv>
    </PlanContainer>
  );
};

export default PlanLayout;
