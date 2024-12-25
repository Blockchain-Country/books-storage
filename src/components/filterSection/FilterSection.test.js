import { fireEvent, screen, act } from '@testing-library/react'
import { setup } from '../../setupTests'
import store from '../../redux/store'
import App from '../../App'

const titleFilterStr = 'title'
const authorsFilterStr = 'authors'

let filterByTitleInput, filterbyAuthorsInput, clearAllFiltersBtn

describe('FilterSection Component Tests', () => {
  beforeEach(async () => {
    await act(async () => {
      setup(App, store)
    })

    // FilterSection elements:
    filterByTitleInput = screen.getByTestId((id) =>
      id.includes('filter_title_input')
    )
    filterbyAuthorsInput = screen.getByTestId((id) =>
      id.includes('filter_author_input')
    )
    clearAllFiltersBtn = screen.getByTestId((id) =>
      id.includes('filter_clear_btn')
    )
  })

  afterEach(() => {
    document.body.innerHTML = ''
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
