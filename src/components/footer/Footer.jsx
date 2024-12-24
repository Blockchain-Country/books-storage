import './Footer.css'

const Footer = () => {
  return (
    <footer data-testid="footer_container">
      <h2>
        <span data-testid="foote_header_text">Developed by</span>{' '}
        <a
          href="https://www.linkedin.com/in/antonishchenko"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="footer_header_name_link"
        >
          Anton Ishchenko
        </a>
      </h2>
      <nav data-testid="footer_nav_elements">
        <a
          href="https://www.linkedin.com/in/antonishchenko"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="footer_nav_element"
        >
          <img
            src="/social/linkedin.png"
            alt="LinkedIn"
            data-testid="footer_icon_linkedin"
          />
        </a>
        <a
          href="https://github.com/Blockchain-Country/books-storage"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="footer_nav_element"
        >
          <img
            src="/social/github.png"
            alt="GitHub"
            data-testid="footer_icon_github"
          />
        </a>
        <a
          href="mailto:707myemail@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="footer_nav_element"
        >
          <img
            src="/social/email.png"
            alt="Email"
            data-testid="footer_icon_email"
          />
        </a>
      </nav>
    </footer>
  )
}

export default Footer
