import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Profile from '../img/profile2.jpg';
import { FaRegBookmark, FaRegHeart, FaPen } from 'react-icons/fa';
import { HiOutlineFolderOpen } from 'react-icons/hi';

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

const ChangeName = styled.input``;

/** 데이터 받아오기 
const GetInfo = () => {
  let [profile, setProfile] = useState();
  let [name, setName] = useState('모제링링');
  let [bio, setBio] = useState('여행은 즐기는 것! 신난다!');

  /*const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/');
      setTest(response.data.reverse());
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  
  useEffect(() => {
    getData();
  }, []);
  */
/*
  let test = false;

  const onEdit = () => {
    test = true;
    console.log('hum..');
    // setBio('여행은 즐기는 것! 신난다!');
  };

  return (
    <>
      {test ? (
        <>
          <MyInfoName>
            <ChangeName type="text" />
          </MyInfoName>
          <MyInfoMessage>
            <input type="text" />
          </MyInfoMessage>
        </>
      ) : (
        <>
          <MyInfoName>{name}</MyInfoName>
          <MyInfoMessage>{bio}</MyInfoMessage>
        </>
      )}
      {/** <MyInfoProfile src={Profile}></MyInfoProfile>
      <MyInfoName>{name}</MyInfoName>
      <MyInfoMessage>{bio}</MyInfoMessage>}

      {/** 프로필 수정 }
      <ProfileEdit onClick={onEdit}>
        프로필 수정 &nbsp;
        <FaPen />
      </ProfileEdit>
    </>
  );
};
*/

const MyInfo = () => {
  // let [profile, setProfile] = useState();
  let [name, setName] = useState('모제링링');
  let [bio, setBio] = useState('여행은 즐기는 것! 신난다!');

  // Test function
  const onEdit = () => {
    console.log('hum..');
    // setBio('여행은 즐기는 것! 신난다!');
  };

  return (
    <MyInfoBox>
      <MyInfoProfile src={Profile}></MyInfoProfile>
      <MyInfoName>{name}</MyInfoName>
      <MyInfoMessage>{bio}</MyInfoMessage>
      {/** 프로필 수정 */}
      <ProfileEdit onClick={onEdit}>
        프로필 수정 &nbsp;
        <FaPen />
      </ProfileEdit>

      {/*<GetInfo />*/}
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
