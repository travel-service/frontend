import Button from 'components/common/Button';
import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../../modal/modal';
import palette from '../../../lib/styles/palette';

const ContentsArea = styled.div`
  padding: 3rem;
  background-color: black;
  .area_grid {
    display: grid;
    grid-template-columns: 50% 50%;
  }
`

const WhiteBox = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 500px;
  height: 500px;
  margin-bottom: 20px;
  background: white;
  border-radius: 8px;
`;

const BlueBox = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 700px;
  height: 100px;
  background: skyblue;
  border-radius: 8px;
`;

const LocationBlock = styled.div`
  margin: 5px;
  width: 336px;
  height: 50px;
  left: 331px;
  top: 332px;
  background: violet;
`;

const BButton = styled.button`
  padding: 6px 12px;
  color: white;
  font-size: 10px;
  border: none;
  border-radius: 4px;
  background-color: #74b9ff;
`

const Location = {
  name: "박물관",
  address: "주소",
  tel: "010-1234-5678",
  category: "문화시설"
}

const List = styled.li`
  display: flex;
  list-style: none;
  margin-bottom: 11px;
  background-color: ${palette.gray[0]};
  box-shadow: 3px 3px 3px 3px ${palette.gray[5]};
  padding: 5px;
`;

const Img = styled.img`
  width: 5vw;
  height: 3.2vw;
`;

const ListDiv = styled.div`
  margin-left: 5px;
  font-weight: bold;
`;

const SelectArea = ({ location, index, type }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const OpenModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ContentsArea>
      <div className='area_gird'>
        <WhiteBox>
          <div>관광지 블록</div>
          <List onClick={OpenModal}>
                {/* <Img src={location.image} alt="img" /> */}
                <ListDiv>
                  한라산
                  {/* id는 일단 한글 name으로 설정해둚, 모든 location의 id가 다르게 생성되어야함 */}
                  <br />
                  2021.01.26
                </ListDiv>
          </List>
          <List onClick={OpenModal}>
                {/* <Img src={location.image} alt="img" /> */}
                <ListDiv>
                  한라산
                  {/* id는 일단 한글 name으로 설정해둚, 모든 location의 id가 다르게 생성되어야함 */}
                  <br />
                  2021.01.26
                </ListDiv>
                <BButton>선택</BButton>
          </List>
          <List onClick={OpenModal}>
                {/* <Img src={location.image} alt="img" /> */}
                <ListDiv>
                  한라산
                  {/* id는 일단 한글 name으로 설정해둚, 모든 location의 id가 다르게 생성되어야함 */}
                  <br />
                  2021.01.26
                </ListDiv>
                <BButton>선택</BButton>
          </List>
          <Modal open={modalOpen} close={closeModal} header="Modal heading">
            로케이션팝업
          </Modal>
        </WhiteBox>
        <WhiteBox>

        </WhiteBox>
      </div>
      <BlueBox>
        
      </BlueBox>
    </ContentsArea>
  );
};

export default SelectArea;