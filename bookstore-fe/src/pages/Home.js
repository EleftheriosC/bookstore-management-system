import '../App.css';
import Login from "../components/Login";
import {Grid} from "@mui/material";
import Welcome from "../components/Welcome";

function Home() {
  return (
    <main className={"App"}>
        <Grid container>
            <Grid item xs={6}>
                <Welcome/>
            </Grid>
            <Grid item xs={6}>
                <Login/>
            </Grid>
        </Grid>
    </main>
  );
}

export default Home;
