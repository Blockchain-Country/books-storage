import { RiLoader2Line } from 'react-icons/ri'
import './Button.css'

const Button = ({
  text = 'Submit',
  type = 'button',
  onClick = () => {},
  disabled = false,
  isLoading = false,
  children,
  'data-testid': testId,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="componentButton"
      data-testid={testId}
      disabled={disabled}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <RiLoader2Line data-testid="search_spinner" />
      ) : children ? (
        children
      ) : (
        <span data-testid="button_text">{text}</span>
      )}
    </button>
  )
}

export default Button
