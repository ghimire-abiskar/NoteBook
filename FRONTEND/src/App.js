import Navbar from './components/Navbar';
import './App.css';
import About from './components/About'
import Home from './components/Home'
import React from "react";
import Notestate from './context/noteState';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <Notestate>
        <Router>
          <Navbar></Navbar>
          {/* <Alert></Alert> */}
          <Routes>
            <Route path='/' element={<Home></Home>}>
            </Route>
            <Route exact path='/about' element={<About></About>}>
            </Route>
          </Routes>
        </Router>
      </Notestate>
    </>
  );
}

export default App;
