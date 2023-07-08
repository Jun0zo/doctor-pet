import React, { useEffect, useState } from "react";

// ** MUI Imports
import { Card, Grid, CardHeader, CardContent, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import DogImage from "src/images/dog.png";
import DogCallendar from "src/images/dog_callendar.png";
import DogHospital from "src/images/dog_hospital.png";
import Pharmacy from "src/images/pharmacy.png";

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
    {
      title: "애완견 진단",
      img: DogImage,
      describe: "자신의 애완견을 AI를 통해 진단해보세요",
    },
    {
      title: "예약 일정",
      img: DogCallendar,
      describe: "애완견의 예약 일정을 확인해보세요",
    },
    {
      title: "주변 병원",
      img: DogHospital,
      describe: "주변에 어떤 병원이 있는지 알아볼까요?",
    },
    {
      title: "주변 약국",
      img: Pharmacy,
      describe: "주변에 어떤 약국이 있는지 알아볼까요?",
    },
  ];

  console.log(menuInfos);

  return (
    <Grid container spacing={10}>
      {menuInfos.map((menuInfo) => (
        <Grid item md={3} sm={6} xs={12}>
          {isXs ? (
            <Card
              sx={{
                textAlign: "center",
                borderRadius: "30px",
                transition: "transform 0.3s",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <CardContent sx={{ padding: "1.25rm", display: "flex" }}>
                <Box>
                  <img src={menuInfo.img.src} width="100px" />
                </Box>
                <Box
                  sx={{
                    textAlign: "center",
                    padding: "0px 2rem",
                  }}
                >
                  <h3>{menuInfo.title}</h3>
                  <Typography sx={{ textAlign: "left" }}>
                    {menuInfo.describe}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Card
              sx={{
                textAlign: "center",
                borderRadius: "2rem",
                transition: "transform 0.3s",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <CardContent>
                <Box>
                  <img src={menuInfo.img.src} width="150px" />
                </Box>
                <Box
                  sx={{
                    textAlign: "center",
                    padding: "0px 1rem",
                  }}
                >
                  <h3>{menuInfo.title}</h3>
                  <Typography sx={{ textAlign: "left" }}>
                    {menuInfo.describe}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default MenuList;
