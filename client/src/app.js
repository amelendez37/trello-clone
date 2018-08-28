import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Group from './components/group.jsx';

const App = () => (
  <Switch>
    <Route exact path='/' component={Group} />
  </Switch>
);

export default App;
