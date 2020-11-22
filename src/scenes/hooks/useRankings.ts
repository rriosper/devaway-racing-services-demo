import {
  mergeDeepLeft, pipe, prop, sortBy, values,
} from 'ramda';
import { useCallback, useEffect } from 'react';
import { useLocalStorage } from 'react-use';

import { Racer } from '../../domain';
import services from '../../services';

type Races = Array<{
  name: string;
  times: Array<{ racerId: string; racerName: string; time: string }>;
}>;

type UseRankingsState = {
  data: {
    racers: Array<Racer>;
    races: Races;
  };
  loading: {
    racers: boolean;
  };
  error: {
    racers: Nullable<string>;
  };
};

type UseRankingHandlers = {
  handlers: {
    racers: {
      getAll: () => void;
    };
  };
};

type UseRankingsOutput = UseRankingsState & UseRankingHandlers;

const INITIA_STATE: UseRankingsState = {
  data: {
    racers: [],
    races: [],
  },
  loading: {
    racers: true,
  },
  error: {
    racers: null,
  },
};

const getRaces = (racers: Array<Racer>): Races => {
  const racesWithTimes = (racers[0].races || []).map((race, idx) => ({
    name: race.name,
    times: racers.map((timeRacer) => ({
      racerId: timeRacer._id,
      racerName: timeRacer.name,
      time: timeRacer.races[idx].time,
    })),
  }));

  return racesWithTimes.map(({ name, times }) => ({
    name,
    times: sortBy(prop('time'), times),
  }));
};

const sortRacers = (racers: Array<Racer>, races: Races): Array<Racer> => {
  const racerWinCount = races.reduce(
    (acc: Record<string, { id: string; count: number }>, { times }) => {
      times.forEach(({ racerId }, idx) => {
        const element = acc[racerId];

        if (element) {
          element.count += idx;
        } else {
          acc[racerId] = {
            count: idx,
            id: racerId,
          };
        }
      });
      return acc;
    },
    {},
  );

  return pipe(
    values,
    sortBy(prop('count')),
  )(racerWinCount).reduce((acc: Array<Racer>, { id }) => {
    const racer = racers.find((currRacer) => currRacer._id === id);
    if (racer) {
      acc.push(racer);
    }
    return acc;
  }, []);
};

const useRankings = (): UseRankingsOutput => {
  const [state, setState] = useLocalStorage('rankings', INITIA_STATE);

  const mergeState = useCallback(
    (newPartialState: Partial<UseRankingsState>) => setState(
      (currState) => mergeDeepLeft(newPartialState, currState) as UseRankingsState,
    ),
    [setState],
  );

  const properLoadRacers = useCallback(() => {
    mergeState({
      loading: { racers: true },
    });

    services.local.racer
      .getAll()
      .then((racers): void => {
        const races = getRaces(racers);
        mergeState({
          data: {
            racers: sortRacers(racers, races),
            races,
          },
          loading: { racers: false },
          error: { racers: null },
        });
      })
      .catch((err: AnyError): void => {
        mergeState({
          error: { racers: err.reason },
          loading: { racers: false },
        });
      });
  }, [mergeState]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    let isSubscribed = true;
    services.local.racer
      .getAll()
      .then((racers): void => {
        if (isSubscribed) {
          const races = getRaces(racers);
          mergeState({
            data: {
              racers: sortRacers(racers, races),
              races,
            },
            loading: { racers: false },
            error: { racers: null },
          });
        }
      })
      .catch((err: AnyError): void => {
        if (isSubscribed) {
          mergeState({
            error: { racers: err.reason },
            loading: { racers: false },
          });
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [mergeState]);

  const handlers: UseRankingHandlers['handlers'] = {
    racers: {
      getAll: properLoadRacers,
    },
  };

  return { ...state, handlers };
};

export default useRankings;
