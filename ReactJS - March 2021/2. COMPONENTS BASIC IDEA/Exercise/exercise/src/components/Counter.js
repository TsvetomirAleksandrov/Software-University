import { Component } from 'react';

class Counter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 1,
        };
    }

    decrementCounter() {
        this.setState({ count: this.state.count - 1 })
    }

    incrementCounter() {
        this.setState({ count: this.state.count + 1 })
    }

    resetCounter() {
        this.setState({ count: 0 })
    }

    render() {
        return (
            <div className="counter">
                <h3>Book Counter</h3>
                <button onClick={(e) => this.decrementCounter(e)}>-</button>
                <span>{this.state.count}</span>
                <button onClick={(e) => this.incrementCounter(e)}>+</button>
                <button onClick={(e) => this.resetCounter(e)}>Reset</button>
            </div>
        );
    }
}

export default Counter;