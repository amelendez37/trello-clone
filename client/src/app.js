import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import LandingPage from './components/landingPage.jsx';
import BoardPage from './components/boardPage.jsx';

const App = () => (
  <Switch>
    <Route exact path='/' component={LandingPage} />
    <Route exact path='/:groupName/boards' component={BoardPage} />
  </Switch>
);

export default withRouter(App);
