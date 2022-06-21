import React, {useState} from 'react';
import styled from 'styled-components';
import { filterStore } from 'lib/filterStore';

const TypeSelect = styled.div`
  padding: 0.5em ;
  background-color: lemonchiffon;
  text-align: center;
  p1 {
    display: inline;
    padding: 0.5em;
  }
`


function TypeFilter() {

  const { attIsCheck, culIsCheck, fesIsCheck, lepIsCheck, 
    lodIsCheck, resIsCheck, selectedOnly, changeAttState, changeCulState, changeFesState,
    changeLepState, changeLodState, changeResState, changeSelState } = filterStore()

  return (
      <TypeSelect>
        <p1>
          <input 
            type="checkbox"
            checked={attIsCheck}
            onChange={changeAttState}
          />
          <span>관광지</span>
        </p1>
        <p1>
        <input 
          type="checkbox"
          checked={culIsCheck}
          onChange={changeCulState}
        />
          <span>문화시설</span>
        </p1>
        <p1>
        <input 
          type="checkbox"
          checked={fesIsCheck}
          onChange={changeFesState}
        />
          <span>축제</span>
        </p1>
        <p1>
        <input 
          type="checkbox"
          checked={lepIsCheck}
          onChange={changeLepState}
        />
          <span>레포츠</span>
        </p1>
        <p1>
        <input 
          type="checkbox"
          checked={lodIsCheck}
          onChange={changeLodState}
        />
          <span>숙소</span>
        </p1>
        <p1>
        <input 
          type="checkbox"
          checked={resIsCheck}
          onChange={changeResState}
        />
          <span>음식점</span>
        </p1>
        <p>
        <input 
            type="checkbox"
            checked={selectedOnly}
            onChange={changeSelState}
        />
          <span>선택한 블록만 보기</span>
        </p>
    </TypeSelect>
  );
};

export default TypeFilter;