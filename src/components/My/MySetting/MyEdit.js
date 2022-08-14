import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStore } from 'lib/zustand/myStore';

const UserForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1081px;
  height: 878px;
  background: #ffffff;
  border-radius: 10px;
  margin: 25px 10px 25px 10px;
`;
const UserEditForm = () => {
  const { getEditP, profile, info } = useStore();
  useEffect(() => {
    getEditP();
  }, []);

  useEffect(() => {
    console.log(profile, info);
  }, [profile, info]);
  return (
    <>
      <div>{profile.nickname}</div>
      <div>{profile.bio}</div>
      <div>{profile.img}</div>
      <div>{info.birthday}</div>
      <div>{info.email}</div>
      <div>{info.gender}</div>
    </>
  );
};
const MyEdit = () => {
  return (
    <>
      <UserForm>
        <div>회원정보 수정</div>
        <UserEditForm />
      </UserForm>
    </>
  );
};

export default MyEdit;
