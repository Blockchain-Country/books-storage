import { within, fireEvent } from '@testing-library/react'
import { v4 as uuidv4 } from 'uuid'
import { setup } from '../../setupTests'
import BookList from '../../components/bookList/BookList'
import { createStore } from '../../redux/store'

const bookTitleName = 'Test Book Title'
const bookAuthorName = 'Test Book Author'
const bookId = uuidv4()

describe('BookList Component Tests', () => {
  test('Should display "No books in my list..." when books list is empty', () => {
    // Create the mocked store with no books in the preloaded state
    const mockedStore = createStore({
      books: [],
    })

    // Render the BookList component with the mock store
    const { container } = setup(BookList, mockedStore)

    const noBooksSign = within(container).getByTestId('no_books_sign')
    expect(noBooksSign).toBeInTheDocument()
  })

  test('Should display a book in the list when there is one book', () => {
    // Create the mocked store with one book in the preloaded state
    const mockedStore = createStore({
      books: [{ title: bookTitleName, author: bookAuthorName, id: bookId }],
    })

    // Render the BookList component with the updated store
    const { container } = setup(BookList, mockedStore)

    const noBooksSign = within(container).queryByTestId('no_books_sign')
    expect(noBooksSign).toBeNull()

    const bookItems = within(container).getAllByRole('listitem')
    expect(bookItems.length).toBe(1)
    expect(within(bookItems[0]).getByText(bookTitleName)).toBeInTheDocument()
    expect(within(bookItems[0]).getByText(bookAuthorName)).toBeInTheDocument()
  })

  test('Should delete a book from the list', () => {
    const mockedStore = createStore({
      books: [{ title: bookTitleName, author: bookAuthorName, id: bookId }],
    })

    const { container } = setup(BookList, mockedStore)

    const bookItems = within(container).getByTestId(bookId)
    const deleteBookBtn = within(bookItems).getByTestId('delete_book_btn')
    expect(deleteBookBtn).toBeInTheDocument()

    fireEvent.click(deleteBookBtn)
    const noBooksSign = within(container).getByTestId('no_books_sign')
    expect(noBooksSign).toBeInTheDocument()
  })
})
