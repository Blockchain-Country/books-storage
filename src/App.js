import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookFilter from './components/bookFilters/BookFilter'
import ManualBookForm from './components/manualBookForm/ManualBookForm'
import SearchBookForm from './components/searchBookForm/SearchBookForm'
import BookList from './components/bookList/BookList'
import Header from './components/header/Header'
import Login from './components/login/Login'
import Error from './components/error/Error'
import './App.css'

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="app">
        <Header />
        <main data-testid="app_main">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div data-testid="app_left_column">
                    <SearchBookForm data-testid="search_section" />
                    <ManualBookForm data-testid="manualAddBook_section" />
                  </div>
                  <div data-testid="app_right_column">
                    <BookFilter data-testid="filters_section" />
                    <BookList data-testid="bookList_section" />
                  </div>
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </main>
        <Error />
      </div>
    </BrowserRouter>
  )
}

export default App
