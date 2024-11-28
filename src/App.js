import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FilterSection from './components/filterSection/FilterSection'
import ManualAddBookSection from './components/manualAddBookSection/ManualAddBookSection'
import SearchBookSection from './components/searchBookSection/SearchBookSection'
import BookListSection from './components/BookListSection/BookListSection'
import Header from './components/header/Header'
import Login from './components/login/Login'
import Error from './components/error/Error'
import './App.css'
import RandomBookSection from './components/randomBookSection/RandomBookSection'

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
                    <SearchBookSection data-testid="search_book_section" />
                    <ManualAddBookSection data-testid="manualAddBook_section" />
                    <RandomBookSection data-testid="random_book_section" />
                  </div>
                  <div data-testid="app_right_column">
                    <FilterSection data-testid="filters_section" />
                    <BookListSection data-testid="bookList_section" />
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
