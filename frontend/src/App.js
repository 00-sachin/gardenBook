
import React, { useState, useContext } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import { Icon, Navbar } from 'react-materialize';

import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

import './App.css';

import Login from './pages/Login';
import { Posts } from './pages/Home';
import Contact from './pages/Contact'; 
import About from './pages/About';
import {Profile} from './pages/Profile';
import { UserContext, userDataContext } from './contexts/UserContext';

function App() {
  let [username, setUsername] = useState(undefined);
  let [ postData, setPostData ] = useState(undefined);
  return (
    <BrowserRouter>
      <UserContext.Provider value={username}>
        <userDataContext.Provider value={postData}>
        <div className = "mainContainer">
            <Navbar
                className="navbar"
                alignLinks="right"
                brand={<a className="brand-logo" >TYP</a>}
                id="mobile-nav"
                menuIcon={<Icon>menu</Icon>}
                options={{
                    draggable: true,
                    edge: 'left',
                    inDuration: 250,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    outDuration: 200,
                    preventScrolling: true
                }}>
                <NavLink className="navLink" to="/" exact> Home </NavLink>
                <NavLink className="navLink" to="/profile"> Profile </NavLink>
                <NavLink className="navLink" to="/about"> About </NavLink>
                <NavLink className="navLink" to="/login"> Login </NavLink>
            </Navbar>

            <div className = "app-container">
              <Switch>
                <Route path = "/" exact>
                    <Posts setUsername={setUsername} setPostData={setPostData} />
                </Route>
                <Route path = "/contact" exact>
                    <Contact />
                </Route>
                <Route path = "/profile" exact>
                    <Profile />
                </Route>
                <Route path = "/about" exact>
                    <About />
                </Route>
                <Route path = "/login" exact>
                    <Login setUsername={setUsername} />
                </Route>
              </Switch>
            </div>
        </div>
        </userDataContext.Provider> 
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
