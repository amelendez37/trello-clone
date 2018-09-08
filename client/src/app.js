import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import LandingPage from './components/landingPage/landingPage.jsx';
import HomePage from './components/homePage/homePage.jsx';

const App = () => (
  <Switch>
    <Route exact path='/' component={LandingPage} />
    <Route exact path='/:groupName/home' component={HomePage} />
  </Switch>
);

export default withRouter(App);
