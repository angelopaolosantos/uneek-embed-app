export async function fetchAPI(query, { variables = {} } = {}) {
    const API_URL = `http://localhost:3000/api/graphql`
    const API_TOKEN = ""
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    console.log(res)
  
    const json = await res.json()
    if (json.errors) {
      console.error(json.errors)
      // throw new Error('Failed to fetch API')
      return null
    }
    return json.data
  }