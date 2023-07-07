// ** MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import MenuList from "src/views/pages/home/MenuList";

const Home = () => {
  return (
    <div
      style={{
        backgroundColor: "red",
      }}
    >
      <div style={{ padding: "50px 0px" }}>
        <h1>DOGGY DOGGY</h1>
        <Typography>하지나</Typography>
      </div>
      <MenuList />
    </div>
  );
};

export default Home;
