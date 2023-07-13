import React, { useEffect, useState } from "react";

// ** Next Imports
import { useRouter } from "next/router";

import { Grid, Box, Button } from "@mui/material";

// ** View Pages Imports
import HospitalMap from "src/views/pages/hospitals/HospitalMap";
import HospitalTable from "src/views/pages/hospitals/HospitalTable";

const Hospitals = () => {
  const router = useRouter();
  //   let kakao = window["kakao"];
  // useEffect(() => {
  //   const { geolocation } = navigator;

  //   if (!geolocation) {
  //     // setError("Geolocation is not supported.");
  //     return;
  //   }

  //   geolocation.getCurrentPosition((a) => {
  //     alert(a);
  //   });
  // }, []);
  return (
    <div style={{ minHeight: "100vh", padding: "100px 0px" }}>
      {/* <Intro /> */}
      {/* <Grid container>
        <Grid item xs={12} lg={6} sx={{ height: "200px" }}>
          <HospitalMap />
        </Grid>
        <Grid item xs={12} lg={6} sx={{ height: "500px" }}>
          <HospitalTable />
        </Grid>
      </Grid> */}

      <Box
        sx={{
          width: "100%",
          height: "500px",
          mingin: "auto",
        }}
      >
        <HospitalMap />
        <Box
          sx={{
            width: "100%",
            mt: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              router.push("/home");
            }}
          >
            홈으로
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Hospitals;
