import { screen, fireEvent, within } from '@testing-library/react'
import { setup } from './setupTests'
import { createStore } from './redux/store'
import App from './App'

//App main component:
let header, manualBookForm_Component, bookFilter_Component, bookList_Component

// BookForm elements:
let titleInput, authorsInput, submitBookBtn

// BookFilter elements:
let filterByTitleInput, filterbyAuthorsInput, clearAllFiltersBtn

const bookTitleName = 'BookTitle1'
const bookAuthorName = 'BookAuthor1'

let store

function resetStore() {
  store = createStore()
}

function submitNewBook(bookTitle, bookAuthor) {
  fireEvent.change(titleInput, { target: { value: bookTitle } })
  fireEvent.change(authorsInput, { target: { value: bookAuthor } })
  fireEvent.click(submitBookBtn)
}

describe('App Component Tests', () => {
  //App main component elements:

  beforeEach(() => {
    resetStore()
    setup(App, store)

    //main components elements:
    header = screen.getByTestId('app_header')
    manualBookForm_Component = screen.getByTestId('manualBookForm_component')
    bookFilter_Component = screen.getByTestId('book_filter_component')
    bookList_Component = screen.getByTestId('bookList_component')
  })

  test('Should render the Header to be in the DOM and should contain text "My Books Storage"', async () => {
    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent('My Books Storage')
  })

  test('Should render the ManualBookForm component in the DOM', () => {
    expect(manualBookForm_Component).toBeInTheDocument()
  })

  test('Should render the BookList component in the DOM', () => {
    expect(bookList_Component).toBeInTheDocument()
  })

  test('Should render the BookFilter component in the DOM', () => {
    expect(bookFilter_Component).toBeInTheDocument()
  })
})

describe('App functional Tests', () => {
  beforeEach(() => {
    resetStore()
    setup(App, store)

    // ManualBookForm elements:
    titleInput = screen.getByTestId('manualBookForm_titleInput')
    authorsInput = screen.getByTestId('manualBookForm_authorsInput')
    submitBookBtn = screen.getByTestId('manualBookForm_submitBtn')
    bookList_Component = screen.getByTestId('bookList_component')
    // BookFilter elements:
    filterByTitleInput = screen.getByTestId('filterByTitle_input')
    filterbyAuthorsInput = screen.getByTestId('filterByAuthors_input')
    clearAllFiltersBtn = screen.getByTestId('clearAllFilters_btn')
  })

  test('Should Submit a new book to the BookList component', () => {
    submitNewBook(bookTitleName, bookAuthorName)

    // Verify that the book is added to the book list
    const bookItems = within(bookList_Component).getAllByRole('listitem')
    expect(bookItems.length).toEqual(1)
    const newBookTitle = within(bookItems[0]).getByText(bookTitleName)
    expect(newBookTitle).toBeInTheDocument()
    const newBookAuthor = within(bookItems[0]).getByText(bookAuthorName)
    expect(newBookAuthor).toBeInTheDocument()
  })

  test('Should Submit two books then filter by Title', () => {
    submitNewBook(bookTitleName, bookAuthorName)
    submitNewBook('BookTitle2', 'BookAuthor2')

    // Verify two books added to the BookList
    const bookItems = within(bookList_Component).getAllByRole('listitem')
    expect(bookItems.length).toEqual(2)

    // Apply TitleFilter
    fireEvent.change(filterByTitleInput, {
      target: { value: bookTitleName },
    })

    // Verify the BookList is filtered and contain one book
    const filteredBooks = within(bookList_Component).getAllByRole('listitem')
    expect(filteredBooks.length).toEqual(1)

    const filteredTitleEl = within(filteredBooks[0]).getByText(bookTitleName)
    expect(filteredTitleEl).toBeInTheDocument()
  })

  test('Should Submit two books then filter by Authors', () => {
    submitNewBook(bookTitleName, bookAuthorName)
    submitNewBook('BookTitle2', 'BookAuthor2')

    // Verify two books added to the BookList
    const bookItems = within(bookList_Component).getAllByRole('listitem')
    expect(bookItems.length).toEqual(2)

    // Apply AuthorFilter
    fireEvent.change(filterbyAuthorsInput, {
      target: { value: bookAuthorName },
    })

    // Verify the BookList is filtered and contain one book
    const filteredBooks = within(bookList_Component).getAllByRole('listitem')
    expect(filteredBooks.length).toEqual(1)

    const filteredAuthorEl = within(filteredBooks[0]).getByText(bookAuthorName)
    expect(filteredAuthorEl).toBeInTheDocument()
  })

  test('Should display back two books when click ClearAllfilters btn', () => {
    submitNewBook(bookTitleName, bookAuthorName)
    submitNewBook('BookTitle2', 'BookAuthor2')

    // Apply TitleFilter
    fireEvent.change(filterByTitleInput, {
      target: { value: bookTitleName },
    })

    // Verify the BookList is filtered and contain one book
    const filteredBooks = within(bookList_Component).getAllByRole('listitem')
    expect(filteredBooks.length).toEqual(1)

    fireEvent.click(clearAllFiltersBtn)

    // Verify the BookList to contain two books
    const booksListAfterFilterReset =
      within(bookList_Component).getAllByRole('listitem')
    expect(booksListAfterFilterReset.length).toEqual(2)
  })
})
