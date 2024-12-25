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
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      data-testid={`componentButton ${testId}`}
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
