import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { clearError, selectErrorSlice } from '../../redux/slices/errorSlice'
import './ToastStyles.css'
import 'react-toastify/dist/ReactToastify.css'

const Error = () => {
  const dispatch = useDispatch()
  const errorMessage = useSelector(selectErrorSlice)

  useEffect(() => {
    if (errorMessage?.trim()) {
      toast.error(errorMessage, {
        onClose: () => dispatch(clearError()),
      })
    }
  }, [errorMessage, dispatch])

  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      bodyClassName="toast-message"
    />
  )
}

export default Error
