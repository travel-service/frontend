import React, { useState, useEffect, useRef } from 'react';
import lodgeMarker from '../../lib/images/marker 아이콘_25x25 숙소마크.png'
import lodgePicker from '../../lib/images/25x25 숙소마크 사본.png'
import attractionMarker from '../../lib/images/marker 아이콘_25x25 관광지마크.png'
import attractionPicker from '../../lib/images/25x25 관광지마크 사본.png'
import test from '../../lib/styles/test.css'


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

    var positions = [],
      selectedMarker = null;

    if(coords.length > 0 ) {
      for (var i = 0; i<coords.length; i++) {
        positions[i] = {
          id: coords[i].id, 
          title: coords[i].name, 
          latlng: new kakao.maps.LatLng(coords[i].coords.latitude, coords[i].coords.longitude),
          type: coords[i].type.type
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
          //image: attMarker
        });
        console.log(positions[i]);

        if (position.type === 0) {
          marker.setImage(attMarker)
        }
        else {
          marker.setImage(logMarker)
        }

        var infocontent = '<div class="wrap">' + 
        '    <div class="info">' + 
        '        <div class="title">' + 
        `            ${positions[i].title}` + 
        `            <div class="close" onclick="closeOverlay()" title="닫기"></div>` + 
        '        </div>' + 
        '    </div>' +    
        '</div>';

        var customOverlay = new kakao.maps.CustomOverlay({
          //content : `<div style="padding:10px; height:60px;">${positions[i].title}</div>`,
          content : infocontent,
          clickable : true,
          position: marker.getPosition()
        });

        marker.normalImage = attMarker;

        kakao.maps.event.addListener(marker, 'click', function() {
          // if (!selectedMarker || selectedMarker !== marker) {
          //   !!selectedMarker && selectedMarker.setImage(selectedMarker.normalImage);
          //   marker.setImage(attPicker);
          // }
          marker.setImage(attPicker);

          customOverlay.setMap(kakaoMap);

          selectedMarker = marker;
        });
        
        function closeOverlay() {
          console.log('test');
          customOverlay.setVisible(false)
        };
      }

      function createMarkerImg(img, size) {
        var markerImg = new kakao.maps.MarkerImage(
          img,
          size
        )

        return markerImg;
      }

      // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 없을 시 마지막 마커만 기능함
      function makeOverListener(map, marker, infowindow) {
        return function() {
          console.log();
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