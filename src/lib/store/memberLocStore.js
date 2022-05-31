import create from 'zustand';

export const memLocStore = create((set, get) => ({
  // 0530 memberLoc 과 이를 바꾸는 onChangeMemberLoc함수 작성 필요
  memberLocations: [],
  createMemberLoc: (form, coords, detail) => {
    let obj = {};
    if (detail) {
      Object.keys(detail).map((e) => {
        obj[e] = ''; // 디폴트값 설정
        if (detail[e].length > 2) obj[e] = detail[e][2];
        return obj;
      });
    }
    const { name, share, type, address, image } = form;
    const { lat, lng } = coords;
    let isShare = false;
    if (share === 'true') isShare = true;
    let loc = {
      location: {
        name,
        type,
        coords: {
          lat,
          lng,
        },
        address,
        image,
        isMember: true,
      },
      member_location: {
        memberId: 1,
        isPublic: isShare,
      },
      [type]: obj,
    };
    set({
      memberLocations: [...get().memberLocations, loc],
    });
  },
  onChangeTypeInfo: (type, key, val) => {
    set((state) => ({
      typeInfo: {
        ...state.typeInfo,
        [type]: {
          ...state.typeInfo[type],
          [key]: [
            state.typeInfo[type][key][0],
            state.typeInfo[type][key][1],
            val,
          ],
        },
      },
    }));
  },
  resetTypeInfo: (type, initData) => {
    console.log(type, initData);
    set((state) => ({
      typeInfo: {
        ...state.typeInfo,
        [type]: initData,
      },
    }));
  },
  // 타입별 다른 정보 입력 폼
  typeInfo: {
    Attractions: {
      parking: ['주자 가능여부', false],
      restDate: ['휴무일', 'ex. 월, 화 휴무'], // null
      useTime: ['이용 시간', 'ex. 09:00 ~ 22:00'], // 09:00 ~ 22:00 (매표마감 21:20)
    },
    Culture: {
      parking: ['주자 가능여부', false],
      restDate: ['휴무일', 'ex. 월, 화 휴무'],
      fee: ['가격', '10,000원'],
      useTime: ['이용 시간', 'ex. 09:00 ~ 22:00'],
      spendTime: ['소요시간', 'ex. 2시간'],
    },
    Festival: {
      startDate: ['개막날', '20220930'], // 20220318
      endDate: ['폐막날', '20221009'], // 20220320
      homepage: [
        '홈페이지 주소',
        'http://www.maskdance.com/2019/sub7/sub0.asp',
      ], // null
      place: ['장소', '경상북도 안동시 육사로 239 탈춤공원'], // 제주시 애월읍 봉성리 새별오름(평화로변)
      placeInfo: ['장소 정보?', '탈춤 공원 무대'],
      playTime: ['행사 시간', '30분'],
      program: ['프로그램', '하회별신굿탈놀이'],
      fee: ['이용 가격', '무료'],
    },
    Leports: {
      parking: ['주자 가능여부', false],
      openPeriod: ['개장 시기', ''],
      reservation: ['예약', '예약 링크?'],
      restDate: ['휴무일', 'ex. 월, 화 휴무'],
      fee: ['이용 가격', '무료'],
      useTime: ['이용 시간', 'ex. 09:00 ~ 22:00'],
    },
    Lodge: {
      checkInTime: ['체크인', '18:00'],
      checkOutTime: ['체크아웃', '12:00'],
      cooking: ['취식 가능여부', false],
      parking: ['주자 가능여부', false],
      reservationUrl: ['예약 링크', 'www.example.com'],
      subfacility: ['부대 시설', '수영장'],
    },
    Restaurant: {
      popularMenu: ['인기메뉴', '김치찌개, 된장찌개...'],
      openTime: ['오픈 시간', 'ex. 09:00 ~ 22:00'],
      packing: ['포장 가능여부', false],
      parking: ['주자 가능여부', false],
      restDate: ['휴무일', 'ex. 월, 화 휴무'],
      menu: ['메뉴', '김밥: 3000원, 우동: 4000원, ...'],
    },
  },
}));
