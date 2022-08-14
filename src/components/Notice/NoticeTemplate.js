import React from 'react';
import styled from 'styled-components';
import Header from 'components/Landing/Header';

const NoticeTemplateBlock = styled.div`
  height: 100%;
  flex-direction: row;
  background-color: #ffd0c0;
`;

const NoticeTemplate = ({ children }) => {
  return (
    <NoticeTemplateBlock>
      <Header />
      {children}
    </NoticeTemplateBlock>
  );
};

export default NoticeTemplate;
