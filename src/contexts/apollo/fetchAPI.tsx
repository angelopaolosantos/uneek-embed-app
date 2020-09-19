export async function fetchAPI(query, { variables = {} } = {}) {
    const API_URL = `${process.env.NEXT_PUBLIC_UNEEK_DOMAIN}/api/graphql`
    const API_TOKEN = "" // provide token if required
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

    //console.log("from fetchAPI:", res)
  
    const json = await res.json()
    if (json.errors) {
      const errorMessages = {messages: json.errors, error: true}
      
      console.error(errorMessages)
      // throw new Error('Failed to fetch API')
      return errorMessages
    }
    return json.data
  }