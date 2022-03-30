import axios from 'axios';
import create from 'zustand';

/*export const useStore2 = create((set) => ({
  planPeriods: '1',
  planConcept: [],
  planDepart: '',
  planDestination: '',
  planThumbnail: [],

 setPeriods: (input) => {
    set({ planPeriods: input });
  },
  setConcept: (input) => {
    set({ planConcept: input });
  },
  setDepart: (input) => {
    const pD =
      input.getFullYear() +
      '/' +
      (input.getMonth() + 1).toString().padStart(2, '0') +
      '/' +
      input.getDate().toString().padStart(2, '0');
    set({ planDepart: pD });
  },
  setDestination: (input) => {
    set({ planDestination: input });
  },
  setThumbnail: (input) => {
    set({ planThumbnail: input });
  },
}));*/

export const useStore = create((set, get) => ({
  userPlan: {
    // db 전용
    id: '',
    concept: '',
    depart: '2022/03/30',
    destination: '',
    name: '',
    periods: '1',
    thumbnail: [], // FormData, 배열 형식
    status: '',
    travelDays: [],
    dbSelectedLocations: [], // 변수 확인, id값만 담기는 배열
  },
  /*setTravelDays: (input) => {
    const userPlan = get().userPlan;
  },*/
  setPeriods: (input) => {
    const userPlan = get().userPlan;
    const arr = Array.from(
      { length: input },
      (n = undefined, i) => `${i + 1}일차`,
    );

    set({ userPlan: { ...userPlan, periods: input, travelDays: arr } });
  },
  setConcept: (input) => {
    const userPlan = get().userPlan;
    set({ userPlan: { ...userPlan, concept: input } });
  },
  setDepart: (input) => {
    const pD =
      input.getFullYear() +
      '/' +
      (input.getMonth() + 1).toString().padStart(2, '0') +
      '/' +
      input.getDate().toString().padStart(2, '0');
    const userPlan = get().userPlan;
    set({ userPlan: { ...userPlan, depart: pD } });
  },
  setDestination: (input) => {
    const userPlan = get().userPlan;
    set({ userPlan: { ...userPlan, destination: input } });
  },
  setThumbnail: (input) => {
    const userPlan = get().userPlan;
    set({ userPlan: { ...userPlan, thumbnail: input } });
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
    if (id === '') {
      const response = await axios.post(`http://localhost:4000/travelPlans/`, {
        // userPlan
      });
      set({ userPlan: response.data }); // 백에서 보내주는 데이터가 userPlan
      console.log(response);
    } else {
      const response = await axios.post(
        `http://localhost:4000/travelPlans/${id}`,
      );
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
