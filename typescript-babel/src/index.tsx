import React, { Component } from 'react';
import { render } from 'react-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

export type CounterProps = { offset?: number };

@observer
export class Counter extends Component<CounterProps> {
  @observable value = 0;
  intervalId: number;

  componentDidMount() {
    this.intervalId = setInterval(() => (this.value = this.value + 1), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return <span>Running since {this.value} seconds!</span>;
  }
}

render(<Counter />, document.getElementById('app'));
