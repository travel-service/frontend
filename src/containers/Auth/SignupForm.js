import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeField,
  initializeForm,
  signup,
  tempSetAuth,
} from 'lib/redux/modules/auth';
import AuthForm from 'components/Auth/AuthForm';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [detailErr, setDetailErr] = useState({
    password: null,
    passwordCheck: null,
    nickName: null,
  });
  const dispatch = useDispatch();
  const { form, auth, authError, userState } = useSelector(
    ({ auth, user }) => ({
      // state.auth, state.user
      form: auth.signup, // store이름 auth, auth.signup에(회원 정보 목록 있음)
      auth: auth.auth,
      authError: auth.authError,
      userState: user.userState,
    }),
  );

  // 인풋 변경 이벤트 핸들러
  const onChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      dispatch(
        changeField({
          form: 'signup',
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
    const {
      userName,
      email,
      password,
      passwordCheck,
      nickName,
      birthday,
      gender,
    } = form;
    // 필수항목 중 하나라도 비어 있다면
    if (
      [userName, password, passwordCheck, nickName, email, gender].includes('')
    ) {
      setError('필수항목을 모두 입력해 주세요.');
      return;
    }
    if (password !== passwordCheck) {
      // 패스워드 다르면 오류출력 후 초기화
      setError('비밀번호가 일치하지 않습니다.');
      dispatch(changeField({ form: 'signup', key: 'password', value: '' }));
      dispatch(
        changeField({ form: 'signup', key: 'passwordCheck', value: '' }),
      );
      return;
    }
    dispatch(
      signup({
        userName,
        email,
        password,
        nickName,
        birthday,
        gender,
      }),
    );
  };

  // 컴포넌트가 처음 렌더링될 때 form 초기화
  useEffect(() => {
    dispatch(initializeForm('signup'));
  }, [dispatch]);

  // 회원가입 성공/실패 처리
  useEffect(() => {
    if (authError) {
      // 아이디가 이미 존재
      setError(authError.response.data.message);
      return;
      // }
      // 기타 이유
      // setError('회원가입 실패');
      // return;
    }
    if (auth) {
      console.log('회원가입 성공');
      dispatch(tempSetAuth()); // 회원가입후 auth 제거
      alert('회원가입이 완료되었습니다!');
      navigate(process.env.PUBLIC_URL + '/');
    }
  }, [auth, authError, dispatch, navigate]);

  // user 값이 잘 설정되었는지 확인
  useEffect(() => {
    if (userState) {
      navigate(process.env.PUBLIC_URL + '/');
    }
    return;
  }, [userState, navigate]);

  const onBlur = (e) => {
    let { name, value } = e.target;
    if (name === 'password') {
      const regex = new RegExp(
        '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$',
      ); // 문자, 숫자, 특수문자 조합 8자 이상
      if (!regex.test(value))
        setDetailErr({
          ...detailErr,
          password: '비밀번호 양식을 확인해주세요.',
        });
      else
        setDetailErr({
          ...detailErr,
          password: null,
        });
    } else if (name === 'passwordCheck') {
      const { password } = form;
      if (password !== value)
        setDetailErr({
          ...detailErr,
          passwordCheck: '비밀번호가 일치하지 않습니다.',
        });
      else
        setDetailErr({
          ...detailErr,
          passwordCheck: null,
        });
    } else if (name === 'birthday') {
      const { birthday } = form;
      if (birthday.length === 8) {
        let tmp = birthday.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
        dispatch(changeField({ form: 'signup', key: 'birthday', value: tmp }));
      }
    }
    // else if (name === 'phoneNum') {
    //   const { phoneNum } = form;
    //   if (phoneNum.length === 11) {
    //     let tmp = phoneNum.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    //     dispatch(changeField({ form: 'signup', key: 'phoneNum', value: tmp }));
    //   }
    // }
  };

  return (
    <AuthForm
      type="signup"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
      detailErr={detailErr}
      onBlur={onBlur}
    />
  );
};

export default SignupForm;
