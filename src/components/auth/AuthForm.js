import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../Button';

/*회원가입, 로그인 폼*/

const AuthFormBlock = styled.div`
  h2 {
    margin: 0 0 2rem 0;
    color: ${palette.gray[8]};
  }
`;

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

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const AuthForm = ({form, onChange, onSubmit}) => {
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
        <ButtonWithMarginTop cyan fullWidth style={{marginTop:'1rem'}}>
          로그인 
          {/*<Link to="/auth/login">
          </Link>*/}
        </ButtonWithMarginTop>
      </form>
      <Footer>
        <Link to="/signup">회원가입</Link>
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;