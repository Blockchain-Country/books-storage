// BookSearchModal.js
import React from 'react'
import './SearchBookModal.css'

const BookSearchModal = ({ isOpen, onClose, book }) => {
  if (!isOpen) return null
  if (!book) return <p>No book details available</p> // Add a fallback if the book is undefined

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
        <h2>
          {book.title}
          {console.log(book)}
        </h2>
        <div>
          {/* Check if the book has an image before rendering */}
          {book.image ? (
            <img src={book.image} alt={`${book.title} cover`} />
          ) : (
            'No image available'
          )}
        </div>
        <p>
          <strong>Author:</strong> {book.authors}
        </p>
        <p>
          <strong>Published Year:</strong> {book.publishedDate}
        </p>
        <p>
          <strong>Description:</strong>{' '}
          {book.description || 'No description available'}
        </p>
      </div>
    </div>
  )
}

export default BookSearchModal
