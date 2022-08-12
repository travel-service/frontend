import axios from 'axios';
import create from 'zustand';
import * as myAPI from 'lib/api/my';

export const useStore = create((set, get) => ({
  profile: {
    nickname: '',
    bio: '',
    img: '',
  },
  info: {
    birthday: '',
    gender: '',
    email: '',
  },
  checknick: {
    message: '',
  },
  sendnick: {
    nickname: '',
  },
  getBasic: async () => {
    const res = await myAPI.getMyinfo();
    const { nickname, bio, img } = res;
    set({
      profile: {
        nickname,
        bio,
        img,
      },
    });
  },
  setNick: (input) => {
    set((state) => ({ profile: { ...state.profile, nickname: input } }));
  },
  setBio: (input) => {
    set((state) => ({ profile: { ...state.profile, bio: input } }));
  },
  postInfo: async () => {
    const nickName = get().profile.nickname;
    const bio = get().profile.bio;
    const birthday = get().info.birthday;
    const gender = get().info.gender;
    const email = get().info.email;
    const profile = {
      nickName,
      bio,
      birthday,
      gender,
      email,
    };
    const res = await myAPI.postMyinfo(profile);
    console.log(res);
  },
  postNick: async () => {
    const nickName = get().profile.nickname;
    const res = await myAPI.postMyNick(nickName);
    console.log(res);
  },
  postBio: async () => {
    const bio = get().profile.bio;
    const res = await myAPI.postMyBio({ bio });
    console.log(res);
  },
  checkgetNick: async () => {
    const nick = get().sendnick.nickname;
    const prenick = get().profile.nickname;
    console.log(nick, prenick);
    const res = await myAPI.getCheckNick(nick, prenick);
    console.log(res);
    set((state) => ({
      checknick: { ...state.checknick, message: res },
    }));
  },
  setSendNick: (input) => {
    set((state) => ({ sendnick: { ...state.sendnick, nickname: input } }));
  },
}));
