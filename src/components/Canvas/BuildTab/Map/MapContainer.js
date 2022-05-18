/*global kakao*/
import React, { useCallback, useEffect, useState } from 'react';
import SearchPlace from './SearchPlace';
import Map2 from './Map2';

const MapContainer = () => {
  const [inputText, setInputText] = useState('');
  const [place, setPlace] = useState('');
  const [forMarkerPositions, setForMarkerPositions] = useState([]);

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  // 입력된 place로 검색, marker 배열 생성
  const searchCoord = useCallback((place) => {
    let ps = new kakao.maps.services.Places(); // 장소 검색 객체
    const placesSearchCB = (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i++) {
          setForMarkerPositions((forMarkerPositions) => [
            ...forMarkerPositions,
            data[i],
          ]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
      }
    };

    if (!place) return;
    ps.keywordSearch(place, placesSearchCB); // 키워드로 장소 검색
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setForMarkerPositions([]);
    setPlace(inputText);
    setInputText('');
  };

  useEffect(() => {
    searchCoord(place);
  }, [place, searchCoord]);

  return (
    <div>
      <SearchPlace
        inputText={inputText}
        onChange={onChange}
        handleSubmit={handleSubmit}
      />
      {/* 마커 배열 변경될 때마다 넘겨줌 */}
      <Map2 searchPlace={place} forMarkerPositions={forMarkerPositions} />
    </div>
  );
};

export default MapContainer;
