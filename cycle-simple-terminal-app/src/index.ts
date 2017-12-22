import { run } from '@cycle/run';
import { App } from './App';
import { makeTerminalDriver } from './terminal-driver';

const main = App;

run(main, { log: makeTerminalDriver() });
