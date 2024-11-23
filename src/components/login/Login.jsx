import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import Button from '../common/button/Button'
import './Login.css'

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
    // alert(JSON.stringify(credentials))
    setCredentials({ username: '', password: '' })
  }

  return (
    <div data-testid="login_container">
      <div data-testid="back_btn_container">
        <Link to="/" data-testid="login_page_back_btn">
          <IoArrowBackCircleOutline />
        </Link>
      </div>
      <form data-testid="login_form_container" onSubmit={handleLogin}>
        <h2 className="login-title">Login</h2>
        <div className="username-element">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
          />
        </div>
        <div className="password-element">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <Button
          text="Login"
          className="form-login-btn"
          data-testid="form_login_btn"
          type="submit"
        />
      </form>
    </div>
  )
}

export default Login
