import Navbar from './components/Navbar';
import './App.css';
import About from './components/About'
import Home from './components/Home'
import React, { useState } from "react";
import Notestate from './context/noteState';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message,type) => {
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null)
    },1500);
  }
  return (
    <>
      <Notestate>
        <Router>
          <Navbar></Navbar>
          <Alert alert={alert}></Alert>
          <Routes>
            <Route path='/'  element={<Home showAlert={showAlert}></Home>}>
            </Route>
            <Route exact path='/about' element={<About></About>}>
            </Route>
            <Route exact path='/login'  element={<Login showAlert={showAlert}></Login>}>
            </Route>
            <Route exact path='/signup'  element={<Signup showAlert={showAlert}></Signup>}>
            </Route>
          </Routes>
        </Router>
      </Notestate>
    </>
  );
}

export default App;
