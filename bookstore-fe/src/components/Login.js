import {Box, Button, Grid, Input, TextField, Typography} from "@mui/material";
import {red} from "@mui/material/colors";
import {Link, useNavigate} from 'react-router-dom';
import {useState} from "react";

function Login() {

    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    function handleClick(event){
        navigate('/bookstore');
    }
  return (
      <>
          <header className="Login-header">

          <Grid container>

              <Grid item xs={12} mb={2}>
                  <Typography variant={"h5"} color={'black'}>
                      Hello
                  </Typography>
              </Grid>

              <Grid item xs={12} mb={2}>
                  <TextField
                      required
                      id="usernameLogIn"
                      label="Username or Email"
                      onChange={(e) => {
                          setUsernameOrEmail(e.target.value)
                      }}
                  />
              </Grid>


              <Grid item xs={12} mb={2}>
                  <TextField
                      required
                      id="passwordLogIn"
                      label="Password"
                      onChange={(e) => {
                          setPassword(e.target.value)
                      }}
                  />
              </Grid>


              <Grid item xs={12} mb={5}>
                  <Link to={"/bookstore"}>Sign In</Link>
              </Grid>

              <Grid item xs={12}>
                  <Typography variant={"h6"} color={'black'}>
                  No Account?
                  </Typography>
              </Grid>


              <Grid item xs={12} mb={5}>
                  <Link to={"/register"}>Register</Link>
              </Grid>


          </Grid>
          </header>
      </>
  );
}

export default Login;
