import React from "react";
import styled from "styled-components";
import Button from 'components/common/NoticeButton';
import palette from 'lib/styles/palette';
import { Link } from 'react-router-dom';

const WriteActionButtonsBlock = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;
    button + button {
        margin-left: 0.5rem;
    }
`;

const StyledButton = styled(Button)`
    height: 2.125rem;
    & + & {
        margin-left: 50rem;
    }
`;

const WriteActionButtons = ({ onCancel, onPublish }) => {
    return (
        <WriteActionButtonsBlock>
            <StyledButton cyan onClick={onPublish}>
                포스트 등록
            </StyledButton>
            <StyledButton onClick={onCancel}>
                <Link to={ process.env.PUBLIC_URL + '/notice/noticeList'}>취소</Link>
            </StyledButton>
        </WriteActionButtonsBlock>
    );
};

export default WriteActionButtons;