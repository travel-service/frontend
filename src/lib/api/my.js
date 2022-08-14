import { RepeatOneSharp } from '@mui/icons-material';
import axios from 'axios';

// 회원 개인페이지, 프로필 사진
export const getMyinfo = async () => {
  try {
    const nickbio = await axios.get('/members/my-page');
    const res = await axios.get('/members/my-page/img', {
      responseType: 'blob',
    });
    console.log(nickbio, res);
    let file = new Blob([res.data], { type: 'image/png' });
    const img = window.URL.createObjectURL(file);
    console.log(file);
    return {
      nickname: nickbio.data.result.nickname,
      bio: nickbio.data.result.bio,
      img,
    };
  } catch (e) {
    console.log(e);
  }
};

// 회원 개인정보 수정 "요청"
export const postMyinfo = async (profile) => {
  try {
    console.log(profile);
    const response = await axios.post('/members/profile/edit', profile);
    console.log('postMyinfo:', response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

// 회원 개인페이지 닉네임 수정 "요청"
export const postMyNick = async (nickName) => {
  try {
    console.log(nickName);
    const response = await axios.post(`/members/profile/${nickName}`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// 회원 개인페이지 닉네임 수정 "요청"
export const postMyBio = async (bio) => {
  try {
    console.log(bio);
    const response = await axios.post('/members/profile/bio', bio);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// 회원 프로필 사진 변경
export const postMyImg = async (formdata) => {
  try {
    const response = await axios.post('/members/profile/img', formdata);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// 회원 프로필 사진 요청 이건 아닌늣
// export const Getprofile = async () => {
//   try {
//     const res = await axios.get('/members/my-page/img', {
//       responseType: 'blob',
//     });
//     let file = new Blob([res.data], { type: 'image/png' });
//     const img = window.URL.createObjectURL(file);
//     return { img };
//   } catch (e) {
//     console.log(e);
//   }
// };

// 중복 닉네임 체크
export const getCheckNick = async (nick, prenick) => {
  try {
    const response = await axios.get(`/api/nickname/${nick}`, {
      validateStatus: (status) => status < 500,
    });
    console.log(response.status);
    console.log(response.data);
    if (nick === prenick && response.status === 409) {
      const setmessage = '현재 사용자가 설정한 닉네임 입니다.';
      return setmessage;
    }
    return response.data.message;
  } catch (error) {
    console.dir(error);
  }
};

// 회원 개인정보 수정 "페이지"
export const getEditPage = async () => {
  try {
    const response = await axios.get('/members/profile/edit');
    console.log(response);
    // return {
    //   nickname: response.data.result.nickname,
    //   bio: response.data.result.bio,
    // };
  } catch (e) {
    console.log(e);
  }
};
