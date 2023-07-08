import React, { useEffect, useState } from "react";

// ** MUI Imports
import { Typography } from "@mui/material";

const Intro = () => {
  const [isXs, setIsXs] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsXs(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      {isXs ? null : (
        <div style={{ padding: "50px 0px" }}>
          <h1>DOGGY DOGGY</h1>
          <Typography>하지나</Typography>
        </div>
      )}
    </>
  );
};

export default Intro;
