import { Component } from 'react';
import Book from './Book';

class BookList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="book-list">
                <h2>Our book list</h2>

                {this.props.books.map(x => {
                    return <Book title={x.title} description={x.description} isSelected={true} />
                })}
            </div>
        );
    }
}

export default BookList;