import styled, { css } from '@xstyled/styled-components';
import { up } from '@xstyled/system';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

const SSplash = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: splash;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SImage = styled(motion.img)`
  width: 80px;
  height: 80px;

  ${up(
    'sm',
    css`
      width: 150px;
      height: 150px;
    `,
  )}
`;

const Splash: React.FC = () => {
  const [isActive, setIsActive] = useState(true);
  return isActive ? (
    <SSplash
      animate={{
        opacity: [1, 1, 1, 0],
      }}
      transition={{ duration: 1.4, ease: 'easeOut' }}
      onAnimationComplete={() => setIsActive(false)}
    >
      <SImage
        alt="DevAway logo"
        src="/images/devAway.jpeg"
        animate={{
          opacity: [0, 1, 1],
          boxShadow: ['0 0 20px rgba(0,0,0,0.5)', '0 0 20px rgba(0,0,0,0)'],
          transform: ['scale(1.1)', 'scale(1)'],
        }}
        transition={{ duration: 0.4, ease: 'easeIn' }}
      />
    </SSplash>
  ) : null;
};

export default Splash;
