import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from 'redux/modules/auth';
import AuthForm from 'components/Auth/AuthForm';
import { useNavigate } from 'react-router-dom';
import { check } from 'redux/modules/user';

const LoginForm = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { form, auth, authError, userState, accessToken } = useSelector(
    ({ auth, user }) => ({
      // state.auth, state.user
      form: auth.login, // store이름 auth, auth.signup에(회원 정보 목록 있음)
      auth: auth.auth,
      authError: auth.authError,
      accessToken: auth.accessToken,
      userState: user.userState,
    }),
  );

  // 인풋 변경 이벤트 핸들러
  const onChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      dispatch(
        changeField({
          form: 'login',
          key: name,
          value,
        }),
      );
    },
    [dispatch],
  );

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { userName, password } = form;
    dispatch(login({ userName, password }));
  };

  // 컴포넌트가 처음 렌더링될 때 form 초기화
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      setError(authError.response.data.message);
      return;
    }
    if (accessToken) {
      console.log('로그인 성공');
      navigate(process.env.PUBLIC_URL + '/');
      dispatch(check());
    }
  }, [auth, authError, dispatch, navigate, accessToken]);

  useEffect(() => {
    if (accessToken) {
      console.log('check 성공');
      // console.log('check 성공');
      // navigate(process.env.PUBLIC_URL + '/canvas/directory');
      // try {
      //   localStorage.setItem('userState', JSON.stringify(userState));
      // } catch (e) {
      //   console.log('localStorage is not working');
      // }
    }
  }, [userState, navigate, accessToken]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default LoginForm;
