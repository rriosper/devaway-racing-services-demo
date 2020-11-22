import { JsonDecoder } from 'ts.data.json';
import { Racer, RacersDecoder } from '../../domain';
import { normalizeErrorResponse } from '../utils';

const delay = (seconds: number) => new Promise<void>((res) => {
  setTimeout(() => res(), seconds * 1000);
});

const makeFetch = async <Data>(
  origin: string,
  resource: string,
  decoder: JsonDecoder.Decoder<Data>,
): Promise<Data> => {
  try {
    // TODO: Simulate delay to fetching
    await delay(3);

    const response = await fetch(`${origin}/${resource}`);
    const json = (await response.json()) as unknown;
    const data = decoder.decode(json);

    if (data.isOk()) {
      return data.value;
    }

    throw {
      type: 'decode',
      reason: data.error,
    };
  } catch (err) {
    throw normalizeErrorResponse(err);
  }
};

const makeRacerFetch = async <Data>(decoder: JsonDecoder.Decoder<Data>) => makeFetch<Data>('/sources', 'racer.json', decoder);

const getAll = async (): Promise<Array<Racer>> => makeRacerFetch<Array<Racer>>(RacersDecoder);

const racer = {
  getAll,
};

export default racer;
