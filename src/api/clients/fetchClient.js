export async function fetchClient(url, options = {}) {
  const sanitizedUrl = url.replace(/key=[^&]+/, 'key=***')

  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(
        `HTTP error! Status: ${response.status} (${response.statusText}) for URL: ${sanitizedUrl}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error(
      `Fetch error for URL: ${sanitizedUrl}, Message: ${error.message}`
    )
    throw new Error('Failed to fetch data. Please try again later.')
  }
}
