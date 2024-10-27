import { fireEvent, screen } from '@testing-library/react'
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
    submitBookBtn = screen.getByTestId('book_form_submit_btn')
    bookListComponent = screen.getByTestId('book_list_component')
  })

  test('Should render Title input', () => {
    expect(titleInput).toBeEnabled()
    expect(titleInput).toBeInTheDocument()
  })

  test('Should accept inputs to Title', () => {
    fireEvent.change(titleInput, { target: { value: bookTitleName } })
    expect(titleInput.value).toBe(bookTitleName)
  })

  test('Should render Author input', () => {
    expect(authorInput).toBeEnabled()
    expect(authorInput).toBeInTheDocument()
  })

  test('Should accept inputs to Author', () => {
    fireEvent.change(authorInput, { target: { value: bookAuthorName } })
    expect(authorInput.value).toBe(bookAuthorName)
  })
})
