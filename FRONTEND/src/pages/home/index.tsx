// ** MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import DogImage from "src/images/dog.png";

const Home = () => {
  console.log(DogImage);
  return (
    <Grid container spacing={6}>
      <Grid item xs={3}>
        <Card sx={{}}>
          <CardHeader title="프로젝트를 시작해볼까? 🚀"></CardHeader>
          <img src={DogImage.src} width="200px" />
          <CardContent>
            <Typography sx={{ mb: 2 }}>
              All the best for your new project.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Home;
