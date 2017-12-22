import { Stream } from 'xstream';
import { div, label, input, hr, h1, DOMSource, VNode } from '@cycle/dom';

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

function view(state$: Stream<string>) {
  return state$.map(name =>
    div([
      label('Name:'),
      input('.field', { attrs: { type: 'text' } }),
      hr(),
      h1('Hello ' + name)
    ])
  );
}

export function App(sources: Sources): Sinks {
  const actions = intent(sources.DOM);
  const state$ = model(actions);
  const vdom$ = view(state$);

  return { DOM: vdom$ };
}
