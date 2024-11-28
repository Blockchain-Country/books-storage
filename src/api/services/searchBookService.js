import { fetchClient } from '../clients/fetchClient'

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes'
const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY

export async function searchBookService(query) {
  if (!apiKey) {
    console.error(
      'API key is missing. Please check your environment variables.'
    )
    throw new Error('API key is missing.')
  }

  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&key=${apiKey}`

  try {
    const data = await fetchClient(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (data.items?.length > 0) {
      return data.items.map((item) => ({
        title: item.volumeInfo.title,
        image: item.volumeInfo.imageLinks?.thumbnail,
        authors: item.volumeInfo.authors?.join(', ') || 'Unknown Author',
        publishedDate: item.volumeInfo.publishedDate,
        language: item.volumeInfo.language,
        description: item.volumeInfo.description,
        bookId: item.id,
      }))
    } else {
      return []
    }
  } catch (error) {
    console.error(`Error in searchBookService: ${error.message}`)
    throw new Error('Failed to fetch books. Please try again later.')
  }
}
