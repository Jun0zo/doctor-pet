import React, { useEffect, useState } from "react";
import { css, keyframes } from "@emotion/react";

// ** MUI Imports
import { Typography, Box } from "@mui/material";
import { useMediaQuery } from "react-responsive";

import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import SickIcon from "@mui/icons-material/Sick";
import VaccinesIcon from "@mui/icons-material/Vaccines";

import DogImage from "src/images/dog_image.png";

const StatusTable = () => {
  const [a, b] = useState([0, 0, 0]);
  return (
    <ul
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "30px",
        marginTop: "3rem",
      }}
    >
      <li>
        <Box>
          <div style={{}}>
            <ContentPasteSearchIcon
              sx={{
                fontSize: "3rem",
                // backgroundColor: "white",
                // borderRadius: "30px",
                // padding: "5px",
              }}
            />
          </div>
          <Typography variant="h6" textAlign={"center"}>
          174
          </Typography>
        </Box>
      </li>
      <li>
        <Box>
          <SickIcon sx={{ fontSize: "3rem" }} />
          <Typography variant="h6" textAlign={"center"}>
            45
          </Typography>
        </Box>
      </li>
      <li>
        <Box>
          <VaccinesIcon sx={{ fontSize: "3rem" }} />
          <Typography variant="h6" textAlign={"center"}>
            4
          </Typography>
        </Box>
      </li>
    </ul>
  );
};

const Intro = () => {
  const [width, setWidth] = useState("80%");
  const isXs = useMediaQuery({ maxWidth: 600 });

  const isDesktop: boolean = useMediaQuery({
    query: "(min-width:1024px)",
  });
  
  const spreadingAnimation = keyframes`
  0% {
    background: radial-gradient(circle at left, #ffa500 5%, transparent 5%);
  }
  5% {
    background: radial-gradient(circle at left, #ffa500 5%, #e69500 20%, transparent 20%);
  }
  10% {
    background: radial-gradient(circle at left, #ffa500 5%, #ffb732 20%, transparent 20%);
  }
  20% {
    background: radial-gradient(circle at left, #ffa500 5%, #ffb732 20%, #ffc95f 20%, transparent 35%);
  }
  30% {
    background: radial-gradient(circle at left, #ffa500 5%, #ffb732 20%, #ffc95f 20%, #ffd98c 35%, transparent 35%);
  }
  40% {
    background: radial-gradient(circle at left, #ffa500 5%, #ffb732 20%, #ffc95f 20%, #ffd98c 35%, #ffebba 50%, transparent 50%);
  }
  50% {
    background: radial-gradient(circle at left, #ffa500 5%, #ffb732 20%, #ffc95f 20%, #ffd98c 35%, #ffebba 50%, #fff9e7 50%, transparent 50%);
  }
  60% {
    background: radial-gradient(circle at left, #ffa500 5%, #ffb732 20%, #ffc95f 20%, #ffd98c 35%, #ffebba 50%, #fff9e7 50%, #ffffff 65%, transparent 65%);
  }
  70% {
    background: radial-gradient(circle at left, #ffa500 5%, #ffb732 20%, #ffc95f 20%, #ffd98c 35%, #ffebba 50%, #fff9e7 50%, #ffffff 65%, #ffffff 80%, transparent 80%);
  }
  80% {
    background: radial-gradient(circle at left, #ffa500 5%, #ffb732 20%, #ffc95f 20%, #ffd98c 35%, #ffebba 50%, #fff9e7 50%, #ffffff 65%, #ffffff 80%, #ffffff 80%, transparent 100%);
  }
  85% {
    background: radial-gradient(circle at left, #ffa500 5%, #ffb732 20%, #ffc95f 20%, #ffd98c 35%, #ffebba 50%, #fff9e7 50%, #ffffff 65%, #ffffff 80%, #ffffff 80%, #ffffff 100%, #ffffff 100%, #ffffff 100%);
  }
  90% {
    background: radial-gradient(circle at left, #ffa500 5%, #ffb732 20%, #ffc95f 20%, #ffd98c 35%, #ffebba 50%, #fff9e7 50%, #ffffff 65%, #ffffff 80%, #ffffff 80%, #ffffff 100%, #ffffff 100%, #ffffff 100%, #ffffff 100%, #ffffff 100%);
  }
  95% {
    background: radial-gradient(circle at left, #ffa500 5%, #ffb732 20%, #ffc95f 20%, #ffd98c 35%, #ffebba 50%, #fff9e7 50%, #ffffff 65%, #ffffff 80%, #ffffff 80%, #ffffff 100%, #ffffff 100%, #ffffff 100%, #ffffff 100%, #ffffff 100%, transparent 100%);
  }
  100% {
    background: radial-gradient(circle at left, #ffa500 5%, #ffb732 20%, #ffc95f 20%, #ffd98c 35%, #ffebba 50%, #fff9e7 50%, #ffffff 65%, #ffffff 80%, #ffffff 80%, #ffffff 100%, #ffffff 100%, #ffffff 100%, #ffffff 100%, #ffffff 100%, #ffffff 100%);
  }
`;


  return (
    <>
      {isXs ? null : (
         <Box
         sx={{
           background:
             "radial-gradient(circle at left, #b2feb2 5%, transparent 5%)",
           backgroundPosition: "left center",
           height: "400px",
           display: "flex",
           flexDirection: "column",
           justifyContent: "space-between",
           alignItems: "center",
           position: "relative",
           animation: `${spreadingAnimation} 3s ease-in-out forwards`, // Adjust the duration (3s) as needed
           backgroundClip: "content-box", // Ensures the background is clipped within the box
         }}
       >
        <Box
          sx={{
            padding: "100px 0px",
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto",
            
          }}
        ><Box>
              <Typography variant="h2">Dr. Pet</Typography>
              <Typography variant="h5" mt={3}>
                사진만으로 반려동물의 건강검진과 병원예약을 한번에!
              </Typography>
              <StatusTable />
            </Box>
          </Box>

          <Box sx={{ position: "absolute", right: "0" }}>
            <img
              src={DogImage.src}
              style={{ transform: "scaleX(-1)", height: "400px", margin: "0" }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Intro;
