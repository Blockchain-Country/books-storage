import { within, fireEvent, screen, act } from '@testing-library/react'
import { v4 as uuidv4 } from 'uuid'
import { setup } from '../../setupTests'
import store from '../../redux/store'
import BookListSection from './BookListSection'
import { createStore } from '../../redux/store'
import App from '../../App'

let bookListComponent, noBooksMessage
const bookTitleName = 'Test Book Title'
const bookAuthorName = 'Test Book Author'
const bookId = uuidv4()

describe('BookList Component Tests', () => {
  beforeEach(async () => {
    await act(async () => {
      setup(App, store)
    })

    // Locate BookListSection elements
    bookListComponent = screen.getByTestId('bookList_section')
    noBooksMessage = screen.queryByTestId('bookList_emptyMsg')
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('Should render the BookListSection component', () => {
    expect(bookListComponent).toBeInTheDocument()
    expect(screen.getByText('My Book List')).toBeInTheDocument()
  })

  test('Should display "No books in my list..." when books list is empty', () => {
    expect(noBooksMessage).toBeInTheDocument()
    expect(noBooksMessage.textContent).toBe('No books in my list...')
  })

  test('Should display a book in the list when there is one book', () => {
    // Create the mocked store with one book in the preloaded state
    const mockedStore = createStore({
      books: [{ title: bookTitleName, authors: bookAuthorName, id: bookId }],
    })

    // Render the BookList component with the updated store
    const { container } = setup(BookListSection, mockedStore)

    const noBooksSign = within(container).queryByTestId('bookList_emptyMsg')
    expect(noBooksSign).toBeNull()

    const bookItems = within(container).getAllByRole('listitem')
    expect(bookItems.length).toBe(1)
    expect(within(bookItems[0]).getByText(bookTitleName)).toBeInTheDocument()
    expect(within(bookItems[0]).getByText(bookAuthorName)).toBeInTheDocument()
  })

  test('Should delete a book from the list', () => {
    const mockedStore = createStore({
      books: [{ title: bookTitleName, authors: bookAuthorName, id: bookId }],
    })

    const { container } = setup(BookListSection, mockedStore)

    const bookItems = within(container).getByTestId(
      `bookList_item id=${bookId}`
    )
    const deleteBookBtn = within(bookItems).getByTestId('delete_book_btn')
    expect(deleteBookBtn).toBeInTheDocument()

    fireEvent.click(deleteBookBtn)
    const noBooksSign = within(container).getByTestId('bookList_emptyMsg')
    expect(noBooksSign).toBeInTheDocument()
  })

  test('Should toggle favorite and delete functionality', () => {
    const mockedStore = createStore({
      books: [
        {
          title: bookTitleName,
          authors: bookAuthorName,
          id: bookId,
          isFavorite: false,
        },
      ],
    })

    const { container } = setup(BookListSection, mockedStore)

    const bookItem = within(container).getByTestId(`bookList_item id=${bookId}`)
    const favoriteToggle = within(bookItem).getByTestId(
      'book_favorite_toggle_false'
    )

    // Toggle favorite on
    fireEvent.click(favoriteToggle)
    expect(
      within(bookItem).getByTestId('book_favorite_toggle_true')
    ).toBeInTheDocument()

    // Try deleting the book
    const deleteBookBtn = within(bookItem).getByTestId('delete_book_btn')
    fireEvent.click(deleteBookBtn)
    expect(bookItem).toBeInTheDocument()

    // Untoggle favorite
    fireEvent.click(within(bookItem).getByTestId('book_favorite_toggle_true'))
    expect(
      within(bookItem).getByTestId('book_favorite_toggle_false')
    ).toBeInTheDocument()

    // Delete book
    fireEvent.click(deleteBookBtn)
    expect(
      within(container).queryByTestId(`bookList_item id=${bookId}`)
    ).toBeNull()
  })
})
