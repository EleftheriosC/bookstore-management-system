import { Grid, Typography} from "@mui/material";
import logo from '../logo.svg';

function RegisterBanner() {
  return (
      <>
          <header className="App-header">
          <Grid container>
              <Grid item xs={12}>
                  <Typography variant={"h2"}>
                     Register and enjoy amazing books!
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

export default RegisterBanner;
