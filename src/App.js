import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import newsContext from "./context/newsContext";
import NavBar from './layout/Navbar';
import Footer from "./layout/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from './pages/Logout';
// import News from './pages/News';
import Signup from './pages/Signup';
import Profile from "./pages/Profile";
import PageNotFound from './pages/PageNotFound';

//firebase
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config/appConfig"


// import './App.css';

const App = () => {
  //firebase initialize
  initializeApp(firebaseConfig);

  const [user, setUser] = useState(null);
  return (
    <Router>
      <newsContext.Provider value={{ user, setUser }}>
        <ToastContainer />
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
        <Footer />
      </newsContext.Provider>
    </Router>
  );
}

export default App;
