import React, { Component } from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from 'components/Auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'redux/modules/auth';

class Login extends Component {
  componentWillUnmount() {
    const { AuthActions } = this.props;
    AuthActions.initializeForm('login')
  }

  handleChange = (e) => {
    const { AuthActions } = this.props;
    const { name, value } = e.target

    AuthActions.changeInput({
      name,
      value,
      form: 'login'
    });
  }

  render() {
    const { email, password } = this.props.form.toJS();
    const { handleChange } = this;

    return (
      <AuthContent title="로그인">
        <InputWithLabel
          label="이메일"
          name="email"
          placeholder="이메일"
          value={email}
          onChange={handleChange}
        />
        <InputWithLabel
          label="비밀번호"
          name="password"
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={handleChange}
        />
        <AuthButton>로그인</AuthButton>
        <RightAlignedLink to="../signup">회원가입</RightAlignedLink>
      </AuthContent>
    );
  }
}

export default connect(
  (state) => ({
    form: state.auth.getIn(['login', 'form'])
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(Login);