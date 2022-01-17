import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../../components/common/Button';

/*회원가입, 로그인 폼*/

const AuthFormBlock = styled.div`
  h2 {
    margin: 0 0 2rem 0;
    color: ${palette.gray[8]};
  }
`;
//Input 스타일링
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1.4rem;
  }
`;
//하단 회원가입 링크 
const Footer = styled.footer`
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

//상단 여백
const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const AuthForm = ({form, onChange, onSubmit, error}) => {
  return (
    <AuthFormBlock>
      <h3>로그인</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="username"
          name="username"
          placeholder="아이디"
          onChange={onChange}
          value={form.username}
        />
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={onChange}
          value={form.password}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonWithMarginTop cyan fullWidth>
          로그인 
        </ButtonWithMarginTop>
      </form>
      <Footer>
        <div>
          <Link to="/signup" style={{textDecoration: 'none'}}>회원가입</Link>
        </div>
        <div>
          <Link to="/" style={{textDecoration: 'none'}}>아이디/비밀번호 찾기</Link>
        </div>
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;