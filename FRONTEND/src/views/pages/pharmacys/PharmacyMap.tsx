import { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import server from "src/context/server";

type MarkerType = {
  name: string;
  position: {
    lat: number;
    lng: number;
  };
}

const PharmacyMap = () => {
  const [markerIndex, setMarkerIndex] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [markers, setMarkers] = useState<MarkerType[]>([]);

  useEffect(() => {
    let _markers : any = [];
    const getGeolocation = () => {
      if (!navigator.geolocation) {
        return;
      }

      

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          server.get("/pharmacys/nearby", { params : {latitude: position.coords.latitude, longitude: position.coords.longitude}}).then((res) => {
            let data = res.data;
            console.log(data);
            data.forEach((element: any) => {
              _markers.push({name: element.name, position: {lat: element.latitude, lng: element.longitude}})
            });
            _markers.push({name: "현재위치", position: { 
              lat: position.coords.latitude, 
              lng: position.coords.longitude
            }})
            setMarkers(_markers);
          });
          // { lat: 35.96904122789886, lng: 126.71904353641412 }
          console.log(markers)
        },
      );
    };

    getGeolocation();
  }, []);

  const handleMarkerHover = (index: any) => {
    setMarkerIndex(index);
  };

  const handleMarkerLeave = () => {
    setMarkerIndex(null);
  };

  return (
    <Map
      // center={{ lat: 35.96904122789886, lng: 126.71904353641412 }}
      center={{ lat: latitude, lng: longitude }}
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

export default PharmacyMap;
