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
        data-testid={`component_input ${testId}`}
      ></input>
    </>
  )
}

export default Input
