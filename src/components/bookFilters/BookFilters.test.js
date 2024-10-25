import { fireEvent, within, screen } from '@testing-library/react'
import { setup } from '../../setupTests'
import store from '../../redux/store'
import App from '../../App'

const titleFilterStr = 'title'
const authorFilterStr = 'author'

let filterByTitleInput, filterbyAuthorInput

describe('BookFilter Component Tests', () => {
  beforeEach(() => {
    setup(App, store)

    // BookFilter elements:
    filterByTitleInput = screen.getByTestId('filterByTitle_input')
    filterbyAuthorInput = screen.getByTestId('filterByAuthor_input')
  })

  test('Should render TitleFilter input', () => {
    expect(filterByTitleInput).toBeEnabled()
    expect(filterByTitleInput).toBeInTheDocument()
  })

  test('Should accept inputs to TitleFilter', () => {
    fireEvent.change(filterByTitleInput, { target: { value: titleFilterStr } })
    expect(filterByTitleInput.value).toBe(titleFilterStr)
  })

  test('Should render AuthorFilter input', () => {
    expect(filterbyAuthorInput).toBeEnabled()
    expect(filterbyAuthorInput).toBeInTheDocument()
  })

  test('Should accept inputs to AuthorFilter', () => {
    fireEvent.change(filterbyAuthorInput, {
      target: { value: authorFilterStr },
    })
    expect(filterbyAuthorInput.value).toBe(authorFilterStr)
  })
})
