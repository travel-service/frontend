import axios from 'axios';
import create from 'zustand';
import * as planAPI from 'lib/api/plan';
import * as locationAPI from 'lib/api/location';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      // id: null,
      // userPlan: {
      //   // planForm
      //   depart: '',
      //   destination: '',
      //   name: '',
      //   periods: 1,
      //   planStatus: 'MAIN',
      //   thumbnail: '', // FormData, 이름
      // },
      // userPlanConcept: {
      //   concept: [],
      // },
      // userTravelDay: {
      //   travelDay: [],
      //   status: false,
      // },
      id: null,
      userPlan: {},
      userPlanConcept: {},
      userTravelDay: {},
      // 여행 생성 후 다시 생성시 초기화를 위함(랜딩 페이지오면 초기화)
      initializePlanForm: () => {
        set(() => ({
          id: null,
          userPlan: {
            depart: '',
            destination: '',
            name: '',
            periods: 1,
            planStatus: 'MAIN',
            thumbnail: '',
          },
          userPlanConcept: {
            concept: [],
          },
          userTravelDay: {
            travelDay: [],
            status: false,
          },
          selCateLoc: {
            selAttraction: [],
            selCulture: [],
            selFestival: [],
            selLeports: [],
            selLodge: [],
            selRestaurant: [],
          },
        }));
      },
      Concepts: [
        { id: 1, name: '우정', eword: 'Friendship' },
        { id: 2, name: '연인', eword: 'Love' },
        { id: 3, name: '가족', eword: 'Family' },
        { id: 4, name: '혼자', eword: 'Alone' },
      ],
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
        set((state) => ({
          userPlan: { ...state.userPlan, destination: input },
        }));
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
        selAttraction: [],
        selCulture: [],
        selFestival: [],
        selLeports: [],
        selLodge: [],
        selRestaurant: [],
      },

      category: {
        1: { eng: 'Attraction', kor: '관광지' },
        2: { eng: 'Culture', kor: '문화시설' },
        3: { eng: 'Festival', kor: '축제' },
        4: { eng: 'Leports', kor: '레포츠' },
        5: { eng: 'Lodge', kor: '숙박 시설' },
        6: { eng: 'Restaurant', kor: '음식점' },
      },

      tmpCategory: {
        Attraction: '관광지',
        Culture: '문화시설',
        Festival: '축제',
        Leports: '레포츠',
        Lodge: '숙박 시설',
        Restaurant: '음식점',
      },

      //onAdd: (loc, type) => set(state => ({ selLoc: [...state.selLoc, loc] })),
      onAdd: (loc, type) => {
        // 0718 찬우 수정
        let selType = `sel${type}`; // ex. selAttraction
        set((state) => ({
          selCateLoc: {
            ...state.selCateLoc,
            [selType]: [...state.selCateLoc[selType], loc],
          },
        }));
        console.log(get().selCateLoc);
        // switch (type) {
        //   case '1':
        //     //  set(state => ({ selAttraction: [...state.selAttraction, loc] }));
        //     set((state) => ({
        //       selCateLoc: {
        //         ...state.selCateLoc,
        //         selAttraction: [...state.selCateLoc.selAttraction, loc],
        //       },
        //     }));
        //     break;
        //   case '2':
        //     // set(state => ({ selCulture: [...state.selCulture, loc] }));
        //     set((state) => ({
        //       selCateLoc: {
        //         ...state.selCateLoc,
        //         selCulture: [...state.selCateLoc.selCulture, loc],
        //       },
        //     }));
        //     break;
        //   case '3':
        //     // set(state => ({ selFestival: [...state.selFestival, loc] }));
        //     set((state) => ({
        //       selCateLoc: {
        //         ...state.selCateLoc,
        //         selFestival: [...state.selCateLoc.selFestival, loc],
        //       },
        //     }));
        //     break;
        //   case '4':
        //     // set(state => ({ selLeports: [...state.selLeports, loc] }));
        //     set((state) => ({
        //       selCateLoc: {
        //         ...state.selCateLoc,
        //         selLeports: [...state.selCateLoc.selLeports, loc],
        //       },
        //     }));
        //     break;
        //   case '5':
        //     // set(state => ({ selLodge: [...state.selLodge, loc] }));
        //     set((state) => ({
        //       selCateLoc: {
        //         ...state.selCateLoc,
        //         selLodge: [...state.selCateLoc.selLodge, loc],
        //       },
        //     }));
        //     break;
        //   case '6':
        //     // set(state => ({ selRestaurant: [...state.selRestaurant, loc] }));
        //     set((state) => ({
        //       selCateLoc: {
        //         ...state.selCateLoc,
        //         selRestaurant: [...state.selCateLoc.selRestaurant, loc],
        //       },
        //     }));
        //     break;
        //   default:
        // }
      },

      //remove: (locId) => set(state => ({ selLoc: state.selLoc.filter(loc => loc.id !== locId)})),
      remove: (locId, type) => {
        console.log(locId, type);
        let selType = `sel${type}`;
        let tmpSelTypeArr = get().selCateLoc[selType].filter((obj) => {
          return obj.locationId !== locId;
        });
        set((state) => ({
          selCateLoc: {
            ...state.selCateLoc,
            [selType]: tmpSelTypeArr,
          },
        }));
        console.log(get().selCateLoc);

        // switch (type) {
        //   case '1':
        //     // set(state => ({ selAttraction: state.selAttraction.filter(loc => loc.id !== locId)}));
        //     set((state) => ({
        //       selCateLoc: {
        //         ...state.selCateLoc,
        //         selAttraction: state.selCateLoc.selAttraction.filter(
        //           (loc) => loc.id !== locId,
        //         ),
        //       },
        //     }));
        //     break;
        //   case '2':
        //     // set(state => ({ selCulture: state.selCulture.filter(loc => loc.id !== locId)}));
        //     set((state) => ({
        //       selCateLoc: {
        //         ...state.selCateLoc,
        //         selCulture: state.selCateLoc.selCulture.filter(
        //           (loc) => loc.id !== locId,
        //         ),
        //       },
        //     }));
        //     break;
        //   case '3':
        //     // set(state => ({ selFestival: state.selFestival.filter(loc => loc.id !== locId)}));
        //     set((state) => ({
        //       selCateLoc: {
        //         ...state.selCateLoc,
        //         selFestival: state.selCateLoc.selFestival.filter(
        //           (loc) => loc.id !== locId,
        //         ),
        //       },
        //     }));
        //     break;
        //   case '4':
        //     // set(state => ({ selLeports: state.selLeports.filter(loc => loc.id !== locId)}));
        //     set((state) => ({
        //       selCateLoc: {
        //         ...state.selCateLoc,
        //         selLeports: state.selCateLoc.selLeports.filter(
        //           (loc) => loc.id !== locId,
        //         ),
        //       },
        //     }));
        //     break;
        //   case '5':
        //     // set(state => ({ selLodge: state.selLodge.filter(loc => loc.id !== locId)}));
        //     set((state) => ({
        //       selCateLoc: {
        //         ...state.selCateLoc,
        //         selLodge: state.selCateLoc.selLodge.filter(
        //           (loc) => loc.id !== locId,
        //         ),
        //       },
        //     }));
        //     break;
        //   case '6':
        //     // set(state => ({ selRestaurant: state.selRestaurant.filter(loc => loc.id !== locId)}));
        //     set((state) => ({
        //       selCateLoc: {
        //         ...state.selCateLoc,
        //         selRestaurant: state.selCateLoc.selRestaurant.filter(
        //           (loc) => loc.id !== locId,
        //         ),
        //       },
        //     }));
        //     break;
        //   default:
        // }
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
      },

      // GET day
      getPlanDays: async (id) => {
        const res = await planAPI.getPlanDay(id);
        if (!res) {
          console.log('get day 실패');
          return;
        }
        // console.log(res.dayForm.length);
        let n = res.dayForm.length;
        if (n > 0) {
          let tempDayArr = [];
          for (let i = 0; i < n; i++) {
            const idx = res.dayForm[i].days - 1;
            if (!tempDayArr[idx]) {
              // undefined
              tempDayArr[idx] = [res.dayForm[i]];
            } else {
              tempDayArr[idx].push(res.dayForm[i]);
            }
          }
          set({
            userTravelDay: {
              travelDay: tempDayArr,
              status: true,
            },
          });
        }
      },

      // POST plan (다음으로, 저장하기)
      // create plan, post, 반환 id, id 설정 완료
      postPlan: async (type) => {
        // 매개변수 type는 userPlan id
        const userPlan = get().userPlan;
        // const userPlanConcept = get().userPlanConcept;
        const userTravelDay = get().userTravelDay;
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
          if (!userTravelDay.status) {
            // day가 없는 상태 => 생성 필요 post
            console.log('새로운 dayForm 생성');
            planAPI.postPlanDay(userTravelDay, id);
          } else {
            // day가 있는 상태 => 수정 필요 put
            console.log('dayForm 수정');
            planAPI.updatePlanDay(userTravelDay, id);
          }
        }
      },
    }),
    {
      // 새로고침 후 상태 유지, sessionStorage 사용
      name: 'plan-storage',
      getStorage: () => sessionStorage,
    },
  ),
);

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

  getSysLoc: async () => {
    const response = await locationAPI.getLocationBlock();
    // const obj = Object.values(response.data);
    console.log(response.data);
    if (response.status === 200) {
      const { Attraction, Culture, Festival, Leports, Lodge, Restaurant } =
        response.data;
      set({
        sysCateLoc: {
          Attraction,
          Culture,
          Festival,
          Leports,
          Lodge,
          Restaurant,
        },
      });
    }
    //   let att = [];
    //   let cul = [];
    //   let fes = [];
    //   let lepo = [];
    //   let lod = [];
    //   let rest = [];
    //   for (let x of obj) {
    //     switch (x.type) {
    //       case '1':
    //         att.push(x);
    //         break;
    //       case '2':
    //         cul.push(x);
    //         break;
    //       case '3':
    //         fes.push(x);
    //         break;
    //       case '4':
    //         lepo.push(x);
    //         break;
    //       case '5':
    //         lod.push(x);
    //         break;
    //       case '6':
    //         rest.push(x);
    //         break;
    //       default:
    //     }
    //   }
    //   set({
    //     sysCateLoc: {
    //       Attraction: att,
    //       Culture: cul,
    //       Festival: fes,
    //       Leports: lepo,
    //       Lodge: lod,
    //       Restaurant: rest,
    //     },
    //   });
  },
}));
