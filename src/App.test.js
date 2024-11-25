import { screen, fireEvent, within } from '@testing-library/react'
import { setup } from './setupTests'
import { createStore } from './redux/store'
import App from './App'

//App main component:
let header,
  manualAddBookSection_component,
  filterSection_component,
  bookListSection_component

// BookForm elements:
let titleInput, authorsInput, submitBookBtn

// FilterSection elements:
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
    header = screen.getByTestId('header_container')
    manualAddBookSection_component = screen.getByTestId('manualAddBook_section')
    filterSection_component = screen.getByTestId('filters_section')
    bookListSection_component = screen.getByTestId('bookList_section')
  })

  test('Should render the Header to be in the DOM and should contain text "My Books Storage"', async () => {
    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent('My Books Storage')
  })

  test('Should render the ManualAddBookSection component in the DOM', () => {
    expect(manualAddBookSection_component).toBeInTheDocument()
  })

  test('Should render the BookListSection component in the DOM', () => {
    expect(bookListSection_component).toBeInTheDocument()
  })

  test('Should render the FilterSection component in the DOM', () => {
    expect(filterSection_component).toBeInTheDocument()
  })
})

describe('App functional Tests', () => {
  beforeEach(() => {
    resetStore()
    setup(App, store)

    // ManualAddBookSection form elements:
    titleInput = screen.getByTestId('manualAddBook_input_title')
    authorsInput = screen.getByTestId('manualAddBook_input_author')
    submitBookBtn = screen.getByTestId('manualAddBook_submit_btn')
    bookListSection_component = screen.getByTestId('bookList_section')
    // FilterSection elements:
    filterByTitleInput = screen.getByTestId('filter_title_input')
    filterbyAuthorsInput = screen.getByTestId('filter_author_input')
    clearAllFiltersBtn = screen.getByTestId('filter_clear_btn')
  })

  test('Should Submit a new book to the BookListSection', () => {
    submitNewBook(bookTitleName, bookAuthorName)

    // Verify that the book is added to the book list
    const bookItems = within(bookListSection_component).getAllByRole('listitem')
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
    const bookItems = within(bookListSection_component).getAllByRole('listitem')
    expect(bookItems.length).toEqual(2)

    // Apply TitleFilter
    fireEvent.change(filterByTitleInput, {
      target: { value: bookTitleName },
    })

    // Verify the BookList is filtered and contain one book
    const filteredBooks = within(bookListSection_component).getAllByRole(
      'listitem'
    )
    expect(filteredBooks.length).toEqual(1)

    const filteredTitleEl = within(filteredBooks[0]).getByText(bookTitleName)
    expect(filteredTitleEl).toBeInTheDocument()
  })

  test('Should Submit two books then filter by Authors', () => {
    submitNewBook(bookTitleName, bookAuthorName)
    submitNewBook('BookTitle2', 'BookAuthor2')

    // Verify two books added to the BookList
    const bookItems = within(bookListSection_component).getAllByRole('listitem')
    expect(bookItems.length).toEqual(2)

    // Apply AuthorFilter
    fireEvent.change(filterbyAuthorsInput, {
      target: { value: bookAuthorName },
    })

    // Verify the BookList is filtered and contain one book
    const filteredBooks = within(bookListSection_component).getAllByRole(
      'listitem'
    )
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
    const filteredBooks = within(bookListSection_component).getAllByRole(
      'listitem'
    )
    expect(filteredBooks.length).toEqual(1)

    fireEvent.click(clearAllFiltersBtn)

    // Verify the BookList to contain two books
    const booksListAfterFilterReset = within(
      bookListSection_component
    ).getAllByRole('listitem')
    expect(booksListAfterFilterReset.length).toEqual(2)
  })
})
