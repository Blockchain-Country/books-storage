import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { clearAlert, selectAlertSlice } from '../../redux/slices/alertSlice'
import 'react-toastify/dist/ReactToastify.css'

const Alert = () => {
  const dispatch = useDispatch()
  const alertMessage = useSelector(selectAlertSlice)

  useEffect(() => {
    if (alertMessage?.trim()) {
      toast.info(alertMessage, {
        onClose: () => dispatch(clearAlert()),
      })
    }
  }, [alertMessage, dispatch])

  return (
    <ToastContainer
      postion="top-right"
      autoClose={2000}
      bodyClassName="toast-message"
    />
  )
}

export default Alert
