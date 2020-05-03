import React, { Component, useState } from 'react';
import './App.css';
import Login from './Login'
import Admin from './Admin'
import HomeUser from './HomeUser'
import AvioPrevoznici from './AvioPrevoznici'
import Rezervacija from './Rezervacija'
import PrivateRoute from './PrivateRoute'
import Register from './Register'
import Home from './Home'
import {Route} from 'react-router';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { AuthContext } from "./context/auth";

function App(props){

  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }


    return(
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
      <Switch>
       <Route path="/login" component={ Login } />
       <PrivateRoute path="/admin" component={Admin} />
       <PrivateRoute path="/user" component={HomeUser}/>
       <PrivateRoute path="/avioprevoznici" component={AvioPrevoznici} />
       <PrivateRoute path="/rezervacija" component={Rezervacija} />
       <Route path="/register" component={Register} />
       <Route exact path="/" component={Home} />
     </Switch>
     </Router>
     </AuthContext.Provider>
   
    )
  
}


export default App;