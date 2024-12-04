import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import Button from '../common/button/Button'
import './Login.css'
import Input from '../common/input/Input'

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setCredentials({ username: '', password: '' })
  }

  return (
    <div data-testid="login_page">
      <div data-testid="login_back_btn_container">
        <Link to="/" data-testid="login_back_btn">
          <IoArrowBackCircleOutline />
        </Link>
      </div>
      <form data-testid="login_form" onSubmit={handleLogin}>
        <h3 data-testid="login_form_title">Login</h3>
        <div data-testid="login_form_username_wrapper">
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            data-testid="login_form_username_input"
          />
        </div>
        <div data-testid="login_form_password_wrapper">
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            data-testid="login_form_password_input"
          />
        </div>
        <Button
          text="Login"
          className="form-login-btn"
          type="submit"
          data-testid="login_form_submit_btn"
        />
      </form>
    </div>
  )
}

export default Login
