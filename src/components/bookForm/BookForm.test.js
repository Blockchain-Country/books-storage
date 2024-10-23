import { fireEvent, within, screen } from '@testing-library/react'
import booksReducer from '../../redux/slices/BooksSlice'
import { setup } from '../../setupTests'
import store from '../../redux/store'
import App from '../../App'

const bookTitleName = 'Test Book Title'
const bookAuthorName = 'Test Book Author'

let titleInput, authorInput, submitBookBtn, bookListComponent

describe('BookForm Component Tests', () => {
  beforeEach(() => {
    setup(App, store)

    // BookForm elements:
    titleInput = screen.getByTestId('book_form_title_input')
    authorInput = screen.getByTestId('book_form_author_input')
    submitBookBtn = screen.getByTestId('book_form_sbmit_btn')
    bookListComponent = screen.getByTestId('book_list_component')
  })

  test('Should render Title input field', () => {
    expect(titleInput).toBeEnabled()
    expect(titleInput).toBeInTheDocument()
  })

  test('Should accept input value in Title field', () => {
    fireEvent.change(titleInput, { target: { value: bookTitleName } })
    expect(titleInput.value).toBe(bookTitleName)
  })

  test('Should render Author input field', () => {
    expect(authorInput).toBeEnabled()
    expect(authorInput).toBeInTheDocument()
  })

  test('Should accept input value in Author field', () => {
    fireEvent.change(authorInput, { target: { value: bookAuthorName } })
    expect(authorInput.value).toBe(bookAuthorName)
  })

  test('Should submit the form and add a new book to the BookList component', () => {
    fireEvent.change(titleInput, { target: { value: bookTitleName } })
    fireEvent.change(authorInput, { target: { value: bookAuthorName } })
    fireEvent.click(submitBookBtn)

    // Verify that the book is added to the book list
    const newBook = within(bookListComponent).getByText(bookTitleName)
    expect(newBook).toBeInTheDocument()
  })
})

describe('Redux Store Tests', () => {
  test('Should manually add a book to the store', () => {
    let state = booksReducer([], {
      type: 'books/addBook',
      payload: { title: bookTitleName, author: bookAuthorName },
    })
    expect(state).toEqual([{ title: bookTitleName, author: bookAuthorName }])
  })
})
