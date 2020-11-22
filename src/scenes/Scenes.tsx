import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from './NotFound';
import RacerDetail from './RacerDetail';
import Ranking from './Ranking';

const Scenes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Ranking} />
    <Route exact path="/racer/:id" component={RacerDetail} />
    <Route path="/" component={NotFound} />
  </Switch>
);

export default Scenes;
