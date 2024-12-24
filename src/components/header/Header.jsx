import { Link, useLocation } from 'react-router-dom'
import './Header.css'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../../api/services/firebaseConfig'

const Header = () => {
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user)
    })
    return () => unsubscribe()
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      console.log('User signed out successfully!')
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Error signing out: ', error.message)
    }
  }

  return (
    <header data-testid="header_container">
      <span data-testid="header_logo">
        <Link to="/">
          <img src={`${process.env.PUBLIC_URL}/favicon-32x32.png`} alt="Logo" />
        </Link>
      </span>
      <h1 data-testid="header_title">My Books Storage</h1>
      <div data-testid="header_login_wrapper">
        {isAuthenticated ? (
          <Link to="/" data-testid="header_login_btn" onClick={handleSignOut}>
            Sign Out
          </Link>
        ) : (
          location.pathname !== '/login' &&
          location.pathname !== '/signup' && (
            <div>
              <Link to="/login" data-testid="header_login_btn">
                Login
              </Link>
              <Link to="/signup" data-testid="header_login_btn">
                Sign Up
              </Link>
            </div>
          )
        )}
      </div>
    </header>
  )
}

export default Header
