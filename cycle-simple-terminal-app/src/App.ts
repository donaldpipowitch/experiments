import xs, { Stream } from 'xstream';

export type Sources = {};

export type Sinks = {
  log: Stream<string>;
};

// type Actions = {};

// function intent(): Actions {
//   return {};
// }

function model(): Stream<number> {
  return xs.periodic(1000);
}

function view(state$: Stream<number>): Stream<string> {
  return state$.map(count => `Counting: ${count}`);
}

export function App(sources: Sources): Sinks {
  // const actions = intent();
  const state$ = model();
  const msg$ = view(state$);

  return { log: msg$ };
}
