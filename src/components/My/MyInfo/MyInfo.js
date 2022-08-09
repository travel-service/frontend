import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Profile from '../img/profile2.jpg';
import { FaRegBookmark, FaRegHeart, FaPen } from 'react-icons/fa';
import { HiOutlineFolderOpen } from 'react-icons/hi';
import { useStore } from 'lib/zustand/myStore';
import { setIn } from 'immutable';
import { AccountBalance } from '@mui/icons-material';

const MyInfoBox = styled.div`
  display: flex;
  // float: left;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 308px;
  height: 487px;
  // height: 100%;
  // width: 20%;
  margin: 10px;
  border: 1.5px solid rgba(241, 107, 108, 0.2);
  hr {
    border-color: rgba(241, 107, 108, 0.2);
  }
`;

const MyInfoProfile = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  //width: 70%;
  //height: 70%;
  width: 150px;
  height: 150px;
  border-radius: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const MyInfoMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.4);
  margin: 1px;
`;

const MyInfoName = styled.div`
  padding: 10px;
  font-size: 29px;
  font-weight: bold;
`;

const ProfileEdit = styled.button`
  border: 1.5px solid rgba(241, 107, 108, 0.2);
  border-radius: 5px;
  margin: 10px;
  padding: 5px;
  font-weight: 600;
  /* 색상 */
  background: #fff;
  &:hover {
    background: rgba(241, 107, 108, 0.2);
  }
  &:active {
    background: rgb(241, 107, 108);
  }
`;

const Menu = styled.div`
  margin-left: 10px;
  padding: 10px;
  column-count: 3;
  column-gap: 30px;
  column-width: 2px;
  text-align: center;
  a,
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: black;
  }
`;

const ChangeInput = styled.input`
  font-family: inherit;
  width: 50%;
  border: 0;
  border-bottom: 1px solid rgba(241, 107, 108, 0.2);
  outline: 0;
  font-size: 1rem;
  font-weight: 500;
  color: rgba(0, 0, 0);
  padding: 5px 0;
  background: transparent;
  transition: border-color 0.2s;
  text-align: center;
`;

const UserInfoBox = () => {
  const [visible, setVisible] = useState(true);
  const { getBasic, profile, setNick, setBio, postNickBio } = useStore();

  useEffect(() => {
    getBasic();
  }, []);

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  // Test function
  const onEdit = () => {
    setVisible(!visible);
    visible ? console.log('hum..') : console.log('처리중');
    setNick(inputaccount.nickname);
    setBio(inputaccount.bio);
    postNickBio();
  };

  // input 입력값 inputaccount state값 변경되게
  const [inputaccount, setInput] = useState({
    nickname: profile.nickname,
    bio: profile.bio,
  });
  const onChangeInput = (e) => {
    setInput({
      ...inputaccount,
      [e.target.name]: e.target.value,
    });
    console.log(inputaccount);
  };

  return (
    <>
      {visible && (
        <>
          <MyInfoProfile src={profile.img}></MyInfoProfile>
          <MyInfoName>{profile.nickname}</MyInfoName>
          <MyInfoMessage>{profile.bio}</MyInfoMessage>
        </>
      )}
      {!visible && (
        <>
          <MyInfoProfile src={profile.img}></MyInfoProfile>
          <ChangeInput
            type="text"
            id="nickname"
            name="nickname"
            placeholder={profile.nickname}
            onChange={onChangeInput}
          ></ChangeInput>
          <ChangeInput
            type="text"
            id="bio"
            name="bio"
            placeholder={profile.bio}
            onChange={onChangeInput}
          ></ChangeInput>
        </>
      )}
      {/** 프로필 수정 */}
      <ProfileEdit onClick={onEdit}>
        {visible ? (
          <div>
            프로필 수정 &nbsp;
            <FaPen />
          </div>
        ) : (
          <div>완료</div>
        )}
      </ProfileEdit>
    </>
  );
};

const MyInfo = () => {
  return (
    <MyInfoBox>
      <UserInfoBox />
      <hr size="1" width="80%" />
      <Menu>
        {/** page별 url로 변경해야함 */}
        <div>
          <Link to={process.env.PUBLIC_URL + '/mypage/MyInfo'}>
            <FaRegBookmark size="24px" />
            <div>스크랩북</div>
            <div>0</div>
          </Link>
        </div>
        <div>
          <Link to={process.env.PUBLIC_URL + '/mypage/MyInfo'}>
            <FaRegHeart size="24px" />
            <div>좋아요</div>
            <div>0</div>
          </Link>
        </div>
        <div>
          <Link to={process.env.PUBLIC_URL + '/mypage/MyInfo'}>
            <HiOutlineFolderOpen size="24px" />
            <div>내 플랜</div>
            <div>1</div>
          </Link>
        </div>
      </Menu>
    </MyInfoBox>
  );
};

export default MyInfo;
