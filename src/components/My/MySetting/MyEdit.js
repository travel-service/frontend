import React, { useState, useEffect } from 'react';
import { useStore } from 'lib/zustand/myStore';
const UserEditForm = () => {
  const { getEditP, profile, info } = useStore();
  useEffect(() => {
    getEditP();
  }, []);

  useEffect(
    () => {
      console.log(profile, info);
    },
    [profile],
    [info],
  );
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
      <div>회원정보 수정</div>
      <UserEditForm />
    </>
  );
};

export default MyEdit;
