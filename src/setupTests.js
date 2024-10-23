import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import '@testing-library/jest-dom'

export const setup = (Component, store) => {
  // Render the provided component with the custom store
  return render(
    <Provider store={store}>
      <Component />
    </Provider>
  )
}
