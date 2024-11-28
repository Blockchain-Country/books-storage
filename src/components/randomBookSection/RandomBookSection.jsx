import { useEffect, useState } from 'react'
import { randomBookService } from '../../api/services/randomBookService'
import './RandomBookSection.css'
import RandomBookModal from './randomBookModal/RandomBookModal'

const RandomBookSection = ({ 'data-testid': testId }) => {
  const [randomBooks, setRandomBooks] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalBook, setModalBook] = useState(null)

  useEffect(() => {
    const fetchBookImages = async () => {
      const books = await randomBookService()

      if (books?.length > 0) {
        setRandomBooks(books)
        setCurrentImageIndex(0)
      }
    }

    fetchBookImages()

    // Set up an interval to change the image every 5 seconds
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

  // useEffect(() => {
  //   if (randomBooks[currentImageIndex]) {
  //     console.log('Current random book:', randomBooks[currentImageIndex])
  //   }
  //   if ((!currentImageIndex, randomBooks)) {
  //     console.log('No book loaded')
  //   }
  // }, [currentImageIndex, randomBooks])

  return (
    <section data-testid={testId}>
      <img
        src={randomBooks[currentImageIndex]?.image || ''}
        alt={randomBooks[currentImageIndex]?.title || 'No book available'}
        aria-label="Click to see book details"
        onClick={handleOpenBookModal}
        data-testid="random_book_img"
      ></img>
      {isModalOpen && modalBook && (
        <RandomBookModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          randomBook={modalBook}
        />
      )}
    </section>
  )
}

export default RandomBookSection
