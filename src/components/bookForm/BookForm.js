import './BookForm.css'

const BookForm = () => {
  return (
    <div className="app-block book-form">
      <h2>BookForm</h2>
      <form className="book-form">
        <div>
          <label>Title:</label>
          <input type="text" placeholder="Enter book title..."></input>
        </div>
        <div>
          <label>Author: </label>
          <input type="text" placeholder="Enter book author..."></input>
        </div>
        <button type="submit">Add book</button>
      </form>
    </div>
  )
}

export default BookForm
