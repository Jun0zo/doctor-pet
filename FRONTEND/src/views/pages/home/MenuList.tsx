import React, { useEffect, useState } from "react";

// ** MUI Imports
import { Card, Grid, CardHeader, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import DogImage from "src/images/dog.png";
import DogCallendar from "src/images/dog_callendar.png";
import DogHospital from "src/images/dog_hospital.png";

const MenuList = () => {
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

  const menuInfos = [
    { title: "애완견 진단", img: DogImage },
    { title: "예약 일정", img: DogCallendar },
    { title: "주변 병원", img: DogHospital },
    { title: "주변 약국", img: DogImage },
  ];

  console.log(menuInfos);

  return (
    <Grid container spacing={6}>
      {menuInfos.map((menuInfo) => (
        <Grid item md={3} sm={6} xs={12}>
          {isXs ? (
            <Card sx={{ textAlign: "center" }}>
              <CardContent sx={{ padding: "1.25rm", display: "flex" }}>
                <img src={menuInfo.img.src} width="100px" />
                <h3>{menuInfo.title}</h3>
              </CardContent>
            </Card>
          ) : (
            <Card sx={{ textAlign: "center" }}>
              <CardContent sx={{ textAlign: "center" }}>
                <h3>{menuInfo.title}</h3>
                <img src={menuInfo.img.src} width="200px" />
              </CardContent>
            </Card>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default MenuList;
