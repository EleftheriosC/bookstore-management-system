import './App.css';
import Login from "./components/Login";
import {Box, Grid} from "@mui/material";
import WelcomePage from "./components/WelcomePage";

function App() {
  return (
    <main className={"App"}>
        <Grid container>
            <Grid item xs={6}>
                <WelcomePage/>
            </Grid>
            <Grid item xs={6}>
                <Login/>
            </Grid>

        </Grid>
    </main>
  );
}

export default App;
