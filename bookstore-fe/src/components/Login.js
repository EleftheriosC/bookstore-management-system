import {Box, Button, Grid, Input, TextField, Typography} from "@mui/material";
import {red} from "@mui/material/colors";
import {Link, useNavigate} from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
    function handleClick(event){
        navigate('/bookstore');
    }
  return (
      <>
          <header className="Login-header">

          <Grid container>

              <Grid item xs={12} >
                  <Typography variant={"h5"} color={'black'}>
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
                  <Typography variant={"h6"} color={'black'}>
                  No Account?
                  </Typography>
              </Grid>


              <Grid item xs={12}>
                  <Link to={"/register"}>Register</Link>
              </Grid>

              <Grid item xs={12}>
                  {/*<Button type={'button'} onSubmit={handleClick}>*/}
                  {/*    Go to Bookstore*/}
                  {/*</Button>*/}
                  <Link to={"/bookstore"}>Go to Bookstore</Link>
              </Grid>
          </Grid>
          </header>
      </>
  );
}

export default Login;
