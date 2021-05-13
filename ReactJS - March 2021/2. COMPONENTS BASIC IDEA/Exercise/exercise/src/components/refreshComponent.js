import { Component } from 'react';

function refreshComponent(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
        }

        componentDidMount() {
            setTimeout(() => {

            }, 2000);
        }

        render() {
            return <WrappedComponent />
        }
    }
}