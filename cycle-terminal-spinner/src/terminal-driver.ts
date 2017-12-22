import { Stream } from 'xstream';
import update from 'log-update';

// sink-only driver
// `makeTerminalDriver` could take options in the future
export function makeTerminalDriver() {
  function terminalDriver(msg$: Stream<string>) {
    msg$.addListener({
      next: msg => update(msg)
    });
  }

  return terminalDriver;
}
