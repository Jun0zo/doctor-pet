import { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const HospitalMap = () => {
  const [markerIndex, setMarkerIndex] = useState(null);

  const markers = [
    {
      name: "현재위치",
      position: { lat: 35.96904122789886, lng: 126.71904353641412 },
    },
    {
      name: "스마일 동물병원",
      position: { lat: 35.962301291766344, lng: 126.69467350485549 },
    }, //
    {
      name: "해맑은 동물병원",
      position: { lat: 35.965150464556594, lng: 126.70235346000632 },
    }, //
    {
      name: "가족동물병원",
      position: { lat: 35.96310205450654, lng: 126.71520674008266 },
    }, //
    {
      name: "수송반려동물병원",
      position: { lat: 35.96384791915608, lng: 126.71810855184232 },
    }, //
    {
      name: "더사랑동물병원",
      position: { lat: 35.96731128584994, lng: 126.71922704657139 },
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
      center={{ lat: 35.96904122789886, lng: 126.71904353641412 }}
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
