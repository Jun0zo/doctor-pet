// ** MUI Imports
import Typography from "@mui/material/Typography";

// ** Third Party Imports
import { Map } from "react-kakao-maps-sdk";

const HospitalMap = () => {
  return (
    <div style={{}}>
      {
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }} // 지도의 중심 좌표
          style={{ width: "100%", height: "500px" }} // 지도 크기
          level={3}
        />
      }
    </div>
  );
};

export default HospitalMap;
