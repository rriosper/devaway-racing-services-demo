import { Box } from '@xstyled/styled-components';
import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { KeyboardArrowLeft as KeyboardArrowLeftIcon } from 'styled-icons/material';

import {
  Card, Error, Icon, Layout, Spinner,
} from '../../components';
import {
  ChanpionshipLink, Racer, RacerBoard, Title,
} from '../components';
import { useRankings } from '../hooks';

const RacerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: { racers, races },
    loading,
    error,
    handlers,
  } = useRankings();

  const racer = useMemo(() => racers.find(({ _id }) => id === _id), [
    id,
    racers,
  ]);

  return (
    <>
      <Helmet>
        <title>
          World Kart Championship | Racer
          {' '}
          {racer && racer.name }
        </title>
      </Helmet>
      <Layout
        title={(
          <Title>
            <h1>DevAway</h1>
          </Title>
        )}
        subTitle={(
          <ChanpionshipLink as={Link} to="/">
            <Icon icon={KeyboardArrowLeftIcon} size="sm" />
            World Kart Championship
          </ChanpionshipLink>
        )}
      >
        {error.racers && (
          <Box marginBottom="md">
            <Error
              title="Error loading Rankings"
              message={error.racers}
              onRetry={handlers.racers.getAll}
            />
          </Box>
        )}
        {!racer && loading.racers && (
          <Box display="flex" justifyContent="center">
            <Spinner />
          </Box>
        )}

        {racer && (
          <>
            <Racer {...racer} />
            <RacerBoard races={races} currentRacerId={id} />
          </>
        )}

        {!racer && !loading.racers && <Card>Racer not found</Card>}
      </Layout>
    </>
  );
};
export default RacerDetail;
