// ** MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import DogImage from "src/images/dog.png";
import DogCallendar from "src/images/dog_callendar.png";
import DogHospital from "src/images/dog_hospital.png";

const Home = () => {
  console.log(DogImage);
  return (
    <Grid container spacing={6}>
      <Grid item xs={3}>
        <Card sx={{ textAlign: "center" }}>
          <CardHeader title="애완견 진단"></CardHeader>
          <img src={DogImage.src} width="200px" />
          <CardContent>
            {/* <Typography sx={{ mb: 2 }}>
              All the best for your new project.
            </Typography> */}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card sx={{ textAlign: "center" }}>
          <CardHeader title="애완견 예약"></CardHeader>
          <img src={DogCallendar.src} width="200px" />
          <CardContent>
            {/* <Typography sx={{ mb: 2 }}>
              All the best for your new project.
            </Typography> */}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card sx={{ textAlign: "center" }}>
          <CardHeader title="주변 병원"></CardHeader>
          <img src={DogHospital.src} width="200px" />
          <CardContent>
            {/* <Typography sx={{ mb: 2 }}>
              All the best for your new project.
            </Typography> */}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card sx={{ textAlign: "center" }}>
          <CardHeader title="애완견 진단"></CardHeader>
          <img src={DogImage.src} width="200px" />
          <CardContent>
            {/* <Typography sx={{ mb: 2 }}>
              All the best for your new project.
            </Typography> */}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Home;
