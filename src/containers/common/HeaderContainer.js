import React from "react";
import { useSelector } from "react-redux";
import Header from '../../components/Base/Header/Header';

const HeaderContainer = () => {
    const { user } = useSelector(({ user }) => ({ user: user.user }));
    return <Header user={user} />;
};

export default HeaderContainer;