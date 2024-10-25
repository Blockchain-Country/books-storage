import { screen, fireEvent, within } from '@testing-library/react'
import { setup } from './setupTests'
import { createStore } from './redux/store'
import App from './App'
import { resetAllFilters } from './redux/slices/FilterSlice'

//App main component:
let header, bookFormComponent, bookFilterComponent, bookListComponent

// BookForm elements:
let titleInput, authorInput, submitBookBtn

// BookFilter elements:
let filterByTitleInput, filterbyAuthorInput, clearAllFiltersBtn

const bookTitleName = 'BookTitle1'
const bookAuthorName = 'BookAuthor1'

let store

function resetStore() {
  store = createStore()
}

function submitNewBook(bookTitle, bookAuthor) {
  fireEvent.change(titleInput, { target: { value: bookTitle } })
  fireEvent.change(authorInput, { target: { value: bookAuthor } })
  fireEvent.click(submitBookBtn)
}

describe('App Component Tests', () => {
  //App main component elements:

  beforeEach(() => {
    resetStore()
    setup(App, store)

    //main component elements:
    header = screen.getByTestId('app_header')
    bookFormComponent = screen.getByTestId('book_form_component')
    bookFilterComponent = screen.getByTestId('book_filter_component')
    bookListComponent = screen.getByTestId('book_list_component')
  })

  test('Should render the Header to be in the DOM and should contain text "My Book Storage"', async () => {
    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent('My Book Storage')
  })

  test('Should render the BookForm component in the DOM', () => {
    expect(bookFormComponent).toBeInTheDocument()
  })

  test('Should render the BookList component in the DOM', () => {
    expect(bookListComponent).toBeInTheDocument()
  })

  test('Should render the BookFilter component in the DOM', () => {
    expect(bookFilterComponent).toBeInTheDocument()
  })
})

describe('App functional Tests', () => {
  beforeEach(() => {
    resetStore()
    setup(App, store)

    // BookForm elements:
    titleInput = screen.getByTestId('book_form_title_input')
    authorInput = screen.getByTestId('book_form_author_input')
    submitBookBtn = screen.getByTestId('book_form_sbmit_btn')
    bookListComponent = screen.getByTestId('book_list_component')
    // BookFilter elements:
    filterByTitleInput = screen.getByTestId('filterByTitle_input')
    filterbyAuthorInput = screen.getByTestId('filterByAuthor_input')
    clearAllFiltersBtn = screen.getByTestId('clearAllFilters_btn')
  })

  test('Should Submit a new book to the BookList component', () => {
    submitNewBook(bookTitleName, bookAuthorName)

    // Verify that the book is added to the book list
    const bookItems = within(bookListComponent).getAllByRole('listitem')
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
    const bookItems = within(bookListComponent).getAllByRole('listitem')
    expect(bookItems.length).toEqual(2)

    // Apply TitleFilter
    fireEvent.change(filterByTitleInput, {
      target: { value: 'BookTitle2' },
    })

    // Verify the BookList is filtered and contain one book
    const filteredBooks = within(bookListComponent).getAllByRole('listitem')
    expect(filteredBooks.length).toEqual(1)

    const filteredTitleEl = within(filteredBooks[0]).getByText('BookTitle2')
    expect(filteredTitleEl).toBeInTheDocument()
  })

  test('Should Submit two books then filter by Author', () => {
    submitNewBook(bookTitleName, bookAuthorName)
    submitNewBook('BookTitle2', 'BookAuthor2')

    // Verify two books added to the BookList
    const bookItems = within(bookListComponent).getAllByRole('listitem')
    expect(bookItems.length).toEqual(2)

    // Apply AuthorFilter
    fireEvent.change(filterbyAuthorInput, {
      target: { value: 'BookAuthor2' },
    })

    // Verify the BookList is filtered and contain one book
    const filteredBooks = within(bookListComponent).getAllByRole('listitem')
    expect(filteredBooks.length).toEqual(1)

    const filteredAuthorEl = within(filteredBooks[0]).getByText('BookAuthor2')
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
    const filteredBooks = within(bookListComponent).getAllByRole('listitem')
    expect(filteredBooks.length).toEqual(1)

    fireEvent.click(clearAllFiltersBtn)

    // Verify the BookList to contain two books
    const booksListAfterFilterReset =
      within(bookListComponent).getAllByRole('listitem')
    expect(booksListAfterFilterReset.length).toEqual(2)
  })
})
