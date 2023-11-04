import {Box, Button, Grid, Input, TextField, Typography} from "@mui/material";
import {red} from "@mui/material/colors";
import {Link, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";

function UserDetails() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    function handleClick(event){
        navigate('/bookstore');
    }
  return (
      <>
          <header className="Login-header">

          <Grid container>

              <Grid item xs={12} >
                  <Typography variant={"h5"} color={'black'} mb={5}>
                      Please enter your details
                  </Typography>
              </Grid>

              <Grid item xs={12}>
              <TextField
                        required
                        id="username"
                        label="Username"
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                    />
              </Grid>

              <Grid item xs={12}>
              <TextField
                        required
                        id="email"
                        label="Email Address"
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
              </Grid>

              <Grid item xs={12}>
              <TextField
                        required
                        id="password"
                        label="Password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
              </Grid>

              <Grid item xs={12} mt={5}>
                  <Typography variant={"h6"} color={'black'}>
                  Already Have an Account?
                  </Typography>
              </Grid>

              <Grid item xs={12}>
                  <Link to={"/"}>Go Back</Link>
              </Grid>
          </Grid>
          </header>
      </>
  );
}

export default UserDetails;
