import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import styled from 'styled-components';
import palette from '../lib/styles/palette';
import Responsive from '../common/Responsive';

const EditorBlock = styled(Responsive)`
/* 페이지위아래여백 */
    padding-top: 3rem;
    padding-bottom: 0rem;
    /* border-top: 2px solid ${palette.gray[10]}; */
`;

const TitleInput = styled.input`
    font-size: 2rem;
    outline: none;
    margin-top: 1rem;
    padding-bottom: 0.5rem;
    border: none;
    border: 1px solid ${palette.gray[5]};
    margin-bottom: 2rem;
    width: 100%;
`;

const QuillWrapper = styled.div`
    /* 최소 크기 지정 및 padding제거 */
    .ql-editor {
        padding: 0;
        min-height: 320px;
        font-size: 1.125rem;
        line-height: 1.5;
        border: 1px solid ${palette.gray[5]}
    }
    .ql-editor.ql-blank::before {
        left: 0px;
    }
`;

const PageHeader = styled.div`
    text-align: center;
    border-bottom: 1px solid ${palette.gray[5]};
`

const Editor = () => {
    const quillElement = useRef(null);
    const quillInstance = useRef(null);

    useEffect(() => {
        quillInstance.current = new Quill(quillElement.current, {
            theme:'bubble',
            placeholder:'내용을 작성하세요...',
            modules:{
                toolbar:[
                    [{header:'1'}, {header:'2'}],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{list:'ordered'}, {list:'bullet'}],
                    ['blockquote', 'code-block', 'link', 'image'],
                ],
            },
        });
    },[]);

    return (
        <EditorBlock>
            <PageHeader>
                <h2>글쓰기</h2>
            </PageHeader>
            <TitleInput placeholder="제목을 입력하세요" />
            <QuillWrapper>
                <div ref={quillElement} />
            </QuillWrapper>
        </EditorBlock>
    );
};

export default Editor;