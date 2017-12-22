import { p, VNode } from '@cycle/dom';
import xs, { Stream } from 'xstream';
import { NAME } from 'unknown-lib';

//comment with missing space
export type Sinks = {
  DOM: Stream<VNode>;
};

export function App(): Sinks {
  const vdom$ = xs.of(p(`Hello ${NAME}.`));
  return { DOM: vdom$ };
}

alert('This is not allowed!');
