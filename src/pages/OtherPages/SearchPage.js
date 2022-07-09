import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';

const sampleLocation = {
  Attraction: [
    {
      name: '천지연폭포 (제주도 국가지질공원)',
      id: 3,
      type: {
        type: 'ATTRACTION',
      },
      address1: '제주특별자치도 서귀포시 천지동',
      address2: 'null',
      image: 'https://i.ibb.co/MVvvPsX/image.jpg',
    },
    {
      name: '천지연폭포 (제주도 국가지질공원)',
      id: 3,
      type: {
        type: 'ATTRACTION',
      },
      address1: '제주특별자치도 서귀포시 천지동',
      address2: 'null',
      image: 'https://i.ibb.co/MVvvPsX/image.jpg',
    },
    {
      name: '천지연폭포 (제주도 국가지질공원)',
      id: 3,
      type: {
        type: 'ATTRACTION',
      },
      address1: '제주특별자치도 서귀포시 천지동',
      address2: 'null',
      image: 'https://i.ibb.co/MVvvPsX/image.jpg',
    },
    {
      name: '천지연폭포 (제주도 국가지질공원)',
      id: 3,
      type: {
        type: 'ATTRACTION',
      },
      address1: '제주특별자치도 서귀포시 천지동',
      address2: 'null',
      image: 'https://i.ibb.co/MVvvPsX/image.jpg',
    },
  ],
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  margin: 50px 0px;
  display: flex;
  /* margin-top: 50px; */
  justify-content: space-between;
  align-items: center;
  width: 500px;
  height: 50px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 4px 4px 4px grey;
  padding-right: 20px;
  @media screen and (max-width: 767px) {
    height: 40px;
    width: 60%;
  }
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const SearchIcon = styled(MdSearch)`
  font-size: 25px;
  margin: 0px 20px;
  opacity: 0.5;
  @media screen and (max-width: 767px) {
    margin: 0px 10px;
  }
`;

const Input = styled.input`
  padding: 0;
  width: 100%;
  /* width: 500px; */
  font-size: 14px;
  border: none;
  :focus {
    outline: none;
  }
  ::placeholder {
    font-size: 14px;
  }
  @media screen and (max-width: 767px) {
    /* width: 200px; */
  }
`;

const SearchDes = styled(Link)`
  text-decoration: none;
`;

const GoDirBtn = styled(Link)`
  text-decoration: none;
  background-color: #f16b6c;
  width: 200px;
  height: 50px;
  color: white;
  border-radius: 5px;
  box-shadow: 4px 4px 4px grey;
  font-size: 18px;
  font-weight: 520;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const Recommend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RecLoc = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* width: 100vw; */
`;

const Location = styled.div`
  border-radius: 5px;
  /* flex: 1 0 21%; */
  margin: 20px;
  background-color: skyblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 200px;
`;

const Img = styled.img`
  width: 200px;
`;

const H2 = styled.h2``;

const SearchPage = () => {
  return (
    // 0703 작업 진행 예정
    <PageTemplate>
      <Container>
        <InputContainer>
          <Div>
            <SearchIcon />
            <Input placeholder="현재는 제주도로만 서비스중!" />
          </Div>
          {/* 여행지역 검색 api */}
          <SearchDes to={process.env.PUBLIC_URL + '/search'}>검색</SearchDes>
        </InputContainer>
        <GoDirBtn to={process.env.PUBLIC_URL + '/canvas/setting'}>
          제주도로 여행하기!!
        </GoDirBtn>
        <Recommend>
          <H2>"제주도"의 추천 여행지</H2>
          <RecLoc>
            {/* location get api*/}
            {sampleLocation.Attraction.map((location, i) => {
              return (
                <Location key={i}>
                  <div>{location.name}</div>
                  <Img alt="" src={location.image} />
                  <div>{location.address1}</div>
                </Location>
              );
            })}
          </RecLoc>
        </Recommend>
      </Container>
    </PageTemplate>
  );
};

export default SearchPage;
