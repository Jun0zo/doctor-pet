import React, { useEffect, useState } from "react";

// ** MUI Imports
import { Typography, Box } from "@mui/material";
import { useMediaQuery } from "react-responsive";

import DogImage from "src/images/dog_image.png";

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
              <h1>OKKY DOGGY</h1>
              <Typography>Hannah</Typography>
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
