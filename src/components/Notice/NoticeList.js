import React from 'react';
import styled from 'styled-components';
import Responsive from 'components/common/Responsive';
import Button from 'components/common/NoticeButton';
import palette from 'lib/styles/palette';
// import PaginationContainer from "../../containers/noitces/PaginationContainer";
import { Link } from 'react-router-dom';
import noticedata from '../../noticeData.json';

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const PageHeader = styled.div`
  text-align: center;
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${palette.gray[5]};
`;

const PostItemBlock = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  &:first-child {
    padding-top: 1rem;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  p {
    margin-top: 1rem;
  }
`;

const SubInfo = styled.div`
  color: ${palette.gray[6]};

  span + span:before {
    color: ${palette.gray[4]};
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: '\\B7';
  }
`;

const Tags = styled.div`
  margin-top: 0.5rem;
  .tag {
    display: inline-block;
    color: ${palette.cyan[7]};
    text-decoration: none;
    margin-right: 0.5rem;
    &:hover {
      color: ${palette.cyan[6]};
    }
  }
`;

const List = styled.div`
  padding: 3rem;
  margin-left: 20px;
  margin-right: 20px;
  min-height: 1rem;
  text-align: center;
  .list_tit {
    color: #ababab;
  }
  .list_grid {
    display: grid;
    grid-template-columns: 10% 60% 10% 10% 10%;
  }
  .list_data {
    line-height: 40px;
  }
  .title {
    text-align: left;
  }
`;

const ListInfo = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: #f6f6f6;
  border-bottom: solid 1px #ababab;
`;

const PostItem = () => {
  return noticedata.notices.map((notices) => (
    <PostItemBlock>
      <div className="list_grid">
        <div>{notices.numId}</div>
        <div className="title">
          <Link
            style={{ textDecoration: 'none', color: 'black' }}
            to={process.env.PUBLIC_URL + '/notice/noticeViewer'}
          >
            <b>{notices.title}</b>
          </Link>
        </div>
        <div>{notices.author}</div>
        <div>{notices.date}</div>
        <div>{notices.views}</div>
      </div>
    </PostItemBlock>
  ));
  /*<PostItemBlock>
               { noticedata.notices.map(notices => (
                   <PostItemBlock>
                        <div className='list_grid'>
                            <div>{notices.numId}</div>
                            <li className='title'>
                                <Link style={{ textDecoration: 'none', color: 'black' }} to={ process.env.PUBLIC_URL + '/notice/noticeViewer'}>{notices.title}</Link>
                            </li>
                            <div>{notices.author}</div>
                            <div>{notices.date}</div>
                            <div>{notices.views}</div>
                        </div>
                    </PostItemBlock>
                ))}
                {/*
                <div>num</div>
                <li className='title'>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to={ process.env.PUBLIC_URL + '/notice/noticeViewer'}>notice</Link>
                </li>
                <div>관리자12</div>
                <div>{new Date().toLocaleDateString()}</div>
                <div>123</div>
            </div>
        </PostItemBlock>*/
};

const PostList = () => {
  return (
    <PostListBlock>
      <PageHeader>
        <h1>공지사항</h1>
      </PageHeader>
      <WritePostButtonWrapper>
        <Link to={process.env.PUBLIC_URL + '/notice/write'}>
          <Button>새 글 작성하기</Button>
        </Link>
      </WritePostButtonWrapper>
      <List>
        <ListInfo>
          <div className="list_grid list_tit">
            <div> 번호 </div>
            <div> 제목 </div>
            <div> 작성자 </div>
            <div> 작성일 </div>
            <div> 조회수 </div>
          </div>
        </ListInfo>
        <div>
          <PostItem />
          {/*
                    <PostItem />
                    <PostItem />
                    */}
        </div>
      </List>
    </PostListBlock>
  );
};

export default PostList;
