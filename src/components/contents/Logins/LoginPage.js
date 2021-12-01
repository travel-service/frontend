import React from 'react';
import AuthTemplate from '../../../components/auth/AuthTemplate';
import LoginForm from '../../../containers/auth/LoginForm';

const LoginPage = () => {
    return(
        <AuthTemplate>
            <LoginForm />
        </AuthTemplate>
    );
};

/*import React, { useState } from 'react';
import { FetchLogin } from './FetchLogin';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';

const LoginPage = () => {
  const { setUser } = useUserContext(); //setUser 사용
  const navigate = useNavigate(); //url 이동

    const [ account, setAccount ] = useState({
        Username: "",
        Password: "",
    });

  const onChangeAccount = (e) => {
      setAccount({
          //...으로 복사본을 만들어 오버라이딩
          ...account,
          [e.target.name]: e.target.value,
      });
  };

  const onSubmitAccount = async () => {
      try {
          const user = await FetchLogin(account);

          //성공하면 user로 세팅
          setUser(user);
          console.log(user);
          //성공하면 해당 url로 이동
          navigate("/");
      } catch (error) {
          //실패하면 throw new Error("") 값 출력
          window.alert(error);
      }
  };

  const onChangeSignup = async () => {
      navigate("/signup");
  }

  const onChangeChecked = () => {
      console.log("checked");
  }

  return(
      <div>
          <h2>Login</h2>
          <div>
            <input 
                id="username"
                name="username"
                placeholder="아이디"
                onChange = { onChangeAccount }
            />
          </div>
          <div>
            <input 
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호"
                onChange = { onChangeAccount }
            />
          </div>
          <div>
              <button onClick={ onSubmitAccount }>
                  로그인
              </button>
          </div>
          <div>
              <input type="checkbox" onClick={onChangeChecked} />
              <span>로그인 상태 유지</span>
          </div>
          <div>
              <button>아이디/비밀번호 찾기</button>
              <button onClick={ onChangeSignup }>
                  회원가입
              </button>
          </div>
          <div>
              <span>SNS 로그인 </span>
              <button>네</button>
              <button>카</button>
              <button>구</button>
          </div>
      </div>
  );
};
*/
export default LoginPage;