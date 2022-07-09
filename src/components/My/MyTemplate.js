import React from 'react';
import styled from 'styled-components';
import AuthHeader from 'components/Base/Header/AuthHeader'; // 랜딩페이지 헤더로 교체
import MyHeader from './MyHeader';

// 내정보 여행보관함 설정 메뉴바
const MyTemplateBlock = styled.div``;

const MyBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyTemplate = ({ children }) => {
  return (
    <MyTemplateBlock>
      <AuthHeader />
      <MyHeader />
      <MyBox>{children}</MyBox>
    </MyTemplateBlock>
  );
};

export default MyTemplate;
