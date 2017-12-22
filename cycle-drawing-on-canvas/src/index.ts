import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import { App } from './App';

const main = App;

run(main, { DOM: makeDOMDriver('#app') });
