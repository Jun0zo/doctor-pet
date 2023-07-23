import React, { useEffect, useState } from "react";

// ** Next Imports
import { useRouter } from "next/router";

import { Grid, Box, Button } from "@mui/material";

// ** View Pages Imports
import PharmacyMap from "src/views/pages/pharmacys/PharmacyMap";
import PharmacyTable from "src/views/pages/pharmacys/PharmacyTable";

const Pharmacy = () => {
  const router = useRouter();
  return (
    <div style={{ minHeight: "100vh", padding: "100px 0px" }}>

      <Box
        sx={{
          width: "100%",
          height: "500px",
          mingin: "auto",
        }}
      >
        <PharmacyMap />
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

export default Pharmacy;
