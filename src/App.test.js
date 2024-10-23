import { screen } from '@testing-library/react'
import { setup } from './setupTests'
import store from './redux/store'
import App from './App'

let header, bookFormComponent, bookListComponent, bookFilterComponent

describe('App Component Tests', () => {
  beforeEach(() => {
    setup(App, store)

    //main component elements:
    header = screen.getByTestId('app_header')
    bookFormComponent = screen.getByTestId('book_form_component')
    bookListComponent = screen.getByTestId('book_list_component')
    bookFilterComponent = screen.getByTestId('book_filter_component')
  })

  test('Should render the Header to be in the DOM and contain text "My Book Storage"', async () => {
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
