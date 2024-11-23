import { ToastContainer, toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { clearError, selectErrorSlice } from '../../redux/slices/errorSlice'
import 'react-toastify/dist/ReactToastify.css'

const Error = () => {
  const errorMessage = useSelector(selectErrorSlice)
  const dispatch = useDispatch()

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(clearError())
    }
  }, [errorMessage, dispatch])

  return <ToastContainer position="top-right" autoClose={2000} />
}

export default Error
