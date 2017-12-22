import xs, { Stream } from 'xstream';
import { div, label, input, hr, h1, DOMSource, VNode } from '@cycle/dom';
import { Canvas } from './Canvas';

export type Sources = {
  DOM: DOMSource;
};

export type Sinks = {
  DOM: Stream<VNode>;
};

type Actions = {
  input$: Stream<Event>;
};

function intent(domSource: DOMSource): Actions {
  return { input$: domSource.select('.field').events('input') };
}

function model({ input$ }: Actions) {
  return input$.map(ev => (ev.target as HTMLInputElement).value).startWith('');
}

function view(stateWithComps$: Stream<{ state: string; canvas: VNode }>) {
  return stateWithComps$.map(({ state, canvas }) =>
    div([
      label('Name:'),
      input('.field', { attrs: { type: 'text' } }),
      hr(),
      h1('Hello ' + state),
      hr(),
      canvas
    ])
  );
}

export function App(sources: Sources): Sinks {
  const canvas = Canvas(sources);

  const actions = intent(sources.DOM);
  const state$ = model(actions);
  const stateWithComps$ = xs
    .combine(state$, canvas.DOM)
    .map(([state, canvas]) => ({ state, canvas }));
  const vdom$ = view(stateWithComps$);

  return { DOM: vdom$ };
}
