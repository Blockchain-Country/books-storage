import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FilterSection from './components/filterSection/FilterSection'
import ManualAddBookSection from './components/manualAddBookSection/ManualAddBookSection'
import SearchBookSection from './components/searchBookSection/SearchBookSection'
import RandomBookSection from './components/randomBookSection/RandomBookSection'
import BookListSection from './components/BookListSection/BookListSection'
import Header from './components/header/Header'
import Login from './components/user/login/Login'
import Signup from './components/user/signup/Signup'
import Error from './components/error/Error'
import { syncLoadBook } from './redux/slices/booksSlice'
import { auth } from './api/services/firebaseConfig'
import './App.css'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(syncLoadBook())
    })
    return () => unsubscribe()
  }, [dispatch])

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
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </main>
        <Error />
      </div>
    </BrowserRouter>
  )
}

export default App
