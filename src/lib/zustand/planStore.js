import create from 'zustand';
import * as planAPI from 'lib/api/plan';
import * as locationAPI from 'lib/api/location';
import { persist } from 'zustand/middleware';
import { memLocStore } from './memberLocStore';

export const useStore = create(
  persist(
    (set, get) => ({
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
            Attraction: [],
            Culture: [],
            Festival: [],
            Leports: [],
            Lodge: [],
            Restaurant: [],
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
        Attraction: [],
        Culture: [],
        Festival: [],
        Leports: [],
        Lodge: [],
        Restaurant: [],
      },

      // 0719 찬우 수정 category
      // category: {
      //   1: { eng: 'Attraction', kor: '관광지' },
      //   2: { eng: 'Culture', kor: '문화시설' },
      //   3: { eng: 'Festival', kor: '축제' },
      //   4: { eng: 'Leports', kor: '레포츠' },
      //   5: { eng: 'Lodge', kor: '숙박 시설' },
      //   6: { eng: 'Restaurant', kor: '음식점' },
      // },

      category: {
        Attraction: '관광지',
        Culture: '문화시설',
        Festival: '축제',
        Leports: '레포츠',
        Lodge: '숙박시설',
        Restaurant: '음식점',
      },

      //onAdd: (loc, type) => set(state => ({ selLoc: [...state.selLoc, loc] })),
      onAdd: (loc, type) => {
        // 0718 찬우 수정
        set((state) => ({
          selCateLoc: {
            ...state.selCateLoc,
            [type]: [...state.selCateLoc[type], loc],
          },
        }));
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
        let tmpSelTypeArr = get().selCateLoc[type].filter((obj) => {
          return obj.locationId !== locId;
        });
        set((state) => ({
          selCateLoc: {
            ...state.selCateLoc,
            [type]: tmpSelTypeArr,
          },
        }));
        
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
        let n = res.dayForm.length;
        if (n > 0) {
          // day get 하고, locId를 selLoc에서 id를 찾아넣는다.(name과 image를 로딩하기 위한)
          let tempDayArr = Array.from(
            { length: get().userPlan.periods },
            () => [],
          );
          let tmpSelCateLoc = {
            ...get().selCateLoc,
            member: memLocStore.getState().memberLocations,
          };
          for (let i = 0; i < res.dayForm.length; i++) {
            let tmp = res.dayForm[i];
            for (let key in tmpSelCateLoc) {
              let flag = 0;
              for (let j = 0; j < tmpSelCateLoc[key].length; j++) {
                if (tmpSelCateLoc[key][j].locationId === tmp.locationId) {
                  let idx = tmp.days - 1;
                  tmp.name = tmpSelCateLoc[key][j].name;
                  tmp.image = tmpSelCateLoc[key][j].image;
                  tmp.address1 = tmpSelCateLoc[key][j].address1;
                  tempDayArr[idx].push(tmp);
                  break;
                }
              }
              if (flag) break;
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
      postPlan: async (idx) => {
        const userPlan = get().userPlan;
        // const userPlanConcept = get().userPlanConcept;
        const userTravelDay = get().userTravelDay;
        const id = get().id;

        if (idx === 0 && !id) {
          // plan 생성
          const res = await planAPI.createPlan(userPlan);
          if (res > 0) {
            // 정상적 id 반환
            set({ id: res });
          } else {
            // postPlan 에러
          }
        } else if (idx === 0 && id > 0) {
          // plan 수정
        } else if (idx === 1) {
          // selectedLocation 생성 및 수정
        } else if (idx === 2) {
          // day 생성 및 수정
          if (!userTravelDay.status) {
            // day가 없는 상태 => 생성 필요 post
            await planAPI.postPlanDay(userTravelDay, id);
            //  성공시 "200 리턴"(통일 필요)
          } else {
            // day가 있는 상태 => 수정 필요 put
            await planAPI.updatePlanDay(userTravelDay, id);
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
  sysCateLocCoords: {
    CoordsList: [],
  },
  flag: false,

  getSysLoc: async () => {
    if (get().flag === false) {
      const response = await axios.get('http://localhost:4000/locations_v2');
      let att = [];
      let cul = [];
      let fes = [];
      let lepo = [];
      let lod = [];
      let rest = [];
      for (let x of response.data["Attraction"]) {
        x.isSelect = false;
        att.push(x);
      }
      for (let x of response.data["Culture"]) {
        x.isSelect = false;
        cul.push(x);
      }
      for (let x of response.data["Festival"]) {
        x.isSelect = false;
        fes.push(x);
      }
      for (let x of response.data["Leports"]) {
        x.isSelect = false;
        lepo.push(x);
      }
      for (let x of response.data["Lodge"]) {
        x.isSelect = false;
        lod.push(x);
      }
      for (let x of response.data["Restaurant"]) {
        x.isSelect = false;
        rest.push(x);
      }
      set({
        sysCateLoc: {
          Attraction: att,
          Culture: cul,
          Festival: fes,
          Leports: lepo,
          Lodge: lod,
          Restaurant: rest,
        },
      });
      set({flag: true})
    }
  },

  getSysLocCoords: async () => {
    const response = await axios.get('http://localhost:4000/locations_mark');
    let att = [];
    // let cul = [];
    // let fes = [];
    // let lepo = [];
    // let lod = [];
    // let rest = [];
    for (let x of response.data["Attraction"]) {
      x.isSelect = false;
      att.push(x);
    }
    // for (let x of response.data["Festival"]) {
    //   x.isSelect = false;
    //   fes.push(x);
    // }
    set({
      sysCateLocCoords: {
        CoordsList: att,
        // Culture: cul,
        // Festival: fes,
        // Leports: lepo,
        // Lodge: lod,
        // Restaurant: rest,
      },
    });
  },
}));
