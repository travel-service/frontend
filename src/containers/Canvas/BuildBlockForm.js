import React, { useEffect } from 'react';
import styled from 'styled-components';
import MainArea from 'components/Canvas/BuildTab/MainArea';
import CreateLoc from 'lib/Icons/CreateLoc';
import palette from 'lib/styles/palette';

const Container = styled.div`
  /* position: absolute; */
  /* right: 220px; */
  display: flex;
  justify-content: space-between;
  /* margin-top: 10px; */
  background-color: ${palette.gray[3]};
  height: 70vh;
  overflow: auto;
  /* border-radius: 7px; */
`;

const Buttons = styled.div`
  width: 100px;
`;

// export let travelPlan = {};

const BuildBlockForm = () => {
  // 앞부분 api 설정이 되면 작성 예정(0518)
  useEffect(() => {
    // get api
    return {
      // post api
    };
  }, []);

  return (
    <Container>
      <MainArea />
      <Buttons>
        <CreateLoc size="30" />
      </Buttons>
    </Container>
  );
};

export default BuildBlockForm;
