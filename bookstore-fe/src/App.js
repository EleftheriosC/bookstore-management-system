import './App.css';
import Login from "./components/Login";
import {Box, Grid} from "@mui/material";
import Welcome from "./components/Welcome";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Bookstore from "./pages/Bookstore";

function App() {
  return (
      <div className={"App"}>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/bookstore" element={<Bookstore/>}/>
          </Routes>
      </div>
  );
}

export default App;
