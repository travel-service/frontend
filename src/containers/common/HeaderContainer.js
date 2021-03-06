import React from 'react';
import Header from 'components/Landing/Header';
import { logout } from 'lib/redux/modules/user';
import { useSelector, useDispatch } from 'react-redux';

const HeaderContainer = () => {
  const { userState } = useSelector(({ user }) => ({
    userState: user.userState,
  }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout()); // 아직 구현 X 0703
  };
  return <Header userState={userState} onLogout={onLogout} />;
};

export default HeaderContainer;
