import {Grid, TextField, Typography} from "@mui/material";
import {Link, useNavigate} from 'react-router-dom';
import {useState} from "react";
import api from "../api/bookstore";

function Login() {

    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(null);

    const navigate = useNavigate();
    const handleLogin = async (username, password) => {

        const validUsername = username !== null && username.length >0;
        const validPassword = password !== null && password.length >0;

        if (validUsername && validPassword) {

            const existingUser = {
                username: username,
                password: password
            };

            try {
                let response = await api.post('/Authentication/login', existingUser);
                setToken(response.data);
                const tokenData= response.data;
                navigate('/bookstore', {state: {tokenData} });
            } catch (err) {
                console.log(`Error: &{err.message}`);
            }
        }
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
                  <button
                      type="submit"
                      id="loginBtn"
                      onClick={() => handleLogin(usernameOrEmail, password)}
                  >
                      Login
                  </button>
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
