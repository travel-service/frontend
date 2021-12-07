// import React, { Component } from 'react';
// import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from 'components/Auth';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as authActions from 'redux/modules/auth';

import React, { useEffect } from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from 'components/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { changeInput, initializeForm } from '../../redux/modules/auth';
import SignUpPage from 'components/contents/SignUpPage';

const SignUp = () => {
  const dispatch = useDispatch();
  const { form } = useSelector(({ auth }) => ({
    form: auth.signup
  }));

  handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      changeInput({
        form: 'signup',
        key: name,
        value
      })
    );
  };

  useEffect(() => {
    dispatch(initializeForm('signup'));
  }, [dispatch]);

  return (
    <AuthContent
      title="회원정보 작성"
      subtitle="아래 * 항목은 필수입력 사항입니다."
    >
      <InputWithLabel
        label="아이디"
        name="username"
        placeholder="아이디(8~20자 이내)"
        type="text"
        value={username}
        onChange={handleChange}
      />
      <InputWithLabel
        label="비밀번호"
        name="password"
        placeholder="비밀번호(8~20자 이내)"
        type="password"
        value={password}
        onChange={handleChange}
        max="20"
        min="8"
      />
      <InputWithLabel
        label="비밀번호 확인"
        name="passwordConfirm"
        placeholder="비밀번호 확인(8~20자 이내)"
        type="password"
        value={passwordConfirm}
        onChange={handleChange}
      />
      <InputWithLabel
        label="이름"
        name="name"
        placeholder="이름(30자 이내)"
        type="text"
        value={name}
        onChange={handleChange}
      />
      <InputWithLabel
        label="닉네임"
        name="nickname"
        placeholder="닉네임(2~30자 이내)"
        type="text"
        value={nickname}
        onChange={handleChange}
        max="8"
      />
      <InputWithLabel
        label="생년월일"
        name="birthday"
        placeholder="생년월일 형식.."
        type="date"
        value={birthday}
        onChange={handleChange}
        min="1900-01-01"
      />
      <InputWithLabel
        label="성별"
        // name="gender"
        // placeholder="성별 선택..해주세..요.."
        type="radio"
        value="쨔스"
      // onChange={handleChange}
      />
      <InputWithLabel
        label="휴대전화"
        name="tel"
        placeholder="(-)없이 적어주세요"
        type="tel"
        value={tel}
        onChange={handleChange}
      />
      <InputWithLabel
        label="이메일"
        name="email"
        placeholder="이메일 적어"
        type="email"
        value={email}
        onChange={handleChange}
      />
      <AuthButton>회원가입</AuthButton>
      <RightAlignedLink to="../login">로그인</RightAlignedLink>
    </AuthContent>
  );
}


export default SignUp;

// class SignUp extends Component {
//   componentWillUnmount() {
//     const { AuthActions } = this.props;
//     AuthActions.initializeForm('signup')
//   }

//   handleChange = (e) => {
//     const { AuthActions } = this.props;
//     const { name, value } = e.target;

//     AuthActions.changeInput({
//       name,
//       value,
//       form: 'signup'
//     });
//   }

//   render() {
//     const {
//       username,
//       password,
//       passwordConfirm,
//       name,
//       nickname,
//       birthday,
//       gender,
//       tel,
//       email
//     } = this.props.form.toJS();
//     const { handleChange } = this;

//     console.log(birthday);

//     return (
//       <AuthContent
//         title="회원정보 작성"
//         subtitle="아래 * 항목은 필수입력 사항입니다."
//       >
//         <InputWithLabel
//           label="아이디"
//           name="username"
//           placeholder="아이디(8~20자 이내)"
//           type="text"
//           value={username}
//           onChange={handleChange}
//         />
//         <InputWithLabel
//           label="비밀번호"
//           name="password"
//           placeholder="비밀번호(8~20자 이내)"
//           type="password"
//           value={password}
//           onChange={handleChange}
//           max="20"
//           min="8"
//         />
//         <InputWithLabel
//           label="비밀번호 확인"
//           name="passwordConfirm"
//           placeholder="비밀번호 확인(8~20자 이내)"
//           type="password"
//           value={passwordConfirm}
//           onChange={handleChange}
//         />
//         <InputWithLabel
//           label="이름"
//           name="name"
//           placeholder="이름(30자 이내)"
//           type="text"
//           value={name}
//           onChange={handleChange}
//         />
//         <InputWithLabel
//           label="닉네임"
//           name="nickname"
//           placeholder="닉네임(2~30자 이내)"
//           type="text"
//           value={nickname}
//           onChange={handleChange}
//           max="8"
//         />
//         <InputWithLabel
//           label="생년월일"
//           name="birthday"
//           placeholder="생년월일 형식.."
//           type="date"
//           value={birthday}
//           onChange={handleChange}
//           min="1900-01-01"
//         />
//         <InputWithLabel
//           label="성별"
//           // name="gender"
//           // placeholder="성별 선택..해주세..요.."
//           type="radio"
//           value="쨔스"
//         // onChange={handleChange}
//         />
//         <InputWithLabel
//           label="휴대전화"
//           name="tel"
//           placeholder="(-)없이 적어주세요"
//           type="tel"
//           value={tel}
//           onChange={handleChange}
//         />
//         <InputWithLabel
//           label="이메일"
//           name="email"
//           placeholder="이메일 적어"
//           type="email"
//           value={email}
//           onChange={handleChange}
//         />
//         <AuthButton>회원가입</AuthButton>
//         <RightAlignedLink to="../login">로그인</RightAlignedLink>
//       </AuthContent>
//     );
//   }
// };

// export default connect(
//   (state) => ({
//     form: state.auth.getIn(['signup', 'form'])
//   }),
//   (dispatch) => ({
//     AuthActions: bindActionCreators(authActions, dispatch)
//   })
// )(SignUp);