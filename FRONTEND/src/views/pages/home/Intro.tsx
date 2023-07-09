import React, { useEffect, useState } from "react";

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
            46
          </Typography>
        </Box>
      </li>
      <li>
        <Box>
          <SickIcon sx={{ fontSize: "3rem" }} />
          <Typography variant="h6" textAlign={"center"}>
            46
          </Typography>
        </Box>
      </li>
      <li>
        <Box>
          <VaccinesIcon sx={{ fontSize: "3rem" }} />
          <Typography variant="h6" textAlign={"center"}>
            46
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

  return (
    <>
      {isXs ? null : (
        <Box
          sx={{
            backgroundColor: "#b2feb2",
            height: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Box
            sx={{
              padding: "100px 0px",
              maxWidth: "1200px",
              width: "100%",
              margin: "0 auto",
            }}
          >
            <Box>
              <Typography variant="h2">OKKY DOGGY</Typography>
              <Typography variant="h5" mt={3}>
                사진 한 장으로 강아지를 지켜주세요!
              </Typography>
              <StatusTable />
            </Box>
          </Box>

          <Box sx={{ position: "absolute", bottom: "0", right: "0" }}>
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
