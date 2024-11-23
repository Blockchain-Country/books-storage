import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const location = useLocation()

  return (
    <header data-testid="header_container">
      <span data-testid="header_logo">
        <Link to="/">
          <img src={`${process.env.PUBLIC_URL}/favicon-32x32.png`} alt="Logo" />
        </Link>
      </span>
      <h1 data-testid="header_title">My Books Storage</h1>
      <div data-testid="header_login_wrapper">
        {location.pathname !== '/login' && (
          <Link to="/login" data-testid="header_login_btn">
            <span>Login</span>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
