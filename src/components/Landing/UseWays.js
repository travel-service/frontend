import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  margin: 7%;
  /* top: 120px; */
  /* margin-bottom: 250px; */
`;

const List = styled.div`
  margin: 3% 7%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2%;
  /* justify-content: space-between; */
`;

const Way = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
  height: 180px;
  border-radius: 15px;
  background-color: #f2f2f2;
  padding: 15px;
  justify-content: space-around;
  flex-basis: 22%;
  margin: 1% 0px;
  /* flex-shrink: 1; */
  /* flex-grow: 1; */

  :hover {
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
    background-color: white;
    -webkit-transition: box-shadow ease-in-out 0.15s;
    transition: all ease-in-out 0.15;
  }

  @media screen and (max-width: 1023px) {
    flex-basis: 35%;
  }
  @media screen and (max-width: 767px) {
    flex-basis: 60%;
  }
`;

const Img = styled.img`
  height: 100px;
  width: 120px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const H3 = styled.h3`
  margin: 5px;
  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
`;

const Detail = styled.div`
  text-align: center;
  @media screen and (max-width: 767px) {
    font-size: 12px;
  }
`;

const UseWays = () => {
  return (
    <Container>
      <List>
        <Way>
          <Img src={process.env.PUBLIC_URL + '/images/block1.png'} alt="" />
          <Div>
            <H3>서비스 이용방법1</H3>
            <Detail>상세내용</Detail>
          </Div>
        </Way>
        <Way>
          <Img src={process.env.PUBLIC_URL + '/images/block2.png'} alt="" />
          <Div>
            <H3>서비스 이용방법2</H3>
            <Detail>상세내용</Detail>
          </Div>
        </Way>
        <Way>
          <Img src={process.env.PUBLIC_URL + '/images/block3.png'} alt="" />
          <Div>
            <H3>서비스 이용방법3</H3>
            <Detail>상세내용</Detail>
          </Div>
        </Way>
        <Way>
          <Img src={process.env.PUBLIC_URL + '/images/block4.png'} alt="" />
          <Div>
            <H3>서비스 이용방법4</H3>
            <Detail>상세내용</Detail>
          </Div>
        </Way>
      </List>
    </Container>
  );
};

export default UseWays;
