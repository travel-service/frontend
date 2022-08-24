import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { refresh } from 'lib/api/auth';
import styled from 'styled-components';
import palette from 'lib/styles/palette';

const Spinner = styled.div`
  border: 10px solid white;
  border-top: 10px solid ${palette.red1};
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${palette.back2};
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { userState } = useSelector(({ user }) => ({
    userState: user.userState,
  }));

  useEffect(() => {
    (async () => {
      let res = await refresh();
      if (!res.data) {
        alert('로그인 후 사용가능한 서비스입니다 !');
        navigate(process.env.PUBLIC_URL + '/login');
        return;
      } else if (res.data.status === 201) {
        return;
      } else {
        alert('로그인 후 사용가능한 서비스입니다 !');
        navigate(process.env.PUBLIC_URL + '/login');
        return;
      }
    })();
  }, [navigate]);

  if (!userState)
    return (
      <Container>
        <Spinner></Spinner>
      </Container>
    );
  else return children;
};

export default ProtectedRoute;
