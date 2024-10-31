export async function searchBookOnGoogle(query) {
  const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query
  )}&key=${apiKey}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (data.items && data.items.length > 0) {
      return data.items.map((item) => ({
        title: item.volumeInfo.title,
        image: item.volumeInfo.imageLinks?.thumbnail,
        authors: item.volumeInfo.authors
          ? item.volumeInfo.authors.join(', ')
          : 'Unknown Author',
        publishedDate: item.volumeInfo.publishedDate,
        language: item.volumeInfo.language,
        description: item.volumeInfo.description,
        bookId: item.id,
      }))
    } else {
      return []
    }
  } catch (error) {
    console.error('Error searching for books:', error)
    throw error
  }
}
