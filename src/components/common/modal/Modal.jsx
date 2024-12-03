import Button from '../button/Button'
import './Modal.css'

const Modal = ({ isOpen, onClose, 'data-testid': testId, children }) => {
  if (!isOpen) return null

  return (
    <div data-testid="modal_overlay">
      <div open={isOpen} data-testid="modal_component">
        <div data-testid="modal_header">
          <Button
            text="Close"
            data-testid="modal_close_btn"
            onClick={onClose}
          ></Button>
        </div>
        <div data-testid={testId}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
