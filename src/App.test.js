import {
  setup,
  getBookFormComponent,
  getBookFilterComponent,
} from './setupTests'

describe('App Component Tests', () => {
  test('Should render the Header to be in the DOM and constain text "My Book Storage"', async () => {
    const { header } = setup()
    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent('My Book Storage')
  })

  test('Should render the BookForm component in the DOM', () => {
    setup()
    const bookFormComponent = getBookFormComponent()
    expect(bookFormComponent).toBeInTheDocument()
  })

  test('Should render the BookList component in the DOM', () => {
    const { bookListComponent } = setup()
    expect(bookListComponent).toBeInTheDocument()
  })

  test('Should render the BookFilter component in the DOM', () => {
    setup()
    const bookFilterComponent = getBookFilterComponent()
    expect(bookFilterComponent).toBeInTheDocument()
  })
})
