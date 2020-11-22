import styled, { Box, css } from '@xstyled/styled-components';
import { th, up } from '@xstyled/system';
import PropTypes, { InferProps } from 'prop-types';
import {
  always, cond, equals, T,
} from 'ramda';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const propTypes = {
  currentRacerId: PropTypes.string,
  races: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      times: PropTypes.arrayOf(
        PropTypes.shape({
          racerId: PropTypes.string.isRequired,
          racerName: PropTypes.string.isRequired,
          time: PropTypes.string.isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  ).isRequired,
};

const defaultProps = {
  currentRacerId: null,
};

const SSlider = styled(Slider)`
  div {
    outline: none;
  }
`;

const SItem = styled.div`
  min-height: 400px;
  display: grid;
  grid-template-columns: auto 1fr;
  background-color: card;
  border-radius card;
  padding: md;
  padding-bottom: lg;
  margin-top: md;
  margin-bottom: md;
  box-shadow: card;
`;

const STimes = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  justify-content: center;

  ${up(
    'md',
    css`
      grid-template-columns: repeat(2, 1fr);
    `,
  )}

  ${up(
    'xl',
    css`
      grid-template-columns: repeat(3, 1fr);
    `,
  )}
`;

const STime = styled.div<{ isRacerActive: boolean }>`
  padding-top: lg;
  padding-left: lg;
  color: ${({ isRacerActive }) => (isRacerActive ? th('colors.text') : th('colors.foreground'))};

  > span:first-child {
    font-weight: bold;
    display: inline-block;
    min-width: 180px;
    padding-bottom: md;

    > span.gold {
      text-shadow: 0px 1px 2px #333;
      color: gold;
    }

    > span.silver {
      text-shadow: 0px 1px 2px #333;
      color: silver;
    }

    > span.bronze {
      text-shadow: 0px 1px 2px #333;
      color: bronze;
    }
  }

  > span:last-child {
    min-width: 100px;
    display: inline-block;
  }
`;

const getRacerColor = cond<number, string>([
  [equals(0), always('gold')],
  [equals(1), always('silver')],
  [equals(2), always('bronze')],
  [T, always('text')],
]);

const RacerBoard: React.FC<InferProps<typeof propTypes>> = ({
  races,
  currentRacerId,
}) => (
  <SSlider infinite autoplay autoplaySpeed={6000} speed={1000}>
    {races.map(({ name, times }) => (
      <SItem key={name}>
        <Box as="p" fontSize="3" textTransform="uppercase">
          {name}
        </Box>
        <STimes>
          {times.map(({ racerId, racerName, time }, timeIdx) => (
            <STime
              key={`${name}-${racerId}`}
              isRacerActive={racerId === currentRacerId}
            >
              <span>
                <span className={getRacerColor(timeIdx)}>
                  #
                  {timeIdx + 1}
                </span>
                {'  '}
                {racerName}
              </span>
              <span>{time}</span>
            </STime>
          ))}
        </STimes>
      </SItem>
    ))}
  </SSlider>
);

RacerBoard.propTypes = propTypes;
RacerBoard.defaultProps = defaultProps;

export default RacerBoard;
