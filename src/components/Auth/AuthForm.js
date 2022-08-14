import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from 'lib/styles/palette';
import Button from 'components/common/Button';

const AuthFormBlock = styled.div`
  width: 100%;
`;

const Div = styled.div``;

const H2 = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0;
`;

const Form = styled.form`
  margin: auto;
  width: 70%;
`;

const SpanRed = styled.span`
  display: flex;
  justify-content: flex-end;
  text-align: center;
  font-size: 0.875rem;
  color: blue;
  ${(props) =>
    props.detail &&
    css`
      color: red;
      font-size: 0.95rem;
    `}
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  margin: 5px 0px;
  width: 100%;
`;

const InputHeader = styled.div`
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  padding-left: 30px;
  font-size: 1rem;
  border: 1px solid ${palette.gray[5]};
  border-radius: 8px;
  outline: none;
  width: 100%;
  height: 45px;
  float: right;
  &:focus {
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
  @media screen and (max-width: 767px) {
    height: 40px;
    padding-left: 10px;
    font-size: 0.9rem;
  }
`;

const Select = styled.select`
  width: 100%;
  padding-left: 30px;
  font-size: 1rem;
  border: 1px solid ${palette.gray[5]};
  border-radius: 8px;
  outline: none;
  height: 45px;
  &:focus {
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
  @media screen and (max-width: 767px) {
    height: 40px;
  }
`;

const Footer = styled.div`
  margin-top: 20px;
  a {
    color: black;
    text-decoration: none;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    &:hover {
      color: ${palette.gray[8]};
    }
  }
`;

const Links = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ButtonWidthMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const InputDiv = styled.div`
  width: 70%;
  display: flex;

  button {
    margin-left: 10px;
    width: 100px;
    /* width: 100px; */
    border-radius: 10px;
    background: ${palette.red1};
    border: none;
    color: white;
    font-weight: 550;
  }
`;

const textMap = {
  login: '로그인',
  signup: '회원가입',
};
/**
 * 에러를 보여 줍니다.
 */
const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const AuthForm = ({
  type,
  form,
  onChange,
  onSubmit,
  error,
  onBlur,
  detailErr,
  checkValue,
}) => {
  const text = textMap[type];

  return (
    <>
      <AuthFormBlock>
        <Div>
          <H2>
            {/* {text} */}
            {type === 'signup' && <SpanRed>( * 필수항목 )</SpanRed>}
          </H2>
          <Form onSubmit={onSubmit}>
            <StyledDiv>
              <InputHeader>
                {type === 'signup' && <SpanRed>*</SpanRed>}
                아이디
              </InputHeader>
              <InputDiv>
                <StyledInput
                  autoComplete="username"
                  name="userName"
                  placeholder="아이디 (20자 이내)"
                  onChange={onChange}
                  value={form.userName}
                  onBlur={onBlur}
                  maxLength="20"
                  minLength="4"
                />
                {type === 'signup' && (
                  <button name="userName" onClick={(e) => checkValue(e)}>
                    중복 검사
                  </button>
                )}
              </InputDiv>
            </StyledDiv>
            {type === 'signup' && detailErr.userName.message && (
              <SpanRed detail={detailErr.userName.status === 1}>
                {detailErr.userName.message}
              </SpanRed>
            )}
            <StyledDiv>
              <InputHeader>
                {type === 'signup' && <SpanRed>*</SpanRed>}
                비밀번호
              </InputHeader>
              <InputDiv>
                <StyledInput
                  autoComplete="new-password"
                  name="password"
                  placeholder="비밀번호 (8자 이상, 20자 이내)"
                  type="password"
                  onChange={onChange}
                  value={form.password}
                  onBlur={onBlur}
                  maxLength="20"
                  minLength="8"
                />
              </InputDiv>
            </StyledDiv>
            {type === 'signup' && (
              <SpanRed> - 영문자, 숫자, 특수문자 조합 8자리 이상</SpanRed>
            )}
            {type === 'signup' && detailErr.password && (
              <SpanRed detail>{detailErr.password}</SpanRed>
            )}
            {type === 'signup' && (
              <>
                <StyledDiv>
                  <InputHeader>
                    <SpanRed>*</SpanRed>
                    비밀번호 확인
                  </InputHeader>
                  <InputDiv>
                    <StyledInput
                      autoComplete="new-password"
                      name="passwordCheck"
                      placeholder="비밀번호 (8자 이상, 20자 이내)"
                      type="password"
                      onChange={onChange}
                      value={form.passwordCheck}
                      onBlur={onBlur}
                    />
                  </InputDiv>
                </StyledDiv>
                {type === 'signup' && detailErr.passwordCheck && (
                  <SpanRed detail>{detailErr.passwordCheck}</SpanRed>
                )}
                <StyledDiv>
                  <InputHeader>
                    <SpanRed>*</SpanRed>닉네임
                  </InputHeader>
                  <InputDiv>
                    <StyledInput
                      name="nickName"
                      placeholder="닉네임 (8자 이내)"
                      type="text"
                      onChange={onChange}
                      value={form.nickName}
                      onBlur={onBlur}
                      maxLength="8"
                    />
                    <button name="nickName" onClick={(e) => checkValue(e)}>
                      중복 검사
                    </button>
                  </InputDiv>
                </StyledDiv>
                {type === 'signup' && detailErr.nickName.message && (
                  <SpanRed detail={detailErr.nickName.status === 1}>
                    {detailErr.nickName.message}
                  </SpanRed>
                )}
                <StyledDiv>
                  <InputHeader>생년월일</InputHeader>
                  <InputDiv>
                    <StyledInput
                      name="birthday"
                      type="text"
                      placeholder="8자리 입력 (ex.19970217)"
                      onChange={onChange}
                      value={form.birthday}
                      onBlur={onBlur}
                      maxLength="10"
                      minLength="8"
                    />
                  </InputDiv>
                </StyledDiv>
                <StyledDiv gender>
                  <InputHeader>
                    <SpanRed>*</SpanRed>성별
                  </InputHeader>
                  <InputDiv>
                    <Select name="gender" onChange={onChange}>
                      <option value="">선택</option>
                      <option value="MALE">남자</option>
                      <option value="FEMALE">여자</option>
                    </Select>
                  </InputDiv>
                </StyledDiv>
                <StyledDiv>
                  <InputHeader>
                    <SpanRed>*</SpanRed>이메일
                  </InputHeader>
                  <InputDiv>
                    <StyledInput
                      name="email"
                      placeholder="ex. test@gmail.com"
                      type="email"
                      onChange={onChange}
                      value={form.email}
                    />
                  </InputDiv>
                </StyledDiv>
              </>
            )}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <ButtonWidthMarginTop fullWidth>
              {text === '로그인' ? `${text}` : '이메일 본인인증 후 회원가입'}
            </ButtonWidthMarginTop>
          </Form>
          <Footer>
            {type === 'login' ? (
              <Links>
                <Link to={process.env.PUBLIC_URL + '/signup'}>회원가입</Link>
                <Link to={process.env.PUBLIC_URL + '/find'}>
                  아이디/비밀번호 찾기
                </Link>
              </Links>
            ) : (
              <Links>
                <Link to={process.env.PUBLIC_URL + '/login'}>로그인</Link>
                <Link to={process.env.PUBLIC_URL + '/find'}>
                  아이디/비밀번호 찾기
                </Link>
              </Links>
            )}
          </Footer>
        </Div>
      </AuthFormBlock>
    </>
  );
};

export default AuthForm;
