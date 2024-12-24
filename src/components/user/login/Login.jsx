import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import Input from '../../common/input/Input'
import Button from '../../common/button/Button'
import { auth } from '../../../api/services/firebaseConfig'
import { setError } from '../../../redux/slices/errorSlice'
import './Login.css'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })

  useEffect(() => {
    // Set up a listener to check if a user is authenticated
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/')
      }
    })
    // Cleanup the listener on component unmount
    return () => unsubscribe()
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(
        auth,
        credentials.username,
        credentials.password
      )
      console.log('User logged in!')
      dispatch(setError('User logged in!'))
      setCredentials({ username: '', password: '' })
      navigate('/')
    } catch (error) {
      console.error(error.message)
      dispatch(setError('Incorrect username or password!'))
    }
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
          type="submit"
          data-testid="login_form_submit_btn"
        ></Button>
        <Link to="/signup">Sign Up</Link>
      </form>
    </div>
  )
}

export default Login
