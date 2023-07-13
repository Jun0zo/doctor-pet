import { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const HospitalMap = () => {
  const [isOpen, setIsOpen] = useState(false);

  const markers = [
    {
      id: 1,
      position: { lat: 33.450701, lng: 126.570667 },
      content: "Marker 1",
    },
    {
      id: 2,
      position: { lat: 33.455701, lng: 126.575667 },
      content: "Marker 2",
    },
    {
      id: 3,
      position: { lat: 33.460701, lng: 126.580667 },
      content: "Marker 3",
    },
  ];

  const handleMarkerClick = () => {
    setIsOpen(true);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  return (
    <Map
      center={{ lat: 33.450701, lng: 126.570667 }} // coordinates of the center of the map
      style={{ width: "100%", height: "450px" }} // map size
      level={3} // map zoom level
    >
      {markers.map((marker) => (
        <MapMarker
          key={marker.id}
          position={marker.position} // coordinates of the marker
          clickable // Enable click event on the marker
          onClick={handleMarkerClick}
        >
          {/* Info Window */}
          {isOpen && (
            <div style={{ minWidth: "150px" }}>
              <img
                alt="close"
                width="14"
                height="13"
                src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                style={{
                  position: "absolute",
                  right: "5px",
                  top: "5px",
                  cursor: "pointer",
                }}
                onClick={handleCloseClick}
              />
              <div style={{ padding: "5px", color: "#000" }}>
                {marker.content}
              </div>
            </div>
          )}
        </MapMarker>
      ))}
    </Map>
  );
};

export default HospitalMap;
