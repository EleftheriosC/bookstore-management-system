import {Box, Button, Grid, Input, TextField, Typography} from "@mui/material";
import {red} from "@mui/material/colors";
import logo from '../logo.svg';

function WelcomePage() {
  return (
      <>
          <header className="App-header">
          <Grid container>
              <Grid item xs={12}>
                  <Typography variant={"h2"}>
                      Welcome to the Reactive BookStore!
                  </Typography>
                  <div>
                      <img src={logo} className="App-logo" alt="logo" />
                  </div>
              </Grid>
          </Grid>
      </header>
</>
  );
}

export default WelcomePage;
