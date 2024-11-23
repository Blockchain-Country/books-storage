import { RiLoader2Line } from 'react-icons/ri'
import './Button.css'

const Button = ({
  text = 'Submit',
  type = 'button',
  onClick = () => {},
  className = '',
  disabled = false,
  'data-testid': testId,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`componentButton ${className}`}
      data-testid={testId}
      disabled={disabled}
      aria-busy={disabled}
    >
      {disabled ? (
        <RiLoader2Line className="buttonSpinner" data-testid="search_spinner" />
      ) : (
        text
      )}
    </button>
  )
}

export default Button
