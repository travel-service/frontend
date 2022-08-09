import axios from 'axios';
import create from 'zustand';
import * as myAPI from 'lib/api/my';

export const useStore = create((set, get) => ({
  profile: {
    nickname: '',
    bio: '',
    img: '',
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
  postNickBio: async () => {
    const profile = get().profile;
    const res = await myAPI.postMyinfo(profile);
    console.log(res);
  },
}));
