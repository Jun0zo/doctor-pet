import { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const HospitalMap = () => {
  const [markerIndex, setMarkerIndex] = useState(null);

  const markers = [
    {
      name: "현재위치",
      position: { lat: 35.946968476155504, lng: 126.6814655885179 },
    },
    {
      name: "스마일 동물병원",
      position: { lat: 35.962301291766344, lng: 126.69467350485549 },
    }, //
    {
      name: "해맑은 동물병원",
      position: { lat: 35.965150464556594, lng: 126.70235346000632 },
    }, //
  ];

  const handleMarkerHover = (index: any) => {
    setMarkerIndex(index);
  };

  const handleMarkerLeave = () => {
    setMarkerIndex(null);
  };

  return (
    <Map
      center={{ lat: 35.946968476155504, lng: 126.6814655885179 }}
      style={{ width: "100%", height: "450px" }}
      level={3}
    >
      {markers.map((marker, index) => (
        <MapMarker
          key={index}
          position={marker.position}
          clickable
          onMouseOver={() => handleMarkerHover(index)}
          onMouseOut={handleMarkerLeave}
        >
          {markerIndex === index && (
            <div style={{ padding: "5px", color: "#000" }}>{marker.name}</div>
          )}
        </MapMarker>
      ))}
    </Map>
  );
};

export default HospitalMap;
