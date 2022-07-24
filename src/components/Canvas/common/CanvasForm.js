import React, { useEffect } from 'react';
import styled from 'styled-components';
import BuildBlockForm from 'containers/Canvas/BuildBlockForm';
import TravelSettingForm from 'containers/Canvas/TravelSettingForm';
import Block from 'containers/Canvas/Block';
import { useState } from 'react';

const CanvasDiv = styled.div`
  flex: 1;
  display: flex;
  padding-bottom: 35px;
  /* height: 100%; */
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    padding-bottom: 0px;
    height: 100%;
  }
`;

const siteMap = ['setting', 'select', 'build', 'share'];

const CanvasForm = ({ type }) => {
  const [idx, setIdx] = useState(-1);

  useEffect(() => {
    setIdx(siteMap.indexOf(type));
  }, [type]);

  return (
    <CanvasDiv>
      {/* 프로세스 바 */}
      {type === 'setting' && <TravelSettingForm />}
      {type === 'select' && <Block />}
      {idx === 2 && <BuildBlockForm idx={idx} />}
      {/* {type === 'share' && <TravelSettingForm />} */}
    </CanvasDiv>
  );
};

export default CanvasForm;
