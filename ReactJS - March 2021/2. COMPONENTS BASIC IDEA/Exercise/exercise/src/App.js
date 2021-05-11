import './App.css';
import Heading from './components/Heading';
import BookList from './components/BookList';
import Counter from './components/Counter';

const booksData = [
  { id: 1 ,title: 'Harry Potter', description: 'Wizards and stuff', author: 'Author 1' },
  { id: 2 ,title: 'Programming with JS', description: 'Guide to programming', author: 'Author 2' },
  { id: 3 ,title: 'The Bible', description: 'Most important book', author: 'Author 2' }
]

function App() {
  return (
    <div className="site-wapper">
      <Heading>
        <h1>Our custom library</h1>
        <h3>Your custom library</h3>
      </Heading>

      <Counter />

      <BookList books={booksData} />
    </div>
  );
}

export default App;
