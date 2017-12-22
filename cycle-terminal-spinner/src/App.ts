import xs, { Stream } from 'xstream';
import { dots } from 'cli-spinners';

export type Sources = {};

export type Sinks = {
  log: Stream<string>;
};

// type Actions = {};

// function intent(): Actions {
//   return {};
// }

function model(): Stream<number> {
  const count = dots.frames.length;
  return xs.periodic(dots.interval).map(i => i % count);
}

function view(state$: Stream<number>): Stream<string> {
  return state$.map(i => dots.frames[i]);
}

export function App(sources: Sources): Sinks {
  // const actions = intent();
  const state$ = model();
  const msg$ = view(state$);

  return { log: msg$ };
}
