import xs, { Stream } from 'xstream';
import dropRepeats from 'xstream/extra/dropRepeats';
import { div, DOMSource, VNode, canvas, p } from '@cycle/dom';

export type Sources = {
  DOM: DOMSource;
};

export type Sinks = {
  DOM: Stream<VNode>;
};

type Actions = {
  element$: Stream<HTMLElement>;
  mousemove$: Stream<MouseEvent>;
};

type State = { x: number; y: number };

function intent(domSource: DOMSource): Actions {
  return {
    element$: domSource
      .select('.canvas')
      .elements()
      .filter((elements: any) => elements.length)
      .map((elements: any) => elements[0])
      .compose(dropRepeats()),
    mousemove$: domSource.select('.canvas').events('mousemove') as Stream<
      MouseEvent
    >
  };
}

function model({ element$, mousemove$ }: Actions): Stream<State> {
  return xs
    .combine(element$, mousemove$)
    .map(([element, mousemove]) => ({
      x: mousemove.pageX - element.offsetLeft,
      y: mousemove.pageY - element.offsetTop
    }))
    .startWith({ x: 0, y: 0 });
}

function view(state$: Stream<State>) {
  return state$.map(state =>
    div([
      canvas('.canvas', { attrs: { style: 'outline: 1px solid black' } }),
      p(`x: ${state.x}, y: ${state.y}`)
    ])
  );
}

export function Canvas(sources: Sources): Sinks {
  const actions = intent(sources.DOM);
  const state$ = model(actions);
  const vdom$ = view(state$);

  return { DOM: vdom$ };
}
