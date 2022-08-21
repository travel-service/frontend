import create from 'zustand';
import * as planAPI from 'lib/api/plan';
import * as locationAPI from 'lib/api/location';
import { persist } from 'zustand/middleware';
import { memLocStore } from './memberLocStore';

export const useStore = create((set, get) => ({
  id: null,
  userPlan: {
    // planForm
    depart: '',
    destination: '',
    name: '',
    periods: 1,
    planStatus: 'MAIN',
    thumbnail: '', // FormData, 이름
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
    // return pD; // ?
  },
  setDestination: (input) => {
    set((state) => ({ userPlan: { ...state.userPlan, destination: input } }));
  },
  setThumbnail: (input) => {
    set((state) => ({ userPlan: { ...state.userPlan, thumbnail: input } }));
  },

  // 압축 로직, [{}, {}...] => [id, id...]
  zipSelLoc: (item) => {
    // item는 객체 배열, id값으로만 된 배열 생성후 userPlan.dbSelLoc에 덮어쓰기
    // set({})
    let result = [];
    for (let x of item) {
      result.push(x['id']);
    }
    return result;
  },

  selCateLoc: {
    // 객체가 담기는 배열을 담는 객체
    // 담은 location => 분류
    Attraction: [],
    Culture: [],
    Festival: [],
    Leports: [],
    Lodge: [],
    Restaurant: [],
  },

  category: {
    Attraction: '관광지',
    Culture: '문화시설',
    Festival: '축제',
    Leports: '레포츠',
    Lodge: '숙박시설',
    Restaurant: '음식점',
  },

  onAdd: (loc, type) => {
    set((state) => ({
      selCateLoc: {
        ...state.selCateLoc,
        [type]: [...state.selCateLoc[type], loc],
      },
    }));
  },

  //remove: (locId) => set(state => ({ selLoc: state.selLoc.filter(loc => loc.id !== locId)})),
  remove: (locId, type) => {
    let tmpSelTypeArr = get().selCateLoc[type].filter((obj) => {
      return obj.locationId !== locId;
    });
    set((state) => ({
      selCateLoc: {
        ...state.selCateLoc,
        [type]: tmpSelTypeArr,
      },
    }));
  },

  // 다음으로 누를 때 백으로 전송(Canvas 페이지에서)
  // canvasPost: async () => {
  //   let { selectedLocations } = get().userPlan;
  //   let tmp = [];
  //   for (let key of Object.keys(selectedLocations))
  //     tmp = [...tmp, ...get().zipSelLoc(selectedLocations[key])];
  //   console.log(selectedLocations);
  //   const response = await axios.post(`http://localhost:4000/travelPlans`, {
  //     travelDays: get().userPlan.travelDays,
  //     selectedLocations: tmp,
  //   });
  //   console.log(response); // 성공하면 success
  //   // set((state) => ({ userPlan: { ...state.userPlan } }));
  //   // console.log(get().userPlan);
  // },

  // 0704 찬우 수
  // GET userPlan
  getPlan: async (id) => {
    const res = await planAPI.getPlan(id);
    set({ userPlan: res.planForm });
    // set({ userPlanConcept: response.data.conceptForm });
    // set({ userTravelDay: response.data.dayForm });
  },

  // POST plan (다음으로, 저장하기)
  // create plan, post, 반환 id, id 설정 완료
  postPlan: async (type) => {
    // 매개변수 id는 userPlan id
    const userPlan = get().userPlan;
    // const userPlanConcept = get().userPlanConcept;
    // const userTravelDay = get().userTravelDay;
    const id = get().id;
    if (type === 0 && !id) {
      // plan 생성
      const res = await planAPI.createPlan(userPlan);
      if (res > 0) {
        // 정상적 id 반환
        set({ id: res });
      } else {
        // postPlan 에러
      }
    } else if (type === 0 && id > 0) {
      // plan 수정
    } else if (type === 1) {
      // selectedLocation 생성 및 수정
    } else if (type === 2) {
      // day 생성 및 수정
    }

    // if (id === undefined) {
    //   const response = await axios.post(`http://localhost:8080/members/plan`, {
    //     /*...userPlan,*/
    //     planForm: userPlan,
    //     conceptForm: userPlanConcept,
    //     dayForm: userTravelDay,
    //   });
    //   console.log(response);
    //   //set({ userPlan: response.data }); // 백에서 보내주는 데이터가 userPlan
    // } else {
    //   //const response = await axios.post(`/members/1/plan`, {
    //   //test용 patch..
    //   const response = await axios.patch(
    //     `http://localhost:4000/travelPlans/${id}`,
    //     {
    //       planForm: userPlan,
    //       conceptForm: userPlanConcept,
    //       dayForm: userTravelDay,
    //     },
    //   );
    //   console.log(response); // 성공하면 success
    // }
  },
}));

// 여행 보관함에서 사용
export const planStore = create((set, get) => ({
  plans: undefined, // 여행 보관함
  getAllPlans: async () => {
    const res = await planAPI.getAllPlans();
    set({ plans: res });
  },
}));

// systemLocation 받아오고, 카테고리 따라서 분류
export const sysLocStore = create((set, get) => ({
  sysCateLoc: {
    // 전체 location => 분류
    Attraction: [],
    Culture: [],
    Festival: [],
    Leports: [],
    Lodge: [],
    Restaurant: [],
  },
  sysCateLocCoords: {
    // CoordsList: [],
  },
  flag: false,
  lat: 33.280701,
  lng: 126.570667,

  getSysLoc: async () => {
    if (get().flag === false) {
      const response = await locationAPI.getBlockLocations();

      if (response.status === 200) {
        // 받아온 key값으로 배열 생성
        const typesArr = Object.keys(response.data);

        // 배열의 값인 type으로 sysCateLoc 상태 업데이트
        typesArr.forEach((type) => {
          let tmp = [];
          for (let x of response.data[type]) {
            x.isSelect = false;
            tmp.push(x);
          }
          set((state) => ({
            sysCateLoc: {
              ...state.sysCateLoc,
              [type]: tmp,
            },
          }));
        });
      }
      set({ flag: true });
    }
  },

  getSysLocCoords: async () => {
    const response = await locationAPI.getMarkLocations();

    if (response.status === 200) {
      // 받아온 key값으로 배열 생성
      const typesArr = Object.keys(response.data);

      // 배열의 값인 type으로 sysCateLocCoords 상태 업데이트
      typesArr.forEach((type) => {
        let tmp = [];
        for (let x of response.data[type]) {
          x.isSelect = false;
          tmp.push(x);
        }
        set((state) => ({
          sysCateLocCoords: {
            ...state.sysCateLocCoords,
            [type]: tmp,
          },
        }));
      });
    }
  },

  setLatLng: (id, type) => {
    const coordsList = get().sysCateLocCoords[type];
    const found = coordsList.find((loc) => loc.locationId === id);
    set({ lat: found.coords.latitude });
    set({ lng: found.coords.longitude });
  },
}));
