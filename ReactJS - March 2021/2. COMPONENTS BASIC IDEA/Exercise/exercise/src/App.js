import './App.css';
import Heading from './components/Heading';
import BookList from './components/BookList';
import Counter from './components/Counter';

const booksData = [
  { title: 'Harry Potter', description: 'Wizards and stuff' },
  { title: 'Programming with JS', description: 'Guide to programming' },
  { title: 'The Bible', description: 'Most important book' }
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
