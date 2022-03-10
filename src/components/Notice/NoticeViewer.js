import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../../common/Responsive';
import Button from '../../common/button';
import { Link } from 'react-router-dom';

const PostViewerBlock = styled(Responsive)`
    margin-top: 4rem;
`;

const PostHead = styled.div`
    border-bottom: 1px solid ${palette.gray[2]};
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    h1{
        font-size: 3rem;
        line-height: 1.5;
        margin: 0;
    }
`;

const SubInfo = styled.div`
    margin-top: 1rem;
    color: ${palette.gray[6]};

    span + span:before {
        color: ${palette.gray[5]};
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

const PostContent = styled.div`
    font-size: 1.3125rem;
    color: ${palette.gray[8]};
`;

const PageHeader = styled.div`
    text-align: center;
    border-bottom: 1px solid ${palette.gray[5]};
`

const NoticeViewer = () => {
    return (
        <PostViewerBlock>
            <PageHeader>
                <h1>공지사항</h1>
            </PageHeader>
            <PostHead>
                <h2>제목</h2>
                <SubInfo>
                    <span>
                        <b>tester</b>
                    </span>
                    <span>{new Date().toLocaleDateString()}</span>
                    <span>123</span>
                </SubInfo>
            </PostHead>
            <PostContent
                dangerouslySetInnerHTML={{__html:'<p>HTML <b>내용</b>입니다.</p>'}}
            />
            <Button>
                <Link to="/notice">
                    목록
                </Link>
            </Button>
        </PostViewerBlock>

    );
};

export default NoticeViewer;