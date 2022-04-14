import axios from 'axios';
import create from 'zustand';

export const useStore = create((set, get) => ({
  userPlan: {
    // db 전용
    //id: '',
    concept: [],
    depart: '2022/03/30',
    destination: '',
    name: '',
    periods: '1',
    planStatus: 'MAIN',
    thumbnail: {}, // FormData, 배열 형식
    //travelDays: [],
    //dbSelectedLocations: [], // 변수 확인, id값만 담기는 배열
  },

  setPeriods: (input) => {
    // periods 만큼 길이로 배열 생성
    const arr = Array.from(
      { length: input },
      (n = undefined, i) => `${i + 1}일차`,
    );
    set((state) => ({
      userPlan: { ...state.userPlan, periods: input },
    }));
  },
  setConcept: (input) => {
    set((state) => ({
      userPlan: { ...state.userPlan, concept: input },
    }));
  },
  setDepart: (input) => {
    console.log(input);
    const pD =
      input.getFullYear() +
      '/' +
      (input.getMonth() + 1).toString().padStart(2, '0') +
      '/' +
      input.getDate().toString().padStart(2, '0');
    set((state) => ({ userPlan: { ...state.userPlan, depart: pD } }));
  },
  setDestination: (input) => {
    set((state) => ({ userPlan: { ...state.userPlan, destination: input } }));
  },
  setThumbnail: (input) => {
    set((state) => ({ userPlan: { ...state.userPlan, thumbnail: input } }));
  },

  selLoc: [], // 객체가 담기는 배열

  sysCateLoc: {
    // 전체 location => 분류
    Attractions: [],
    Culture: [],
    Festival: [],
    Leports: [],
    Lodge: [],
    Restaurant: [],
  },

  selCateLoc: {
    // 담은 location => 분류
    Attractions: [],
    Culture: [],
    Festival: [],
    Leports: [],
    Lodge: [],
    Restaurant: [],
  },

  // GET systemLocations
  getSysLoc: async () => {
    const response = await axios.get('http://localhost:4000/locations');
    return response.data;
  },

  // GET userPlan
  getPlan: async (id) => {
    const response = await axios.get(`http://localhost:4000/travelPlans/${id}`);
    set({ userPlan: response.data });
  },

  // POST userPlan
  postPlan: async (id) => {
    // 매개변수 id는 userPlan id
    const userPlan = get().userPlan;
    if (id === '') {
      const response = await axios.post(`http://localhost:4000/travelPlans/`, {
        // userPlan
      });
      set({ userPlan: response.data }); // 백에서 보내주는 데이터가 userPlan
      console.log(response);
    } else {
      const response = await axios.post(`http://localhost:4000/travelPlans/`, {
        //const response = await axios.post(`/members/1/plan`, {
        ...userPlan,
      });
      console.log(response); // 성공하면 success
    }
  },

  // 카테고리 분류
  sortSysLoc: (item) => {
    // set({sysCateLoc: })
  },

  sortSelLoc: (item) => {
    // set({selCateLoc: })
  },

  // 압축 로직, [{}, {}...] => [id, id...]
  zipSelLoc: (item) => {
    // item는 객체 배열, id값으로만 된 배열 생성후 userPlan.dbSelLoc에 덮어쓰기
    // set({})
  },

  // 압축 풀기 로직, [id, id...] => [{}, {}...]
  unzipSelLoc: (item) => {
    // item는 id값만 있는 배열, sysCateLoc를 사용해서 객체가 담긴 배열로 생성 후 selLoc 에 덮어쓰기
    // set({})
  },

  // category와 type
  category: {
    1: { eng: 'Attraction', kor: '관광지' },
    2: { eng: 'Culture', kor: '문화시설' },
    3: { eng: 'Festival', kor: '축제' },
    4: { eng: 'Leports', kor: '레포츠' },
    5: { eng: 'Lodge', kor: '숙박 시설' },
    6: { eng: 'Restaurant', kor: '음식점' },
  },
}));
