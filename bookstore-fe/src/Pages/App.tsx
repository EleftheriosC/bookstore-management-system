import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import {Button} from "@mui/material";

function LoginPage() {
  return (
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>


        <Button>Log In</Button>

        <Button>Register</Button>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Helloooo
        </a>
      </header>
    </div>
  );
}

export default LoginPage;
