import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth'
import Input from '../../common/input/Input'
import Button from '../../common/button/Button'
import { auth } from '../../../api/services/firebaseConfig'
import { setError } from '../../../redux/slices/errorSlice'
import './Signup.css'

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })

  useState(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/')
      }
      return () => unsubscribe()
    })
  }, navigate)

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (credentials.password === credentials.confirmPassword) {
      try {
        await createUserWithEmailAndPassword(
          auth,
          credentials.username,
          credentials.password
        )

        dispatch(setError('User registered!'))
        setCredentials({ username: '', password: '', confirmPassword: '' })
        navigate('/')
      } catch (error) {
        if (error.code === 'auth/invalid-email') {
          dispatch(setError('The email address is invalid!'))
        } else if (error.code === 'auth/email-already-in-use') {
          dispatch(
            setError('This email is already in use. Please use another email!')
          )
        } else if (error.code === 'auth/weak-password') {
          dispatch(setError('Password should be at least 6 characters long!'))
        } else {
          dispatch(setError('An unexpected error occurred. Please try again!'))
        }
        console.error(error.message)
      }
    } else {
      dispatch(setError('Passwords do not match!'))
    }
  }

  return (
    <div data-testid="signup_page">
      <div data-testid="signup_back_btn_container">
        <Link to="/" data-testid="signup_back_btn">
          <IoArrowBackCircleOutline />
        </Link>
      </div>
      <form data-testid="signup_form" onSubmit={handleSignUp}>
        <h3 data-testid="signup_form_title">Register</h3>
        <div data-testid="signup_form_username_wrapper">
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            data-testid="signup_form_username_input"
          />
        </div>
        <div data-testid="signup_form_password_wrapper">
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            data-testid="signup_form_password_input"
          />
        </div>
        <div data-testid="signup_form_confirm_password_wrapper">
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={credentials.confirmPassword}
            onChange={handleChange}
            data-testid="signup_form_confirm_password_input"
          />
        </div>
        <Button
          text="Sign Up"
          type="submit"
          data-testid="signup_form_submit_btn"
        ></Button>
        <Link to="/login">Login</Link>
      </form>
    </div>
  )
}

export default SignUp
