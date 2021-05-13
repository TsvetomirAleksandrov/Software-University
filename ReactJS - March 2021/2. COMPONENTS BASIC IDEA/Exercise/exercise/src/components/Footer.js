import { Component } from 'react';
import Message from './Message';

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Message text="All rights reserved &copy;" />
    }
}

export default Footer;