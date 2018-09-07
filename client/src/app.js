import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import LandingPage from './components/landingPage/landingPage.jsx';
import BoardPage from './components/boardPage/boardPage.jsx';
// import ListPage from './components/listPage/listPage.jsx';

const App = () => (
  <Switch>
    <Route exact path='/' component={LandingPage} />
    <Route exact path='/:groupName/boards' component={BoardPage} />
  </Switch>
);

export default withRouter(App);
