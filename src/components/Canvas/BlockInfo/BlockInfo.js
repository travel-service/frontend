import React, { useEffect } from 'react';
import { infoStore } from '../../../lib/zustand/infoStore';

const AttractionInfo = (locationId) => {
  const { totalInfo, getInfo } = infoStore();
  const { id } = locationId;

  useEffect(() => {
    getInfo(id, 'attraction');
  }, [getInfo, id]);

  if (totalInfo.parking === true) {
    totalInfo.parking = '가능';
  } else {
    totalInfo.parking = '불가능';
  }
  return (
    <div>
      관광지 정보
      <br />
      이름: {totalInfo.name}
      <br />
      주소: {totalInfo.address1}
      <br />
      상세주소: {totalInfo.address2}
      <br />
      이미지: {totalInfo.image}
      <br />
      이미지2: {totalInfo.image2}
      <br />
      전화: {totalInfo.tel}
      <br />
      설명: {totalInfo.summary}
      <br />
      상세설명: {totalInfo.report}
      <br />
      주차여부: {totalInfo.parking}
      <br />
      휴일: {totalInfo.restDate}
      <br />
      이용시간: {totalInfo.useTime}
      <br />
    </div>
  );
};

const CultureInfo = (locationId) => {
  const { totalInfo, getInfo } = infoStore();
  const { id } = locationId;

  useEffect(() => {
    getInfo(id, 'culture');
  }, [getInfo, id]);

  if (totalInfo.parking === true) {
    totalInfo.parking = '가능';
  } else {
    totalInfo.parking = '불가능';
  }
  return (
    <div>
      문화시설 정보
      <br />
      이름: {totalInfo.name}
      <br />
      주소: {totalInfo.address1}
      <br />
      상세주소: {totalInfo.address2}
      <br />
      이미지: {totalInfo.image}
      <br />
      이미지2: {totalInfo.image2}
      <br />
      전화: {totalInfo.tel}
      <br />
      설명: {totalInfo.summary}
      <br />
      상세설명: {totalInfo.report}
      <br />
      주차여부: {totalInfo.parking}
      <br />
      휴일: {totalInfo.restDate}
      <br />
      이용요금: {totalInfo.fee}
      <br />
      이용시간: {totalInfo.useTime}
      <br />
      소요시간: {totalInfo.spendTime}
      <br />
    </div>
  );
};

const FestivalInfo = (locationId) => {
  const { totalInfo, getInfo } = infoStore();
  const { id } = locationId;
  // console.log(id);

  useEffect(() => {
    getInfo(id, 'festival');
  }, [getInfo, id]);

  return (
    <div>
      축제 정보
      <br />
      이름: {totalInfo.name}
      <br />
      주소: {totalInfo.address1}
      <br />
      상세주소: {totalInfo.address2}
      <br />
      이미지: {totalInfo.image}
      <br />
      이미지2: {totalInfo.image2}
      <br />
      전화: {totalInfo.tel}
      <br />
      설명: {totalInfo.summary}
      <br />
      상세설명: {totalInfo.report}
      <br />
      시작일: {totalInfo.startDate}
      <br />
      종료일: {totalInfo.endDate}
      <br />
      홈페이지: {totalInfo.homepage}
      <br />
      장소: {totalInfo.place}
      <br />
      위치안내: {totalInfo.placeInfo}
      <br />
      공연시간: {totalInfo.playTime}
      <br />
      프로그램: {totalInfo.programe}
      <br />
      이용요금: {totalInfo.fee}
      <br />
    </div>
  );
};

const LeportsInfo = (locationId) => {
  const { totalInfo, getInfo } = infoStore();
  const { id } = locationId;

  useEffect(() => {
    getInfo(id, 'leports');
  }, [getInfo, id]);

  if (totalInfo.parking === true) {
    totalInfo.parking = '가능';
  } else {
    totalInfo.parking = '불가능';
  }
  return (
    <div>
      레포츠 정보
      <br />
      이름: {totalInfo.name}
      <br />
      주소: {totalInfo.address1}
      <br />
      상세주소: {totalInfo.address2}
      <br />
      이미지: {totalInfo.image}
      <br />
      이미지2: {totalInfo.image2}
      <br />
      전화: {totalInfo.tel}
      <br />
      설명: {totalInfo.summary}
      <br />
      상세설명: {totalInfo.report}
      <br />
      개장기간: {totalInfo.openPeriod}
      <br />
      주차여부: {totalInfo.parking}
      <br />
      예약: {totalInfo.reservation}
      <br />
      휴일: {totalInfo.restDate}
      <br />
      이용요금: {totalInfo.fee}
      <br />
      이용시간: {totalInfo.useTime}
      <br />
    </div>
  );
};

const LodgeInfo = (locationId) => {
  const { totalInfo, getInfo } = infoStore();
  const { id } = locationId;

  useEffect(() => {
    getInfo(id, 'lodge');
  }, [getInfo, id]);

  if (totalInfo.parking === true) {
    totalInfo.parking = '가능';
  } else {
    totalInfo.parking = '불가능';
  }
  return (
    <div>
      숙소 정보
      <br />
      이름: {totalInfo.name}
      <br />
      주소: {totalInfo.address1}
      <br />
      상세주소: {totalInfo.address2}
      <br />
      이미지: {totalInfo.image}
      <br />
      이미지2: {totalInfo.image2}
      <br />
      전화: {totalInfo.tel}
      <br />
      설명: {totalInfo.summary}
      <br />
      상세설명: {totalInfo.report}
      <br />
      체크인 시간: {totalInfo.checkInTime}
      <br />
      체크아웃 시간: {totalInfo.checkOutTime}
      <br />
      취사 여부: {totalInfo.chkCooking}
      <br />
      주차여부: {totalInfo.parking}
      <br />
      예약: {totalInfo.reservationUrl}
      <br />
      부대시설: {totalInfo.subfacility}
      <br />
    </div>
  );
};

const RestaurantInfo = (locationId) => {
  const { totalInfo, getInfo } = infoStore();
  const { id } = locationId;
  // console.log(id);

  useEffect(() => {
    getInfo(id, 'restaurant');
  }, [getInfo, id]);

  if (totalInfo.parking === true) {
    totalInfo.parking = '가능';
  } else {
    totalInfo.parking = '불가능';
  }
  return (
    <div>
      음식점 정보
      <br />
      이름: {totalInfo.name}
      <br />
      주소: {totalInfo.address1}
      <br />
      상세주소: {totalInfo.address2}
      <br />
      이미지: {totalInfo.image}
      <br />
      이미지2: {totalInfo.image2}
      <br />
      전화: {totalInfo.tel}
      <br />
      설명: {totalInfo.summary}
      <br />
      상세설명: {totalInfo.report}
      <br />
      인기메뉴: {totalInfo.popularMenu}
      <br />
      영업시간: {totalInfo.openTime}
      <br />
      포장여부: {totalInfo.packing}
      <br />
      주차여부: {totalInfo.parking}
      <br />
      휴일: {totalInfo.restDate}
      <br />
      메뉴: {totalInfo.menu}
      <br />
    </div>
  );
};

function BlockInfo(typeId) {
  console.log('BlockInfo');
  const { type, id } = typeId;

  switch (type) {
    case 'Attraction':
      return <AttractionInfo id={id} />;
    case 'Culture':
      return <CultureInfo id={id} />;
    case 'Festival':
      return <FestivalInfo id={id} />;
    case 'Leports':
      return <LeportsInfo id={id} />;
    case 'Lodge':
      return <LodgeInfo id={id} />;
    case 'Restaurant':
      return <RestaurantInfo id={id} />;
    default:
      return;
  }
}

export default BlockInfo;
