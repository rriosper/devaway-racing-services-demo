import PropTypes, { InferProps } from 'prop-types';
import React, { useMemo } from 'react';

import { Box } from '@xstyled/styled-components';
import { useHistory } from 'react-router-dom';
import {
  Avatar, Card, CardFields, Spinner,
} from '../../components';
import { Racer as RacerDomain } from '../../domain';

import { RacersLayout, ViewRacerButton } from './styles';

const racerPropTypes = {
  picture: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
  races: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

type RacerProps = InferProps<typeof racerPropTypes> & {
  content?: React.ReactElement;
};

const getBestTimeRace = (races: RacerProps['races']): string => races.reduce(
  (acc, race) => (acc.length > 0 && acc <= race.time ? acc : race.time),
  '',
);

export const Racer: React.FC<RacerProps> = ({
  picture,
  age,
  name,
  team,
  races,
  content,
}) => {
  const bestTimeRace = useMemo(() => getBestTimeRace(races), [races]);
  return (
    <Card gridTemplateRows="1fr auto" padding="none">
      <Box
        display="grid"
        gridTemplateColumns="auto 1fr"
        gridGap="md"
        padding="md"
        alignItems="center"
      >
        <Avatar alt={`Profile picture ${name}`} src={picture} />
        <CardFields
          fields={[
            {
              label: 'name',
              value: name,
            },
            {
              label: 'age',
              value: age,
            },
            {
              label: 'team',
              value: team,
            },
            {
              label: 'Best time',
              value: bestTimeRace,
            },
          ]}
        />
      </Box>
      {content}
    </Card>
  );
};

Racer.propTypes = racerPropTypes;

type RacersProps = {
  racers: Array<RacerDomain>;
  isLoading: boolean;
};

const Racers: React.FC<RacersProps> = ({ racers, isLoading }) => {
  const history = useHistory();
  const racersComponent = useMemo(
    () => racers.map(({ _id, ...racer }) => (
      <Racer
        key={_id}
        content={(
          <ViewRacerButton onClick={() => history.push(`/racer/${_id}`)}>
            View Racer
          </ViewRacerButton>
          )}
        {...racer}
      />
    )),
    [racers, history],
  );

  return (
    <Box display="grid" gridGap="md">
      <h3>Racers</h3>
      {isLoading && <Spinner margin="md" justifySelf="center" />}
      <RacersLayout>{racersComponent}</RacersLayout>
    </Box>
  );
};

export default Racers;
