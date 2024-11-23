import { fireEvent, screen } from '@testing-library/react'
import { setup } from '../../setupTests'
import store from '../../redux/store'
import App from '../../App'

const titleFilterStr = 'title'
const authorsFilterStr = 'authors'

let filterByTitleInput, filterbyAuthorsInput, clearAllFiltersBtn

describe('BookFilter Component Tests', () => {
  beforeEach(() => {
    setup(App, store)

    // BookFilter elements:
    filterByTitleInput = screen.getByTestId('filter_title_input')
    filterbyAuthorsInput = screen.getByTestId('filter_author_input')
    clearAllFiltersBtn = screen.getByTestId('filter_clear_btn')
  })

  test('Should render TitleFilter input', () => {
    expect(filterByTitleInput).toBeInTheDocument()
    expect(filterByTitleInput).toBeEnabled()
  })

  test('Should accept inputs to TitleFilter', () => {
    fireEvent.change(filterByTitleInput, { target: { value: titleFilterStr } })
    expect(filterByTitleInput.value).toBe(titleFilterStr)
  })

  test('Should render AuthorFilter input', () => {
    expect(filterbyAuthorsInput).toBeInTheDocument()
    expect(filterbyAuthorsInput).toBeEnabled()
  })

  test('Should accept inputs to AuthorFilter', () => {
    fireEvent.change(filterbyAuthorsInput, {
      target: { value: authorsFilterStr },
    })
    expect(filterbyAuthorsInput.value).toBe(authorsFilterStr)
  })

  test('Should render ClearAllFilters btn', () => {
    expect(clearAllFiltersBtn).toBeInTheDocument()
    expect(clearAllFiltersBtn).toBeEnabled()
  })
})
