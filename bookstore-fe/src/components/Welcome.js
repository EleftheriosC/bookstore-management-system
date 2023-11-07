import { Grid, Typography} from "@mui/material";
import logo from '../logo.svg';

function Welcome() {
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

export default Welcome;
