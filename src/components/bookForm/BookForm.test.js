import { fireEvent, within } from '@testing-library/react'
import booksReducer from '../../redux/slices/BooksSlice'
import { setup } from '../../setupTests'

const bookTitleName = 'Test Book Title'
const bookAuthorName = 'Test Book Author'

describe('BookForm Component Tests', () => {
  test('Should render Title input field', () => {
    const { titleInput } = setup()
    expect(titleInput).toBeEnabled()
    expect(titleInput).toBeInTheDocument()
  })

  test('Should accept input value in Title field', () => {
    const { titleInput } = setup()
    fireEvent.change(titleInput, { target: { value: bookTitleName } })
    expect(titleInput.value).toBe(bookTitleName)
  })

  test('Should render Author input field', () => {
    const { authorInput } = setup()
    expect(authorInput).toBeEnabled()
    expect(authorInput).toBeInTheDocument()
  })

  test('Should accept input value in Author field', () => {
    const { authorInput } = setup()
    fireEvent.change(authorInput, { target: { value: bookAuthorName } })
    expect(authorInput.value).toBe(bookAuthorName)
  })

  test('Should submit the form and add a new book to the BookList component', () => {
    const { titleInput, authorInput, submitBookBtn, bookListComponent } =
      setup()

    fireEvent.change(titleInput, { target: { value: bookTitleName } })
    fireEvent.change(authorInput, { target: { value: bookAuthorName } })
    fireEvent.click(submitBookBtn)

    const { getByText } = within(bookListComponent)
    const newBook = getByText(bookTitleName)
    expect(newBook).toBeInTheDocument()
  })
})

describe('Redux Store Tests', () => {
  test('Should manualy add book to the store', () => {
    let state = booksReducer([], {
      type: 'books/addBook',
      payload: { title: bookTitleName, author: bookAuthorName },
    })
    expect(state).toEqual([{ title: bookTitleName, author: bookAuthorName }])
  })
})
