import '../App.css';
import Login from "../components/Login";
import {Box, Button, Grid} from "@mui/material";
import Welcome from "../components/Welcome";
import {Link} from "react-router-dom";

function Bookstore() {
  return (
    <main className={"App"}>
        <Grid container>
            <Grid item xs={12}>
                Create
            </Grid>
            <Grid item xs={12}>
                Update
            </Grid>
            <Grid item xs={12}>
                Delete
            </Grid>
            <Grid item xs={12}>
                Search
            </Grid>


            <Grid item xs={12}>
                <Link to={"/"}>Go to Homepage</Link>
            </Grid>
        </Grid>
    </main>
  );
}

export default Bookstore;
