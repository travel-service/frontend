import React from 'react';
import styled from 'styled-components';
import { Pc, Mobile } from 'lib/custom/responsive';

const Container = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
  padding-bottom: 80vh;
  @media screen and (max-width: 767px) {
    padding-bottom: 50vh;
  }
`;

const Iframe = styled.iframe`
  position: absolute;
  width: 100%;
  height: 100%;
`;

// let from = '만장굴';
// let to = '그랜드하얏트호텔제주';

const MapMove = ({ fromLocName, toLocName }) => {
  return (
    <Container>
      <Pc>
        <Iframe
          title="kakaoMap"
          src={`https://map.kakao.com/?sName=${fromLocName}&eName=${toLocName}`}
        />
      </Pc>
      <Mobile>
        <Iframe
          title="kakaoMap"
          src={`https://m.map.kakao.com/actions/routeView?`}
        />
      </Mobile>
    </Container>
  );
};

export default MapMove;

// https://m.map.kakao.com/actions/routeView?startLoc=${fromLocName}&sxEnc=MRVPMP&syEnc=YPRQPM&endLoc=${toLocName}&exEnc=MRVSUO&eyEnc=YPSUUU&ids=P8512414%2CP11209821&service=

// https://m.map.kakao.com/actions/routeView?startLoc=${fromLocName}&sxEnc=LSPQOS&syEnc=YRPS&endLoc=${toLocName}&exEnc=SVMPLQ&eyEnc=ELLOLN&ids=P7863269%2CP21135119&service=
