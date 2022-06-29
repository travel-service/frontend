import React from 'react';
// import Header from 'components/Base/Header';
import { useSelector, useDispatch } from 'react-redux';
// import { logout } from 'redux/modules/user';
import { logout } from 'redux/modules/user';
import Header from 'components/Landing/Header';

const HeaderContainer = () => {
  // return <></>;
  const { userState } = useSelector(({ user }) => ({
    userState: user.userState,
  }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };
  return <Header userState={userState} onLogout={onLogout} />;
};

export default HeaderContainer;
