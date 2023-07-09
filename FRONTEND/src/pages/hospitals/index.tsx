import React, { useEffect, useState } from "react";

import { Grid } from "@mui/material";

// ** View Pages Imports
import HospitalMap from "src/views/pages/hospitals/HospitalMap";
import HospitalTable from "src/views/pages/hospitals/HospitalTable";

const Hospitals = () => {
  //   let kakao = window["kakao"];

  return (
    <div style={{}}>
      {/* <Intro /> */}
      <Grid container>
        <Grid item xs={12} lg={6} sx={{ height: "200px" }}>
          <HospitalMap />
        </Grid>
        <Grid item xs={12} lg={6} sx={{ height: "500px" }}>
          <HospitalTable />
        </Grid>
      </Grid>
    </div>
  );
};

export default Hospitals;
