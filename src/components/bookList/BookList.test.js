import { within } from '@testing-library/react'
import { useSelector } from 'react-redux'
import { setup } from '../../setupTests'

const bookTitleName = 'Test Book Title'
const bookAuthorName = 'Test Book Author'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}))

describe('BookList Component Tests', () => {
  beforeEach(() => {
    useSelector.mockClear()
  })

  test('Should display "No books in my list..." when books list is empty', () => {
    useSelector.mockImplementation(() => [])
    const { bookListComponent } = setup()
    const noBooksSign = within(bookListComponent).getByText(
      'No books in my list...'
    )
    expect(noBooksSign).toBeInTheDocument()
    useSelector.mockClear()
  })

  //   test('Should display a book in the list when there is one book', () => {
  //     useSelector.mockImplementation(() => [
  //       { title: bookTitleName, author: bookAuthorName },
  //     ])
  //     const { bookListComponent } = setup()

  //     const addedBookTitleText =
  //       within(bookListComponent).getByText(bookTitleName)
  //     expect(addedBookTitleText).toBeInTheDocument()
  //     // const addedBook = within(bookListComponent).getByText((content, element) => {
  //     //     // Match text that includes both the title and the author
  //     //     return content.includes(bookTitleName) && content.includes(bookAuthorName)
  //     //   })
  //     //   expect(addedBook).toBeInTheDocument()
  //   })
})
