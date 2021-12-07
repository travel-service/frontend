import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from 'lib/styles/palette';
import Button from 'components/common/Button';

const AuthFormBlock = styled.div`
  h3 {
    margin: 0px;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

const H2 = styled.h2`
  text-align: center;
  margin-top: 0;
  margin-bottom: 0;
`;

const H4 = styled.h4`
  margin-top: 10px;
  font-weight: lighter; 
  text-align: center;
  margin-bottom: 60px;
`;

const SpanRed = styled.span`
  color: rgb(255, 77, 77);
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1.5rem;
`;

const StyledLabel = styled.label`
`;

const StyledInput = styled.input`
  margin-right: 30px;
  font-size:1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 270px;
  &:focus {
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top:1rem;
  }
;`

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }  
  }
`;

const ButtonWidthMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const textMap = {
  login: '로그인',
  signup: '회원가입'
}

const AuthForm = ({ type, form, onChange, onSubmit }) => {
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <H2>{text}</H2>
      {type === 'signup' && (
        <H4>
          아래 ' <SpanRed>*</SpanRed> '항목은 필수입력 사항입니다.
        </H4>
      )}
      <form onSubmit={onSubmit}>
        <StyledDiv>
          <StyledLabel>아이디</StyledLabel>
          <StyledInput
            autoComplete="username"
            name="username"
            placeholder="아이디"
            onChange={onChange}
            value={form.username}
          />
        </StyledDiv>
        <StyledDiv>
          <StyledLabel>비밀번호</StyledLabel>
          <StyledInput
            autoComplete="new-password"
            name="password"
            placeholder="비밀번호"
            type="password"
            onChange={onChange}
            value={form.password}
          />
        </StyledDiv>
        {type === 'signup' && (
          <>
            <StyledDiv>
              <StyledLabel>비밀번호 확인</StyledLabel>
              <StyledInput
                autoComplete="new-password"
                name="passwordConfirm"
                placeholder="비밀번호 확인"
                type="password"
                onChange={onChange}
                value={form.passwordConfirm}
              />
            </StyledDiv>
            <StyledDiv>
              <StyledLabel>이름</StyledLabel>
              <StyledInput
                name="name"
                placeholder="이름"
                type="text"
                onChange={onChange}
                value={form.name}
              />
            </StyledDiv>
            <StyledDiv>
              <StyledLabel>닉네임</StyledLabel>
              <StyledInput
                name="nickname"
                placeholder="닉네임(2~30자)"
                type="text"
                onChange={onChange}
                value={form.nickname}
              />
            </StyledDiv>
            <StyledDiv>
              <StyledLabel>생년월일</StyledLabel>
              <StyledInput
                name="birthday"
                type="date"
                onChange={onChange}
                value={form.birthday}
              />
            </StyledDiv>
            <StyledDiv>
              <StyledLabel>휴대전화</StyledLabel>
              <StyledInput
                name="tel"
                placeholder="( - ) 없이 적어주세요."
                type="tel"
                onChange={onChange}
                value={form.tel}
              />
            </StyledDiv>
            <StyledDiv>
              <StyledLabel>성별</StyledLabel>
              <div
                style={{
                  width: "270px",
                  marginRight: "30px",
                }}
              >
                <StyledInput
                  style={{
                    width: "20px",
                    margin: "0px"
                  }}
                  name="gender"
                  type="radio"
                  value={form.gender}
                />남자
                <StyledInput
                  style={{
                    width: "20px",
                    margin: "0px",
                    marginLeft: "70px"
                  }}
                  name="gender"
                  type="radio"
                  value={form.gender}
                />여자
              </div>
            </StyledDiv>
            <StyledDiv>
              <StyledLabel>이메일</StyledLabel>
              <StyledInput
                name="email"
                placeholder="이메일"
                type="email"
                onChange={onChange}
                value={form.email}
              />
            </StyledDiv>
          </>
        )}
        <ButtonWidthMarginTop cyan fullWidth>
          {text}
        </ButtonWidthMarginTop>
      </form>
      <Footer>
        {type === 'login' ? (
          <Link to="../signup">회원가입</Link>
        ) : (
          <Link to="../login">로그인</Link>
        )}
      </Footer>
    </AuthFormBlock >
  );
};

export default AuthForm;