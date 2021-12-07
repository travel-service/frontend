import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, signup } from 'redux/modules/auth';
import AuthForm from 'components/Auth/AuthForm';

const SignupForm = () => {
  const dispatch = useDispatch();
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.signup, // store이름 auth, auth.signup에(회원 정보 목록 있음)
    auth: auth.auth,
    authError: auth.authError
  })); // 이해 잘 안됨

  // 인풋 변경 이벤트 핸들러
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'signup',
        key: name,
        value
      })
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    if (password !== passwordConfirm) {
      // TODO: 오류처리
      return;
    }
    dispatch(signup({ username, password }));
  }

  // 컴포넌트가 처음 렌더링될 때 form 초기화
  useEffect(() => {
    dispatch(initializeForm('signup'));
  }, [dispatch]);

  // 회원가입 성공/실패 처리
  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      return;
    }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
    }
  }, [auth, authError]);

  return (
    <AuthForm
      type="signup"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default SignupForm;