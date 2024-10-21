import './App.css'
import BookFilter from './components/bookFilters/BookFilter'
import BookForm from './components/bookForm/BookForm'
import BookList from './components/bookList/BookList'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>My Book Storage</h1>
      </header>
      <main className="app-main">
        <div className="app-left-column">
          <BookForm />
        </div>
        <div className="app-right-column">
          <BookFilter />
          <BookList />
        </div>
      </main>
    </div>
  )
}

export default App
