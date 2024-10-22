import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import '@testing-library/jest-dom'
import App from './App'
import store from './redux/store'

export const setup = () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  //App header elements:
  const header = screen.getByTestId('app_header')

  //BookForm elements:
  const titleInput = screen.getByTestId('book_form_title_input')
  const authorInput = screen.getByTestId('book_form_author_input')
  const submitBookBtn = screen.getByTestId('book_form_sbmit_btn')

  //BookList elements:
  const bookListComponent = screen.getByTestId('book_list_component')
  const noBooksSign = screen.getByTestId('no_books_sign')

  //BookFilter elements:

  return {
    header,
    titleInput,
    authorInput,
    submitBookBtn,
    bookListComponent,
    noBooksSign,
  }
}

export const getBookFormComponent = () => {
  return screen.getByTestId('book_form_component')
}

export const getBookFilterComponent = () => {
  return screen.getByTestId('book_filter_component')
}
