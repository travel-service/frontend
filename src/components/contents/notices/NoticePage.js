import React from "react";
import styled from 'styled-components';
import Responsive from "../../common/Responsive";
import Button from "../../common/button";
import palette from '../../lib/styles/palette'

const PostListBlock = styled(Responsive)`
    margin-top: 3rem;
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
        font-size:2rem;
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
    .list_tit {
        border-bottom: solid 1px #ababab;
        color: #ababab;
    }
    .list_grid {
        display: grid;
        grid-template-columns: 10% 60% 10% 10% 10%;
    }
    .list_data {
        line-height: 40px;
    }
    .acenter {
        text-align: center;
    }
`

const PostItem = () => {
    return (
        <PostItemBlock>
            <div className='list_grid'>
                <div>num</div>
                <div>제목</div>
                <div className='acenter'>관리자12</div>
                <div className='acenter'>{new Date().toLocaleDateString()}</div>                
                <div className='acenter'>123</div>
            </div>
        </PostItemBlock>
    );
};

const PostList = () => {
    return (
        <PostListBlock>
            <WritePostButtonWrapper>
                <Button cyan to="/write">
                    새 글 작성하기
                </Button>
            </WritePostButtonWrapper>
            <List>
                <div className='list_grid list_tit'>
                    <div> 번호 </div>
                    <div> 제목 </div>
                    <div className='acenter'> 작성자 </div>
                    <div className='acenter'> 작성일 </div>
                    <div className='acenter'> 조회수 </div>
                </div>
                <div>
                    <PostItem />
                    <PostItem />
                    <PostItem />
                </div>
            </List>
        </PostListBlock>
    );
};

export default PostList;