import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Bookstore from "./pages/Bookstore";
import Register from './pages/Register';

function App() {
  return (
      <div className={"App"}>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/bookstore" element={<Bookstore/>}/>
              <Route path="/register" element={<Register/>}/>
          </Routes>
      </div>
  );
}

export default App;
