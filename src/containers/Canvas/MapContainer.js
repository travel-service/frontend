import React, { useState, useEffect, useRef } from 'react';
import imageTest from './마커테스트3.png'

const { kakao } = window;

const MapContainer = ({coords}) => {
  const [kakaoMap, setKakaoMap] = useState(null);
  const container = useRef(null);

  useEffect(() => {
    const options = {
      center : new kakao.maps.LatLng(33.280701, 126.570667),
        level: 7
      }

      let map = new kakao.maps.Map(container.current, options); // 카카오 맵
      let mapTypeControl = new kakao.maps.MapTypeControl(); // 지도 타입전환 컨드롤러
      let zoomControl = new kakao.maps.ZoomControl(); // 줌 제어 컨트롤러
      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      setKakaoMap(map);
    },[container]);

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }

    var positions = [];
    if(coords.length > 0 ) {
      for (var i = 0; i<coords.length; i++) {
        positions[i] = {id: coords[i].id, title: coords[i].name, latlng: new kakao.maps.LatLng(coords[i].coords.latitude, coords[i].coords.longitude),
          type: coords[i].type.type}
      }

      console.log(positions);
      var imageSrc1 = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      var imageSrc2 = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';

      for (var i = 0; i < positions.length; i++) {
        var imageSize = new kakao.maps.Size(25, 25);

        if (positions[i].type === 0) {
          var typeImg = new kakao.maps.MarkerImage(imageTest, imageSize)
        }
        else {
          var typeImg = new kakao.maps.MarkerImage(imageSrc2, imageSize)
        }


        var marker = new kakao.maps.Marker({
          id: positions[i].id,
          position: positions[i].latlng,
          title:  positions[i].title,
          type: positions[i].type,
          image: typeImg,
          clickable: true
        })
        marker.setMap(kakaoMap);

        var infowindow = new kakao.maps.InfoWindow({
          content : `<div style="padding:10px; height:60px;">${positions[i].title}</div>`,
          // content : positions[i].title,
          removable : true
        });

        kakao.maps.event.addListener(marker, 'click', makeOverListener(kakaoMap, marker, infowindow));
      }

      // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 없을 시 마지막 마커만 기능함
      function makeOverListener(map, marker, infowindow) {
        return function() {
            infowindow.open(map, marker);
        };
      }
    
    }
    else {
      return;
    }
  },[kakaoMap, coords])

  return (

    <div id="myMap" ref={container} style={{
      // width: '500px',
      height: '600px'
    }}>
      {/* {coords.length > 0 && console.log(coords)} */}

    </div>

  );
};

export default MapContainer;