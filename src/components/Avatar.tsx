import styled, { css } from '@xstyled/styled-components';
import { variant } from '@xstyled/system';

type AvatarProps = {
  size?: 'sm' | 'md' | 'lg';
};

const Avatar = styled.img<AvatarProps>`
  border-radius: 50%;
  background-color: foregroundBorder;
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

export default Avatar;
