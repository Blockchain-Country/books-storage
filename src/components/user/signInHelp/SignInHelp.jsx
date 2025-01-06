import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../../api/services/firebaseConfig'
import { setAlert } from '../../../redux/slices/alertSlice'
import { setError } from '../../../redux/slices/errorSlice'
import Button from '../../common/button/Button'
import Input from '../../common/input/Input'
import './SignInHelp.css'

export const SignInHelp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await sendPasswordResetEmail(auth, email)
      dispatch(setAlert('Email sent! Check your inbox!'))
      navigate('/login')
    } catch (error) {
      console.error(error.message)
      dispatch(setError('Error sending email!'))
    }
    setEmail('')
  }

  return (
    <div data-testid="signInHelp_page">
      <div data-testid="signInHelp_back_btn_container">
        <Link to="/login" data-testid="signInHelp_back_btn">
          <IoArrowBackCircleOutline />
        </Link>
      </div>
      <form data-testid="signInHelp_form" onSubmit={handleSubmit}>
        <h3 data-testid="signInHelp_form_title">Having Trouble Signing In?</h3>
        <div data-testid="signInHelp_form_username_wrapper">
          <Input
            requred
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="logInHelp_form_username_input"
          />
        </div>
        <Button
          text="Send Me an Email"
          type="submit"
          data-testid="signInHelp_form_submit_btn"
        ></Button>
        <div data-testid="signInHelp_form_links">
          <Link to="/login">Back to Login</Link>
        </div>
      </form>
    </div>
  )
}

export default SignInHelp
