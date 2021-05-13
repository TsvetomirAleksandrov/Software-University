import { Component } from 'react';

class Message extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showFooter: true
        };
    }

    componentDidMount() {
        console.log('ComponentDidMount');

        setTimeout(() => {
            this.setState({ showFooter: false });
        }, 2500);
    }

    componentDidUpdate() {
        console.log('ComponentDidUpdate');
    }

    render() {
        console.log('Render');
        return (
            <span>{this.props.text}</span>
        )
    }
}

export default Message;