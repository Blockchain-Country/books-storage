import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiLoader2Line } from 'react-icons/ri'
import RandomBookModal from './randomBookModal/RandomBookModal'
import {
  selectRandomBooks,
  selectIsLoading,
  getRandomBooks,
} from '../../redux/slices/randomBooksSlice'
import './RandomBookSection.css'

const RandomBookSection = ({ 'data-testid': testId }) => {
  const dispatch = useDispatch()
  const randomBooks = useSelector(selectRandomBooks)
  const isLoading = useSelector(selectIsLoading)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalBook, setModalBook] = useState(null)

  useEffect(() => {
    dispatch(getRandomBooks())
  }, [dispatch])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        randomBooks.length > 0 ? (prevIndex + 1) % randomBooks.length : 0
      )
    }, 7000)

    return () => clearInterval(intervalId)
  }, [randomBooks])

  const handleOpenBookModal = () => {
    setModalBook(randomBooks[currentImageIndex])
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalBook(null)
    setIsModalOpen(false)
  }

  return (
    <section data-testid={testId}>
      {isLoading ? (
        <RiLoader2Line data-testid="loading_spinner" />
      ) : (
        <>
          {randomBooks.length > 0 && (
            <img
              src={randomBooks[currentImageIndex]?.image || ''}
              alt={randomBooks[currentImageIndex]?.title || 'No book available'}
              aria-label="Click to see book details"
              onClick={handleOpenBookModal}
              data-testid="random_book_img"
            />
          )}
          {isModalOpen && modalBook && (
            <RandomBookModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              modalBook={modalBook}
            ></RandomBookModal>
          )}
        </>
      )}
    </section>
  )
}

export default RandomBookSection
