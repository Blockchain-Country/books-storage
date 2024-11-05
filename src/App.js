import './App.css'
import BookFilter from './components/bookFilters/BookFilter'
import BookForm from './components/manualBookForm/ManualBookForm'
import SearchBookForm from './components/searchBookForm/SearchBookForm'
import BookList from './components/bookList/BookList'
import Error from './components/error/Error'

function App() {
  return (
    <div className="app">
      <header className="app-header" data-testid="app_header">
        <h1>My Books Storage</h1>
      </header>
      <main className="app-main">
        <div className="app-left-column">
          <SearchBookForm />
          <BookForm />
        </div>
        <div className="app-right-column">
          <BookFilter />
          <BookList />
        </div>
      </main>
      <Error />
    </div>
  )
}

export default App
