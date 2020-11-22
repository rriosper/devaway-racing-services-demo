import React from 'react';
import { render } from '@testing-library/react';

import Splash from './Splash';

test('Splash', () => {
  const { asFragment } = render(<Splash />);
  expect(asFragment).toMatchSnapshot();
});
