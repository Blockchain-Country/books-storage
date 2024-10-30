import { fireEvent, screen } from '@testing-library/react'
import { setup } from '../../setupTests'
import store from '../../redux/store'
import App from '../../App'

const bookTitleName = 'Test Book Title'
const bookAuthorName = 'Test Book Author'

let titleInput, authorInput, submitBookBtn, bookListComponent

describe('ManualBookForm Component Tests', () => {
  beforeEach(() => {
    setup(App, store)

    // ManualBookForm elements:
    titleInput = screen.getByTestId('manualBookForm_titleInput')
    authorInput = screen.getByTestId('manualBookForm_aurthorInput')
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

  test('Should render Author input', () => {
    expect(authorInput).toBeEnabled()
    expect(authorInput).toBeInTheDocument()
  })

  test('Should accept inputs to Author', () => {
    fireEvent.change(authorInput, { target: { value: bookAuthorName } })
    expect(authorInput.value).toBe(bookAuthorName)
  })
})
