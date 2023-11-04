import '../App.css';
import Login from "../components/Login";
import {Box, Grid} from "@mui/material";
import RegisterBanner from "../components/RegisterBanner";
import UserDetails from "../components/UserDetails";

function Register() {
  return (
    <main className={"App"}>
        <Grid container>
            <Grid item xs={6}>
                <RegisterBanner/>
            </Grid>
            <Grid item xs={6}>
                <UserDetails/>
            </Grid>
        </Grid>
    </main>
  );
}

export default Register;
