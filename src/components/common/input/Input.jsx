import './Input.css'

const Input = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  disabled = false,
  'data-testid': testId,
}) => {
  return (
    <>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="component_input"
        data-testid={testId}
      ></input>
    </>
  )
}

export default Input
