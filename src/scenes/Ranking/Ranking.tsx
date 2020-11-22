import React from 'react';
import { Helmet } from 'react-helmet';
import { Layout, Error } from '../../components';

import {
  ChampionshipTitle, RacerBoard, Racers, Title,
} from '../components';
import { useRankings } from '../hooks';

const Ranking: React.FC = () => {
  const {
    data: { racers, races },
    error,
    loading,
    handlers,
  } = useRankings();

  return (
    <>
      <Helmet>
        <title>World Kart Championship</title>
      </Helmet>
      <Layout
        title={(
          <Title>
            <h1>DevAway</h1>
          </Title>
      )}
        subTitle={<ChampionshipTitle>World Kart Championship</ChampionshipTitle>}
      >
        {error.racers && (
        <Error
          title="Error loading Rankings"
          message={error.racers}
          onRetry={handlers.racers.getAll}
        />
        )}
        <RacerBoard races={races} />
        <Racers isLoading={loading.racers} racers={racers} />
      </Layout>
    </>
  );
};

export default Ranking;
