import React, {
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
} from "react";

// ** MUI Imports
import { Box, Typography, Button } from "@mui/material";

// ** Icon Imports
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

// ** Types Imports
import diagnositcResultType from "src/@types/diagnositcResult";
import hospitalSearchResultsType from "src/@types/hospitalSearchResultType";

// ** Image Imports
import DogHospital from "src/images/dog_hospital_build.png";

type Prop = {
  hospitalSearchResult: hospitalSearchResultsType;
  searchHospitals: (
    isRetry: boolean,
    _date: Date,
    fixHospital: boolean,
    fixDate: boolean,
    fixHour: boolean
  ) => void;
};

type PreviewProp = {
  hospitalSearchResult: hospitalSearchResultsType;
};

const Preview = ({ hospitalSearchResult }: PreviewProp) => {
  return (
    <div>
      <p style={{ display: "flex", alignItems: "center" }}>
        <LocalHospitalIcon sx={{ marginRight: "10px" }} />
        {hospitalSearchResult.hospitalName}
      </p>
      <p style={{ display: "flex", alignItems: "center" }}>
        <DirectionsRunIcon sx={{ marginRight: "10px" }} />
        여기서 {hospitalSearchResult.distance} KM
      </p>
      <p style={{ display: "flex", alignItems: "center" }}>
        <CalendarMonthIcon sx={{ marginRight: "10px" }} />
        {hospitalSearchResult.datetime.getFullYear()}년
        {hospitalSearchResult.datetime.getMonth() + 1}월
        {hospitalSearchResult.datetime.getDate()}일
      </p>
      <p style={{ display: "flex", alignItems: "center" }}>
        <AccessTimeIcon sx={{ marginRight: "10px" }} />
        {hospitalSearchResult.datetime.getHours()}시
      </p>
      <Typography sx={{ display: "flex", alignItems: "center" }} variant="h6">
        이 병원으로 예약할까요?
      </Typography>
    </div>
  );
};

const HospitalSearchResult = ({
  hospitalSearchResult,
  searchHospitals,
}: Prop) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        height: "100%",
      }}
    >
      {
        <>
          <img src={DogHospital.src} height="100px" />
          <Preview hospitalSearchResult={hospitalSearchResult} />
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Button
              onClick={() => {
                searchHospitals(
                  true,
                  hospitalSearchResult.datetime,
                  false,
                  true,
                  true
                );
              }}
            >
              병원만 변경
            </Button>
            <Button
              onClick={() => {
                searchHospitals(
                  true,
                  hospitalSearchResult.datetime,
                  true,
                  false,
                  false
                );
              }}
            >
              시간만 변경
            </Button>
          </Box>
        </>
      }
    </Box>
  );
};

export default HospitalSearchResult;
