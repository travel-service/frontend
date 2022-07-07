import React, { useEffect } from 'react';
import styled from 'styled-components';
import BuildBlockForm from 'containers/Canvas/BuildBlockForm';
import TravelSettingForm from 'containers/Canvas/TravelSettingForm';
import Block from 'containers/Canvas/Block';
import { useState } from 'react';

const CanvasDiv = styled.div`
  height: 70vh;
  @media screen and (max-width: 767px) {
    flex: 1;
    display: flex;
    flex-direction: column;
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
      {/* <H1>{text}</H1> */}
      {/* <PlanName /> 어디에 넣을지.. */}
      {type === 'setting' && <TravelSettingForm />}
      {type === 'select' && <Block />}
      {idx === 2 && <BuildBlockForm idx={idx} />}
      {/* {type === 'share' && <TravelSettingForm />} */}
    </CanvasDiv>
  );
};

export default CanvasForm;
