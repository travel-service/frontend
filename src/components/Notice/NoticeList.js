import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Responsive from 'components/common/Responsive';
import Button from 'components/common/NoticeButton';
import palette from 'lib/styles/palette';
// import PaginationContainer from "../../containers/noitces/PaginationContainer";
import { Link } from 'react-router-dom';
import noticedata from '../../noticeData.json';
import axios from 'axios';
import Pagination from 'components/Notice/Pagination';
import { Grid } from '@mui/material';
import { flexbox } from '@mui/system';

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
/*list_tit: color: #ababab;*/
const List = styled.div`
  padding: 3rem;
  margin: 20px 20px;
  min-height: 1rem;
  text-align: center;
  .list_tit {
    color: #808000;
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

const PageN = styled.div`
  .pagincon {
    text-align: center;
    max-width: 700px;
    margin: 0 auto;
  }
  .pagincon li {
    list-style: none;
    padding: 10px;
    border: 1px solid #828282;
  }
  .pagination li {
    display: inline-block;
    background: #dedede;
    overflow: hidden;
  }
  .pagination li a {
    text-decoration: none;
    width: 10px;
    height: 10px;
    padding: 10px;
  }
  .pagination li a:foucus {
    background-color: #808000;
  }
`;

const Listnum = styled.div`
  .postnum {
    display: flex;
    padding: 10px;
  }
`;
const PostDate = () => {
  const [test, setTest] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/notices');
      setTest(response.data.reverse());
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = test.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <PostItem test={currentPosts} loading={loading} postnum={test.length} />
      <PageN>
        <div className="pagincon">
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={test.length}
            paginate={paginate}
          />
        </div>
      </PageN>
    </>
  );
};
const PostItem = ({ test, loading, postnum }) => {
  /* const [test, setTest] = useState('');
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/notices');
      setTest(response.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []); */

  if (loading) {
    return <PostItemBlock>Loading...</PostItemBlock>;
  }

  if (!test) return null;

  return (
    <>
      <List>
        <Listnum>
          <div className="postnum">
            총 <b style={{ color: `#808000 ` }}>{postnum}</b>
            건의 글이 등록되었습니다.
          </div>
        </Listnum>
        <ListInfo>
          <div className="list_grid list_tit">
            <div> 번호 </div>
            <div> 제목 </div>
            <div> 작성자 </div>
            <div> 작성일 </div>
            <div> 조회수 </div>
          </div>
        </ListInfo>
        {test && console.log(test)}
        {test.map((t) => (
          <PostItemBlock key={t.id}>
            <div className="list_grid">
              <div>{t.numId}</div>
              <div className="title">
                <Link
                  style={{ textDecoration: 'none', color: 'black' }}
                  to={
                    process.env.PUBLIC_URL + `/notice/noticeViewer/${t.numId}`
                  }
                >
                  <b>{t.title}</b>
                </Link>
              </div>
              <div>{t.author}</div>
              <div>{t.date}</div>
              <div>{t.views}</div>
            </div>
          </PostItemBlock>
        ))}
      </List>
      {/* {noticedata.notices.map((notices) => (
        <PostItemBlock>
          <div className="list_grid">
            <div>{notices.numId}</div>
            <div className="title">
              <Link
                style={{ textDecoration: 'none', color: 'black' }}
                to={
                  process.env.PUBLIC_URL +
                  `/notice/noticeViewer/${notices.numId}`
                }
              >
                <b>{notices.title}</b>
              </Link>
            </div>
            <div>{notices.author}</div>
            <div>{notices.date}</div>
            <div>{notices.views}</div>
          </div>
        </PostItemBlock>
      ))} */}
    </>
  );
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
      <PostItem />
      <PostDate />
    </PostListBlock>
  );
};

export default PostList;
