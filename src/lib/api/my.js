import axios from 'axios';

export const getMyinfo = async () => {
  try {
    const nickbio = await axios.get('/api/user/my-page');
    const res = await axios.get('/api/user/my-page/img', {
      responseType: 'blob',
    });
    console.log(nickbio, res);
    let file = new Blob([res.data], { type: 'image/png' });
    const img = window.URL.createObjectURL(file);
    console.log(file);
    return {
      nickname: nickbio.data.nickName,
      bio: nickbio.data.bio,
      img,
    };
  } catch (e) {
    console.log(e);
  }
};

export const postMyinfo = async (profile) => {
  try {
    const response = await axios.post('/api/user/profile/edit', {
      Profile: profile,
    });
    console.log('postMyinfo:', response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
