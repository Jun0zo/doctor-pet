import React, { useEffect, useState } from "react";
import { css, keyframes } from "@emotion/react";

// ** MUI Imports
import { Typography, Box, Grow } from "@mui/material";
import { useMediaQuery } from "react-responsive";

import ListIcon1 from "src/images/list1-1.png";
import ListIcon2 from "src/images/list2.png";
import ListIcon3 from "src/images/list3.png";

import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import SickIcon from "@mui/icons-material/Sick";
import VaccinesIcon from "@mui/icons-material/Vaccines";

import DogImage from "src/images/dog_image.png";

import CountUp from 'react-countup';

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
          <img src={ListIcon1.src} height={60}/>
          <Typography variant="h6" textAlign={"center"}>
          <CountUp start={0} end={175} duration={3} delay={1}/>
          </Typography>
        </Box>
      </li>
      <li>
        <Box>
        <img src={ListIcon2.src} height={60}/>
          <Typography variant="h6" textAlign={"center"}>
          <CountUp start={0} end={45} duration={3} delay={1}/>
          </Typography>
        </Box>
      </li>
      <li>
        <Box>
        <img src={ListIcon3.src} height={60}/>
          <Typography variant="h6" textAlign={"center"}>
          <CountUp start={0} end={9} duration={3} delay={1}/>
          </Typography>
        </Box>
      </li>
    </ul>
  );
};

const Intro = () => {
  const [width, setWidth] = useState("80%");
  const isXs = useMediaQuery({ maxWidth: 600 });
  const [showFirst, setShowFirst] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const toggleTypography = () => {
    setShowFirst((prevShowFirst) => !prevShowFirst);
  };
  

  // You can adjust the timeout duration for the animation as per your preference
  const animationTimeout = 1000; // 1 second

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

const messages = [
  '사진만으로 반려동물의 건강검진과 병원예약을 한번에!',
  '바쁜 현대인들을 위한 원클릭 반려동물 검진 서비스'
];

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
  }, 5000); // Change the interval duration (in milliseconds) to control the alternation speed

  return () => {
    clearInterval(interval);
  };
}, [messages.length]);


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
              <Typography variant="h2" sx={{fontWeight:"900", color:"#2a1f01f0"}}>Dr. Pet</Typography>
              <Grow in={showFirst}>
                <Typography variant="h5" mt={3} >
                {messages[currentMessageIndex]}
                </Typography>
              </Grow>
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
