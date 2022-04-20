import axios from 'axios';
import create from 'zustand';

export const useStore = create((set) => ({
  userPlan: {
    // db 전용
    id: '',
    concept: '',
    depart: '',
    destination: '',
    name: '',
    periods: '',
    status: '',
    travelDays: '',
    dbSelectedLocations: [], // 변수 확인, id값만 담기는 배열
  },

  selLoc: [], // 객체가 담기는 배열
  // selCateLoc: {
  //   // 담은 location => 분류
  //   selAttractions: [],
  //   selCulture: [],
  //   selFestival: [],
  //   selLeports: [],
  //   selLodge: [],
  //   selRestaurant: [],
  // },

  selAttractions: [],
  selCulture: [],
  selFestival: [],
  selLeports: [],
  selLodge: [],
  selRestaurant: [],

  //onAdd: (loc, type) => set(state => ({ selLoc: [...state.selLoc, loc] })),
  onAdd: (loc, type) => {
    switch (type) {
      case '1':
        console.log(loc);
        set(state => ({ selAttractions: [...state.selAttractions, loc] }));
        break;
      case '2':
        set(state => ({ selCulture: [...state.selCulture, loc] }));
        break;
      case '3':
        set(state => ({ selFestival: [...state.selFestival, loc] }));
        break;
      case '4':
        set(state => ({ selLeports: [...state.selLeports, loc] }));
        break;
      case '5':
        console.log(loc);
        set(state => ({ selLodge: [...state.selLodge, loc] }));
        break;
      case '6':
        console.log(loc);
        set(state => ({ selRestaurant: [...state.selRestaurant, loc] }));
        break;
      default:
    }
  },

  //remove: (locId) => set(state => ({ selLoc: state.selLoc.filter(loc => loc.id !== locId)})),
  remove: (locId, type) => {
    switch (type) {
      case '1':
        set(state => ({ selAttractions: state.selAttractions.filter(loc => loc.id !== locId)}));
        break;
      case '2':
        set(state => ({ selCulture: state.selCulture.filter(loc => loc.id !== locId)}));
        break;
      case '3':
        set(state => ({ selFestival: state.selFestival.filter(loc => loc.id !== locId)}));
        break;
      case '4':
        set(state => ({ selLeports: state.selLeports.filter(loc => loc.id !== locId)}));
        break;
      case '5':
        set(state => ({ selLodge: state.selLodge.filter(loc => loc.id !== locId)}));
        break;
      case '6':
        set(state => ({ selRestaurant: state.selRestaurant.filter(loc => loc.id !== locId)}));
        break;
      default:
    }
  },


  // 카테고리 분류 로직 만들기 0323
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

  getPlan: async (id) => {
    const response = await axios.get(`http://localhost:4000/travelPlans/${id}`);
    set({ userPlan: response.data });
  },

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

  category: {
    1: { eng: 'Attraction', kor: '관광지' },
    2: { eng: 'Culture', kor: '문화시설' },
    3: { eng: 'Festival', kor: '축제' },
    4: { eng: 'Leports', kor: '레포츠' },
    5: { eng: 'Lodge', kor: '숙박 시설' },
    6: { eng: 'Restaurant', kor: '음식점' },
  },
}));

// systemLocation 받아오고, 카테고리 따라서 분류
export const sysLocStore = create((set) => ({
  sysCateLoc: {
    // 전체 location => 분류
    Attractions: [],
    Culture: [],
    Festival: [],
    Leports: [],
    Lodge: [],
    Restaurant: [],
  },

  getSysLoc: async () => {
    const response = await axios.get('http://localhost:4000/locations');
    const obj = Object.values(response.data);
    console.log(obj);
    let att = [];
    let cul = [];
    let fes = [];
    let lepo = [];
    let lod = [];
    let rest = [];
    for (let x of obj) {
      switch (x.type) {
        case '1':
          att.push(x);
          break;
        case '2':
          cul.push(x);
          break;
        case '3':
          fes.push(x);
          break;
        case '4':
          lepo.push(x);
          break;
        case '5':
          lod.push(x);
          break;
        case '6':
          rest.push(x);
          break;
        default:
      }
    }
    set({
      sysCateLoc: {
        Attractions: att,
        Culture: cul,
        Festival: fes,
        Leports: lepo,
        Lodge: lod,
        Restaurant: rest,
      },
    });
  },
}));
