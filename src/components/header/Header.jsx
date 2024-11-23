import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const location = useLocation()

  return (
    <header className="header-container" data-testid="header_container">
      <span className="header-logo" data-testid="header_logo">
        <Link to="/">
          <img src={`${process.env.PUBLIC_URL}/favicon-32x32.png`} alt="Logo" />
        </Link>
      </span>
      <h1 className="header-title" data-testid="header_title">
        My Books Storage
      </h1>
      <div className="header-login" data-testid="header_login">
        {location.pathname !== '/login' && (
          <Link to="/login" className="login-btn" data-testid="login_btn">
            <span>Login</span>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
