/*global kakao*/
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
`;

const Div = styled.div`
  width: 100%;
  height: 500px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderBtn = styled.button`
  height: 30px;
`;

const Ul = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  margin: 10px 0 30px 10px;
  padding: 5px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.7);
  z-index: 1;
  font-size: 12px;
  border-radius: 10px;
`;

const MapContainer = ({ searchPlace, forMarkerPositions, searchPlaces }) => {
  // let container = document.getElementById('myMap'); // DOM 접근
  const [kakaoMap, setKakaoMap] = useState(null);
  const [area, setArea] = useState(null);
  const [markers, setMarkers] = useState([]);
  const container = useRef(null);
  const [latLng, setLatLng] = useState(null);
  const [infoWin, setInfoWin] = useState(null);

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(37.5776087830657, 126.976896737645),
      level: 3,
    };
    let map = new kakao.maps.Map(container.current, options); // 카카오 맵
    let mapTypeControl = new kakao.maps.MapTypeControl(); // 지도 타입전환 컨드롤러
    let zoomControl = new kakao.maps.ZoomControl(); // 줌 제어 컨트롤러
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    setKakaoMap(map);
    console.log('create map');
  }, [container]);

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    let infoWindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    setInfoWin(infoWindow);

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
        kakao.maps.event.addListener(marker, 'mouseover', () => {
          displayInfoWindow(nameList[i], i);
        });
        kakao.maps.event.addListener(marker, 'mouseout', () => {
          infoWin.close();
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
    }
  }, [kakaoMap, forMarkerPositions]);

  const displayInfoWindow = (name, i) => {
    infoWin.setContent(
      '<div style="padding:5px;font-size:12px;">' + name + '</div>',
    );
    infoWin.open(kakaoMap, markers[i]);
  };

  const closeInfoWindow = () => {
    infoWin.close();
  };

  const onSelect = (e) => {
    console.log(e);
    // 0530
    // 선택 버튼 클릭시
    // CreateLoc에 있는 모달창에 이름, 좌표, 업데이트 !
    // 지도 클릭시 인포윈도우(주소정도만) 보여주면서 클릭 가능하게 만들기!
  };

  return (
    <Container>
      {/* map을 띄울 영역: Div */}
      <Div id="myMap" ref={container}></Div>
      {searchPlaces && (
        <Ul>
          {searchPlaces.map((e, i) => (
            <li
              onMouseEnter={() => displayInfoWindow(e.place_name, i)}
              onMouseLeave={() => closeInfoWindow()}
              key={i}
            >
              <Header>
                <h4>{e.place_name}</h4>
                <HeaderBtn onClick={() => onSelect(e)}>선택</HeaderBtn>
              </Header>
              <div>주소: {e.address_name}</div>
              {e.road_address_name && (
                <div>도로주소: {e.road_address_name}</div>
              )}
              {e.phone && <div>번호: {e.phone}</div>}
              <hr />
            </li>
          ))}
        </Ul>
      )}
    </Container>
  );
};

export default MapContainer;
