import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import Navigation from './Navigation';

function Router(props) {
  return (
    <HashRouter>
      {props.isLoggedIn && <Navigation userObj={props.userObj}/>}

      {props.isLoggedIn ? (
        <div className="routerStyle">
        <Switch>
          <Route exact path="/">
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
          <Route exact path="/">
            <Auth 
              refreshUser={props.refreshUser}
            />
          </Route>
        </Switch>
      )}
    </HashRouter>
  )
}

export default Router;
