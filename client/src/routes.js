import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
// import PrivateRoute from './components/auth/PrivateRoute.js';

import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import FourOhFour from './components/FourOhFour'

class Routes extends Component {
  render() {
    return (
      <Router>
        <div className="outer-app-wrapper">
          <Route path='/' component={Navbar}/>
          <Route exact path='/index.html' render={() => (
            <Redirect to='/'/>
          )}/>
          <div className="app-wrapper">
            <Switch>
              <Route exact path='/' component={HomePage}/>
              <Route component={FourOhFour}/>
            </Switch>
          </div>
          {/* <Route path='/' component={Footer}/> */}
        </div>
      </Router>
    );
  }
}

export default Routes;
