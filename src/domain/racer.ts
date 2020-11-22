import { JsonDecoder } from 'ts.data.json';

export type Race = {
  name: string;
  time: string;
};

export type Racer = {
  _id: string;
  picture: string;
  age: number;
  name: string;
  team: string;
  races: Array<Race>;
};

export const RaceDecoder = JsonDecoder.object<Race>(
  {
    name: JsonDecoder.string,
    time: JsonDecoder.string,
  },
  'Race',
);

export const RacerDecoder = JsonDecoder.object<Racer>(
  {
    _id: JsonDecoder.string,
    picture: JsonDecoder.string,
    age: JsonDecoder.number,
    name: JsonDecoder.string,
    team: JsonDecoder.string,
    races: JsonDecoder.array(RaceDecoder, 'Races'),
  },
  'Racer',
);

export const RacersDecoder = JsonDecoder.array(RacerDecoder, 'Racer');
