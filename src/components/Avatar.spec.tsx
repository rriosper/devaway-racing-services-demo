import React from 'react';
import { render } from '@testing-library/react';

import Avatar from './Avatar';

test('Avatar', () => {
  const { asFragment } = render(<Avatar />);
  expect(asFragment).toMatchSnapshot();
});
