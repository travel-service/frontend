import React, { useEffect } from 'react';

const { kakao } = window;

const MapContainer = () => {

    useEffect(() => {
        const container = document.getElementById('myMap');
            const options = {
                center : new kakao.maps.LatLng(33.380701, 126.570667),
                level: 9
            }
        const map = new kakao.maps.Map(container, options);

        const markerPosition = new kakao.maps.LatLng(33.3085, 126.634);

        const marker = new kakao.maps.Marker({
            position: markerPosition,
            title: '휴에리'
        })
    
        marker.setMap(map) ;
    }, []);

    return (
        <div id="myMap" style={{
            // width: '500px',
            height: '500px'
        }}>

        </div>

    );
};

export default MapContainer;