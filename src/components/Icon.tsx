import styled, { css } from '@xstyled/styled-components';
import { variant } from '@xstyled/system';
import React from 'react';

type IconProps = {
  icon: React.FC;
  size?: 'sm' | 'md' | 'lg';
};

const SIconWrapper = styled.svg<Omit<IconProps, 'icon'>>`
  ${variant({
    prop: 'size',
    default: 'md',
    variants: {
      sm: css`
        width: md;
        height: md;
      `,
      md: css`
        width: lg;
        height: lg;
      `,
      lg: css`
        width: xl;
        height: xl;
      `,
    },
  })}
`;

const Icon: React.FC<IconProps> = ({ icon: IconComponent, size = 'md' }) => (
  <SIconWrapper size={size}>
    <IconComponent />
  </SIconWrapper>
);

export default Icon;
