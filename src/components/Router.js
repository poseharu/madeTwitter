import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import Navigation from './Navigation';

function Router(props) {
  return (
    <BrowserRouter>
      {props.isLoggedIn && <Navigation userObj={props.userObj}/>}

      {props.isLoggedIn ? (
        <div className="routerStyle">
        <Switch>
          <Route exact path="/home">
            <Home userObj={props.userObj}/>
          </Route>
          <Route exact path="/profile">
            <Profile 
              userObj={props.userObj}
              refreshUser={props.refreshUser}
            />
          </Route>
        </Switch> 
        </div>
      ) : (
        <Switch>
          <Route exact path="/login">
            <Auth 
              refreshUser={props.refreshUser}
            />
          </Route>
        </Switch>
      )}
    </BrowserRouter>
  )
}

export default Router;
