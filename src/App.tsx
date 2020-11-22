import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Splash } from './components';
import Scenes from './scenes';
import Theme from './theme';

const App: React.FC = () => (
  <Theme>
    <Splash />
    <BrowserRouter>
      <Scenes />
    </BrowserRouter>
  </Theme>
);

export default App;
