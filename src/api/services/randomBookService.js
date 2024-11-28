import { fetchClient } from '../clients/fetchClient'

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes'
const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY
const cache = {}

export async function randomBookService() {
  if (!apiKey) {
    console.error(
      'API key is missing. Please check your environment variables.'
    )
    throw new Error('API key is missing.')
  }

  const cacheKey = 'bestsellers'
  if (cache[cacheKey]) {
    console.log('Using cached data')
    return cache[cacheKey]
  }

  const url = `${BASE_URL}?q=bestsellers&orderBy=relevance&maxResults=2&langRestrict=en&key=${apiKey}`

  try {
    const data = await fetchClient(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (data.items?.length) {
      const enhancedBooks = await Promise.all(
        data.items.map(async (item) => {
          const selfLink = item.selfLink

          console.log('Fetching book details from selfLink:', selfLink)

          const bookDetails = await fetchClient(selfLink, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          })

          const vi = bookDetails.volumeInfo || {}
          const bestImage =
            vi.imageLinks.extraLarge ||
            vi.imageLinks.large ||
            vi.imageLinks.medium ||
            vi.imageLinks.small ||
            vi.imageLinks.thumbnail ||
            null

          return {
            title: vi.title,
            image: bestImage,
            authors: vi.authors?.join(', ') || 'Unknown Author',
            publishedDate: vi.publishedDate,
            language: vi.language,
            description: vi.description,
            bookId: bookDetails.id,
          }
        })
      )
      cache[cacheKey] = enhancedBooks
      return enhancedBooks
    }

    return null
  } catch (error) {
    console.error(`Error in randomBookService: ${error.message}`)
    throw new Error('Failed to fetch books. Please try again later.')
  }
}
