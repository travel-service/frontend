import axios from 'axios';
import create from 'zustand';

export const useStore = create((set, get) => ({
  userPlan: {
    // db 전용
    id: '',
    depart: '',
    destination: '',
    name: '',
    periods: 1,
    planStatus: 'MAIN',
    thumbnail: [], // FormData, 이름
    //concept: [],
    //travelDay: [],
    //dbSelectedLocations: [], // 변수 확인, id값만 담기는 배열
  },
  userPlanConcept: {
    concept: [],
  },
  Concepts: [
    { id: 1, name: '우정', eword: 'Friendship' },
    { id: 2, name: '연인', eword: 'Love' },
    { id: 3, name: '가족', eword: 'Family' },
    { id: 4, name: '혼자', eword: 'Alone' },
  ],
  userTravelDay: {
    travelDay: [],
  },
  setName: (input) => {
    set((state) => ({ userPlan: { ...state.userPlan, name: input } }));
  },
  setPeriods: (input) => {
    const userTravelDay = get().userTravelDay;
    let arr = [];
    arr = Array.from({ length: input }, (_, i) => []);

    // travelDay 이미 있는 경우
    if (userTravelDay.travelDay === []) {
      arr = userTravelDay.travelDay;
    }

    set((state) => ({
      userPlan: { ...state.userPlan, periods: input },
      userTravelDay: { ...state.userTravelDay, travelDay: arr },
    }));
  },
  setConcept: (input) => {
    set((state) => ({
      userPlanConcept: { ...state.userPlanConcept, concept: input },
    }));
  },
  setDepart: (input) => {
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
    //const userPlan = get().userPlan;
    const response = await axios.get(`http://localhost:4000/travelPlans/${id}`);
    //const response = await axios.get(`http://localhost:4000/travelPlans/1`);
    set({ userPlan: response.data.planForm });
    set({ userPlanConcept: response.data.conceptForm });
    set({ userTravelDay: response.data.dayForm });
    console.log(response); // 성공하면 success
  },

  // POST userPlan
  postPlan: async (id) => {
    // 매개변수 id는 userPlan id
    const userPlan = get().userPlan;
    const userPlanConcept = get().userPlanConcept;
    const userTravelDay = get().userTravelDay;
    if (id === '') {
      const response = await axios.post(`http://localhost:4000/travelPlans/`, {
        /*...userPlan,*/
        planForm: userPlan,
        conceptForm: userPlanConcept,
        dayForm: userTravelDay,
      });
      //set({ userPlan: response.data }); // 백에서 보내주는 데이터가 userPlan
      console.log(response);
    } else {
      //const response = await axios.post(`/members/1/plan`, {
      //test용 patch..
      const response = await axios.patch(
        `http://localhost:4000/travelPlans/${id}`,
        {
          planForm: userPlan,
          conceptForm: userPlanConcept,
          dayForm: userTravelDay,
        },
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
