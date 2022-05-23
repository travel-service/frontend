/*global kakao*/
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

const Div = styled.div`
  width: 100%;
  height: 500px;
`;

const MapContainer = ({ searchPlace, forMarkerPositions }) => {
  // let container = document.getElementById('myMap'); // DOM 접근
  const [kakaoMap, setKakaoMap] = useState(null);
  const [area, setArea] = useState(null);
  const [, setMarkers] = useState([]);
  const container = useRef(null);

  const initMap = useCallback(
    (options) => {
      let marker = new kakao.maps.Marker(); // 마커
      let infoWindow = new kakao.maps.InfoWindow({ zIndex: 1 }); // 정보창 띄울 공간
      let map = new kakao.maps.Map(container.current, options); // 카카오 맵
      let mapTypeControl = new kakao.maps.MapTypeControl(); // 지도 타입전환 컨드롤러
      let zoomControl = new kakao.maps.ZoomControl(); // 줌 제어 컨트롤러
      let geocoder = new kakao.maps.services.Geocoder();
      let ps = new kakao.maps.services.Places(); // 장소 검색 객체

      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      const displayMarker = (place) => {
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x),
        });
        kakao.maps.event.addListener(marker, 'click', () => {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출
          infoWindow.setContent(
            '<div style="padding:5px;font-size:12px;">' +
              place.place_name +
              '</div>',
          );
          infoWindow.open(map, marker);
        });
      };

      const placesSearchCB = (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          let bounds = new kakao.maps.LatLngBounds();
          for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          map.setBounds(bounds);
        }
      };

      // if (!searchPlace) return;
      // ps.keywordSearch(searchPlace, placesSearchCB); // 키워드로 장소 검색

      // kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
      //   searchDetailAddrFromCoords(mouseEvent.latLng, (result, status) => {
      //     if (status === kakao.maps.services.Status.OK) {
      //       var detailAddr = !!result[0].road_address
      //         ? '<div>도로명주소 : ' +
      //           result[0].road_address.address_name +
      //           '</div>'
      //         : '';
      //       detailAddr +=
      //         '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
      //       var content =
      //         '<div class="bAddr">' +
      //         '<span class="title">법정동 주소정보</span>' +
      //         detailAddr +
      //         '</div>';
      //       // 마커를 클릭한 위치에 표시합니다
      //       marker.setPosition(mouseEvent.latLng);
      //       console.log(mouseEvent.latLng);
      //       setCoord({
      //         lat: null,
      //         lng: null,
      //       });
      //       marker.setMap(map);
      //       // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
      //       infoWindow.setContent(content);
      //       infoWindow.open(map, marker);
      //     }
      //   });
      // });
      // kakao.maps.event.addListener(map, 'idle', () => {
      //   searchAddrFromCoords(map.getCenter(), displayCenterInfo);
      // });
      // const searchAddrFromCoords = (coords, callback) => {
      //   // 좌표로 행정동 주소 정보를 요청합니다
      //   geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
      // };
      // const searchDetailAddrFromCoords = (coords, callback) => {
      //   // 좌표로 법정동 상세 주소 정보를 요청합니다
      //   geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
      // };
      // const displayCenterInfo = (result, status) => {
      //   if (status === kakao.maps.services.Status.OK) {
      //     var infoDiv = document.getElementById('centerAddr');
      //     for (var i = 0; i < result.length; i++) {
      //       // 행정동의 region_type 값은 'H' 이므로
      //       if (result[i].region_type === 'H') {
      //         infoDiv.innerHTML = result[i].address_name;
      //         break;
      //       }
      //     }
      //   }
      // };
    },
    [searchPlace],
  );

  useEffect(() => {
    // let marker = new kakao.maps.Marker(); // 마커
    const options = {
      // 기본 좌표와 맵 확대 레벨
      center: new kakao.maps.LatLng(33.499522, 126.531079),
      level: 3,
    };
    let map = new kakao.maps.Map(container.current, options); // 카카오 맵
    let mapTypeControl = new kakao.maps.MapTypeControl(); // 지도 타입전환 컨드롤러
    let zoomControl = new kakao.maps.ZoomControl(); // 줌 제어 컨트롤러
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    setKakaoMap(map);
    let geocoder = new kakao.maps.services.Geocoder();

    // 0523 카카오맵 좌표(대각 영역)
    // kakao.maps.event.addListener(map, 'idle', () => {
    //   let bounds = map.getBounds();
    //   let se = bounds.getSouthWest();
    //   let ne = bounds.getNorthEast();
    //   console.log(se, ne);
    // });

    const searchAddrFromCoords = (coords, callback) => {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    };
    // let ps = new kakao.maps.services.Places(); // 장소 검색 객체

    // initMap(options);
  }, [container, area]);

  // 0519 doing, 마커 표시까지 기능 구현, 여러개 검색하고 지역 이름 확인 창 여러개 유지되는 버그는 존재
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }

    let infoWindow = new kakao.maps.InfoWindow({ zIndex: 1 }); // 정보창 띄울 공간

    const nameList = forMarkerPositions.map((pos) => {
      return pos.place_name;
    });

    const positions = forMarkerPositions.map((pos) => {
      return new kakao.maps.LatLng(pos.y, pos.x);
    });

    setMarkers((markers) => {
      markers.forEach((marker) => marker.setMap(null));

      let markerList = positions.map((position) => {
        return new kakao.maps.Marker({ map: kakaoMap, position: position });
      });

      markerList.map((marker, i) => {
        console.log(marker);
        kakao.maps.event.addListener(marker, 'click', () => {
          infoWindow.setContent(
            '<div style="padding:5px;font-size:12px;">' +
              nameList[i] +
              '</div>',
          );
          infoWindow.open(kakaoMap, marker);
        });
      });

      return markerList;
    });

    if (positions.length > 0) {
      const bounds = positions.reduce(
        (bounds, latlng) => bounds.extend(latlng),
        new kakao.maps.LatLngBounds(),
      );
      kakaoMap.setBounds(bounds);
      // console.log(bounds);
    }
  }, [kakaoMap, forMarkerPositions]);

  return (
    <>
      {/* map을 띄울 영역: Div */}
      <Div
        id="myMap"
        style={
          {
            // width: '300px',
            // height: '300px',
          }
        }
        ref={container}
      ></Div>
      {/* <div className="hAddr">
        <span className="title">지도중심기준 행정동 주소정보</span>
        <span id="centerAddr"></span>
      </div> */}
    </>
  );
};

export default MapContainer;
