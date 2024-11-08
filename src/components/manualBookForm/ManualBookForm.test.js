import { fireEvent, screen } from '@testing-library/react'
import { setup } from '../../setupTests'
import store from '../../redux/store'
import App from '../../App'

const bookTitleName = 'Test Book Title'
const bookAuthorName = 'Test Book Author'

let titleInput, authorsInput, submitBookBtn, bookListComponent

describe('ManualBookForm Component Tests', () => {
  beforeEach(() => {
    setup(App, store)

    // ManualBookForm elements:
    titleInput = screen.getByTestId('manualBookForm_titleInput')
    authorsInput = screen.getByTestId('manualBookForm_authorsInput')
    submitBookBtn = screen.getByTestId('manualBookForm_submitBtn')
    bookListComponent = screen.getByTestId('bookList_component')
  })

  test('Should render Title input', () => {
    expect(titleInput).toBeEnabled()
    expect(titleInput).toBeInTheDocument()
  })

  test('Should accept inputs to Title', () => {
    fireEvent.change(titleInput, { target: { value: bookTitleName } })
    expect(titleInput.value).toBe(bookTitleName)
  })

  test('Should render Authors input', () => {
    expect(authorsInput).toBeEnabled()
    expect(authorsInput).toBeInTheDocument()
  })

  test('Should accept inputs to Authors', () => {
    fireEvent.change(authorsInput, { target: { value: bookAuthorName } })
    expect(authorsInput.value).toBe(bookAuthorName)
  })
})
