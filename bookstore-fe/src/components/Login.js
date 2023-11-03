import {Box, Button, Grid, Input, TextField, Typography} from "@mui/material";
import {red} from "@mui/material/colors";

function Login() {
  return (
      <>
          <Grid container>

              <Grid item xs={12} >
                  <Typography variant={"h5"}>
                      Log In
                  </Typography>
              </Grid>

              <Grid item xs={12}>

                  <TextField placeholder={'Username'} >
                      Input 1
                  </TextField>
              </Grid>

              <Grid item xs={12}>
                  <TextField placeholder={'Password'}>
                      Input 2
                  </TextField>
              </Grid>

              <Grid item xs={12}>
                  <Typography variant={"h6"}>
                  No Account?
                  </Typography>
              </Grid>


              <Grid item xs={12}>
                  <Button>
                      Register
                  </Button>
              </Grid>

          </Grid>
      </>
  );
}

export default Login;
