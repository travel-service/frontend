import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  top: 120px;
  margin-bottom: 250px;
`;

const List = styled.div`
  margin: 70px 7%;
  display: flex;
  justify-content: space-around;
  /* justify-content: space-between; */
`;

const Way = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 200px;
  border-radius: 15px;
  background-color: #f2f2f2;
  padding: 10px;
  justify-content: space-around;

  :hover {
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
    background-color: white;
    -webkit-transition: box-shadow ease-in-out 0.15s;
    transition: all ease-in-out 0.15;
  }
`;

const Img = styled.img`
  height: 100px;
  width: 120px;
`;

const UseWays = () => {
  return (
    <Container>
      <List>
        <Way>
          <Img src={process.env.PUBLIC_URL + '/images/block1.png'} alt="" />
          <div>
            <div>서비스 이용방법1</div>
            <div>상세내용</div>
          </div>
        </Way>
        <Way>
          <Img src={process.env.PUBLIC_URL + '/images/block2.png'} alt="" />
          <div>
            <div>서비스 이용방법2</div>
            <div>상세내용</div>
          </div>
        </Way>
        <Way>
          <Img src={process.env.PUBLIC_URL + '/images/block3.png'} alt="" />
          <div>
            <div>서비스 이용방법3</div>
            <div>상세내용</div>
          </div>
        </Way>
        <Way>
          <Img src={process.env.PUBLIC_URL + '/images/block4.png'} alt="" />
          <div>
            <div>서비스 이용방법4</div>
            <div>상세내용</div>
          </div>
        </Way>
      </List>
    </Container>
  );
};

export default UseWays;
