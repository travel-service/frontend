import React, { useState, useEffect, useRef } from 'react';
import lodgeMarker from '../../lib/images/marker 아이콘_25x25 숙소마크.png';
import lodgePicker from '../../lib/images/25x25 숙소마크 사본.png';
import attractionMarker from '../../lib/images/marker 아이콘_25x25 관광지마크.png';
import attractionPicker from '../../lib/images/25x25 관광지마크 사본.png';
import ModalModule from 'components/common/modal/ModalModule';
import 'lib/styles/Modal.css';
import '../../lib/styles/test.css';
import styled from 'styled-components';
import BlockInfo from 'components/Canvas/BlockInfo/BlockInfo';
import { sysLocStore } from 'lib/zustand/planStore';

const Div = styled.div`
  z-index: 0;
`;

const { kakao } = window;

const MapContainer = ({ coords }) => {
  const [kakaoMap, setKakaoMap] = useState(null);
  const container = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [info, setInfo] = useState({ id: 0, type: 0 });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const { lat, lng } = sysLocStore();

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(33.280701, 126.570667),
      level: 7,
    };

    let map = new kakao.maps.Map(container.current, options); // 카카오 맵
    let mapTypeControl = new kakao.maps.MapTypeControl(); // 지도 타입전환 컨드롤러
    let zoomControl = new kakao.maps.ZoomControl(); // 줌 제어 컨트롤러
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    setKakaoMap(map);
  }, [container]);

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }

    var positions = [],
      selectedMarker = null;

    if (coords) {
      for (let key in coords) {
        for (var i = 0; i < coords[key].length; i++) {
          positions[i] = {
            id: coords[key][i].id,
            title: coords[key][i].name,
            latlng: new kakao.maps.LatLng(
              coords[key][i].coords.latitude,
              coords[key][i].coords.longitude,
            ),
            type: key,
          };
        }
      }

      var markerSize = new kakao.maps.Size(25, 25),
        pickerSize = new kakao.maps.Size(40, 40);

      for (var i = 0; i < positions.length; i++) {
        addMarker(positions[i]);
      }

      function addMarker(position) {
        var attMarker = createMarkerImg(attractionMarker, markerSize),
          attPicker = createMarkerImg(attractionPicker, pickerSize),
          logMarker = createMarkerImg(lodgeMarker, markerSize),
          logPicker = createMarkerImg(lodgePicker, pickerSize);

        var marker = new kakao.maps.Marker({
          map: kakaoMap,
          position: position.latlng,
        });

        //마커 생성 함수
        function setMarker() {
          if (position.type === 'Attraction') {
            marker.setImage(attMarker);
            marker.normalImage = attMarker;
          } else {
            marker.setImage(logMarker);
            marker.normalImage = logMarker;
          }
        }

        //피커 생성 함수
        function setPicker() {
          if (position.type === 'Attraction') {
            marker.setImage(attPicker);
          } else {
            marker.setImage(logPicker);
          }
        }

        setMarker();

        const getOverlayContent = () => {
          const content = document.createElement('div');
          content.setAttribute('class', 'wrap');

          const info = document.createElement('div');
          info.setAttribute('class', 'info');

          const titleArea = document.createElement('div');
          titleArea.setAttribute('class', 'title');

          const title = document.createElement('div');
          title.onclick = () => (setInfo(position), openModal());
          title.innerHTML = position.title;

          const close = document.createElement('div');
          close.setAttribute('class', 'close');
          close.onclick = () => (
            customOverlay.setMap(null), setMarker(), (selectedMarker = null)
          );

          content.appendChild(info);
          info.appendChild(titleArea);
          titleArea.append(title, close);
          return content;
        };

        var customOverlay = new kakao.maps.CustomOverlay({
          content: getOverlayContent(),
          clickable: true,
          position: marker.getPosition(),
        });

        kakao.maps.event.addListener(marker, 'click', function () {
          if (!selectedMarker || selectedMarker !== marker) {
            !!selectedMarker &&
              selectedMarker.setImage(selectedMarker.normalImage);
            setPicker();
          }
          customOverlay.setMap(kakaoMap);
          selectedMarker = marker;
        });
      }

      function createMarkerImg(img, size) {
        var markerImg = new kakao.maps.MarkerImage(img, size);

        return markerImg;
      }
    } else {
      return;
    }

    let latlng = new kakao.maps.LatLng(lat, lng);
    kakaoMap.panTo(latlng);
  }, [kakaoMap, coords, lat, lng]);

  return (
    <>
      <Div
        id="myMap"
        ref={container}
        style={{
          height: '553px',
          borderRadius: '10px',
          border: '1px solid #E5E7E8'
        }}
      ></Div>
      <ModalModule
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        header="상세정보"
      >
        <BlockInfo type={info.type} id={info.id} />
      </ModalModule>
    </>
  );
};

export default MapContainer;
