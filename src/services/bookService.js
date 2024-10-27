export async function searchBookOnGoogle(query) {
  const apiKey = 'AIzaSyDWiAOofxvQsay-8FX1p_dRnBA2jc6m7EM' // Replace with your Google Books API key
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query
  )}&key=${apiKey}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (data.items && data.items.length > 0) {
      console.log(data)
      return data.items.map((item) => ({
        title: item.volumeInfo.title,
        image: item.volumeInfo.imageLinks.thumbnail,
        authors: item.volumeInfo.authors
          ? item.volumeInfo.authors.join(', ')
          : 'Unknown Author',
        publishedDate: item.volumeInfo.publishedDate,
        language: item.volumeInfo.language,
        description: item.volumeInfo.description,
      }))
    } else {
      return []
    }
  } catch (error) {
    console.error('Error searching for books:', error)
    throw error // Throw the error so it can be handled by Redux
  }
}

// Example usage
// searchBookOnGoogle('rich dad').then((books) => {
//   console.log('Search results:', books[0])
// })
