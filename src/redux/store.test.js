import { v4 as uuidv4 } from 'uuid'
import booksReducer, {
  addBook,
  deleteBook,
  toggleFavorite,
} from './slices/booksSlice'
import filterReducer, {
  setTitleFilter,
  setAuthorsFilter,
  resetAllFilters,
} from './slices/filterSlice'

const bookTitleName = 'Test Book Title'
const bookAuthorName = 'Test Book Author'
const bookIdOne = uuidv4()
const bookIdTwo = uuidv4()

const initialBooksState = [
  {
    title: bookTitleName,
    authors: bookAuthorName,
    id: bookIdOne,
    isFavorite: false,
  },
]

const initialFilterState = {
  title: '',
  authors: '',
}

describe('Redux Store Tests', () => {
  test('Should manually add a book to the store and verify', () => {
    let state = booksReducer([], addBook(initialBooksState[0]))
    expect(state.length).toEqual(1)
    expect(state).toEqual([
      {
        title: bookTitleName,
        authors: bookAuthorName,
        id: bookIdOne,
        isFavorite: false,
      },
    ])
  })

  test('Should Delete particular book from the store and verify', () => {
    const initialState = [
      { title: bookTitleName, authors: bookAuthorName, id: bookIdOne },
      { title: bookTitleName + 2, authors: bookAuthorName + 2, id: bookIdTwo },
    ]
    let state = booksReducer(initialState, deleteBook(bookIdOne))

    expect(state.length).toEqual(1)
    expect(state[0].id).toEqual(bookIdTwo)
  })

  test('Should toggleFavorite book from the store and verify', () => {
    let state = booksReducer(initialBooksState, addBook(bookIdOne))
    state = booksReducer(initialBooksState, toggleFavorite(bookIdOne))
    expect(state[0].isFavorite).toEqual(true)
  })

  test('Should verify filterReducer by Titile ', () => {
    let state = filterReducer(initialFilterState, setTitleFilter('test title'))
    expect(state.title).toEqual('test title')
    expect(state.authors).toEqual('')
  })

  test('Should verify filterReducer by Authors ', () => {
    let state = filterReducer(
      initialFilterState,
      setAuthorsFilter('test author')
    )
    expect(state.title).toEqual('')
    expect(state.authors).toEqual('test author')
  })

  test('Should set Title and Author filter then verify resetAllFilters reducer', () => {
    const satedTitleFilterState = filterReducer(
      initialFilterState,
      setTitleFilter('test title')
    )
    const satedBothFiltersState = filterReducer(
      satedTitleFilterState,
      setAuthorsFilter('test author')
    )
    const afterResetState = filterReducer(
      satedBothFiltersState,
      resetAllFilters()
    )
    expect(afterResetState).toEqual(initialFilterState)
  })
})
