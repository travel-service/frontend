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
      conceptForm: {},
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
          conceptForm: {
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
      setId: (input) => {
        set({ id: input });
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
          conceptForm: { ...state.conceptForm, concept: input },
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
        set((state) => ({
          userPlan: { ...state.userPlan, destination: input },
        }));
      },
      setThumbnail: (input) => {
        set((state) => ({ userPlan: { ...state.userPlan, thumbnail: input } }));
      },

      // 압축 로직, {a: [], b: [], ...} => [id, id...]
      zipSelLoc: (obj) => {
        // item는 객체 배열, locationId값으로만 된 배열 생성
        let result = [];
        for (let type in obj) {
          for (let loc of obj[type]) {
            result.push(loc['locationId']);
          }
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

      // GET userPlan
      getPlan: async (id) => {
        const res = await planAPI.getPlan(id);
        const con = await planAPI.getConcpet(id);
        set({ userPlan: res.planForm });
        set({ conceptForm: { concept: con.conceptForm } });
      },

      // GET day
      getPlanDays: async (planId) => {
        if (planId) {
          set({
            userTravelDay: {
              travelDay: [],
              status: true,
            },
          });
        }
        planId = planId ? planId : get().id;
        const res = await planAPI.getPlanDay(planId);
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
          let selLocs = await locationAPI.getSelectedLocations(planId);
          let memLocs = await memLocStore.getState().getMemberLocations();
          let tmpSelCateLoc = {
            // ...get().selCateLoc,
            ...selLocs.data.blockLocations,
            member: memLocs,
          };
          for (let i = 0; i < res.dayForm.length; i++) {
            let tmp = res.dayForm[i];
            for (let key in tmpSelCateLoc) {
              let flag = 0;
              for (let j = 0; j < tmpSelCateLoc[key].length; j++) {
                if (tmpSelCateLoc[key][j].locationId === tmp.locationId) {
                  flag = 1;
                  let idx = tmp.days - 1;
                  tmp.name = tmpSelCateLoc[key][j].name;
                  tmp.image = tmpSelCateLoc[key][j].image;
                  tmp.address1 = tmpSelCateLoc[key][j].address1;

                  // dayForm의 days가 오름차순으로 온다는 가정
                  if (tempDayArr.length > idx) {
                    // 이미 day 배열 존재
                    tempDayArr[idx].push(tmp);
                  } else {
                    // 새로운 day 배열
                    tempDayArr.push([tmp]);
                  }
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

      // POST plan (다음으로, 저장하기), cP 플랜 생성 판단용
      postPlan: async (idx, cP = false) => {
        // idx => 0: settingPage, 1: selectPage, 2: buildPage
        const userPlan = get().userPlan;
        const conceptForm = get().conceptForm;
        const userTravelDay = get().userTravelDay;
        const id = get().id;

        // 여행 설정 페이지
        if (idx === 0 && cP) {
          // plan 생성
          const res = await planAPI.createPlan(userPlan);
          if (res && res.planId) {
            // 정상적 id 반환
            set({ id: res.planId });
          } else {
            // postPlan 에러
          }
        } else if (idx === 0 && id > 0) {
          // plan 수정
          delete userPlan.planId;
          if (!userPlan.thumbnail) {
            userPlan.thumbnail = '';
          }
          await planAPI.postPlan(id, userPlan);
          await planAPI.postConcept(id, conceptForm);
        }
        // 블록 선택 페이지
        else if (idx === 1) {
          // 0816 selectedLocation 생성 및 수정
          // selLocIdArr: selCateLoc => locationId만 뽑아서 배열로 압축
          let selLocIdArr = get().zipSelLoc(get().selCateLoc);
          // post api(생성 or 수정)
          await locationAPI.postSelectedLocations(id, selLocIdArr);
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
