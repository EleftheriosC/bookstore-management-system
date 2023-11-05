import {Grid, TextField, Typography} from "@mui/material";
import {Link, useNavigate} from 'react-router-dom';
import { useState} from "react";
import api from "../api/bookstore";

function UserDetails() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const registerUser = async (username, email, password) => {

        const validUsername = username !== null && username.length >0;
        const validEmail = email !== null && email.length >0;
        const validPassword = password !== null && password.length >0;

        if ((validUsername)
            && (validEmail)
            && (validPassword))
        {
            const newUser = {
                username: username,
                email: email,
                password: password
            };

            try {
                let response = await api.post('/Authentication/register', newUser);
                navigate('/');
                return response;
            } catch (err) {
                console.log(`Error: &{err.message}`);
            }
        }
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

              <Grid item xs={12} mb={2}>
              <TextField
                        required
                        id="username"
                        label="Username"
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                    />
              </Grid>

              <Grid item xs={12} mb={2}>
              <TextField
                        required
                        id="email"
                        label="Email Address"
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
              </Grid>

              <Grid item xs={12} mb={2}>
              <TextField
                        required
                        id="password"
                        label="Password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
              </Grid>

              <Grid item xs={12} >
                  <Typography variant={"subtitle2"} color={'black'} mb={5}>
                      Your password should contain at least 1 symbol, 1 capital letter, a small letter and a numeral
                  </Typography>
              </Grid>

              <Grid item xs={12} mb={5}>
                  <button
                      type="submit"
                      id="registerUserBtn"
                      onClick={() => registerUser(username, email, password)}
                  >
                      Register
                  </button>
              </Grid>

              <Grid item xs={12} mt={5}>
                  <Typography variant={"h6"} color={'black'}>
                  Already Have an Account?
                  </Typography>
              </Grid>

              <Grid item xs={12}>
                  <Link to={"/"}>Sign In</Link>
              </Grid>
          </Grid>
          </header>
      </>
  );
}

export default UserDetails;
