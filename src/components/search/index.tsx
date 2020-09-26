import SearchForm from './SearchForm'
import SearchResults from './SearchResults'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import queryString from 'query-string' // https://www.npmjs.com/package/query-string
import { fetchAPI } from '../../contexts/apollo/fetchAPI'

const Search = () => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [limit] = useState(9)
  const [result, setResult] = useState(null)

  const router = useRouter()

  useEffect(() => {
    const { keywords, page } = queryString.parse(router.asPath.substring(7))
    setSearch(keywords)
    setCurrentPage(parseInt(page))
  }, [])

  useEffect(() => {
    if (search && search.length > 3) {
      const QUERY = `
              query SearchProducts($search: String, $limit: Int, $page: Int) {
                productPage(search: $search, limit: $limit, page: $page) {
                  products {
                    sku
                    name
                    price
                    images
                  }
                  count
                }
              }
            `
            fetchAPI(QUERY, { variables: { search, limit, page: currentPage} }).then(
                (data)=>{
                    setResult(data.productPage)
                }
            ).catch((err) => {

            })
    }
  }, [search, currentPage])

  console.log("result:", result)

  return (
    <div className="search-container">
      <h1>Search Product</h1>
      <SearchForm
        search={search}
        setSearch={setSearch}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <SearchResults
        result={result}
        search={search}
        currentPage={currentPage}
        limit={limit}
        setCurrentPage={setCurrentPage}
      />
      <style jsx>
        {`
          .search-container {
            max-width: 998px;
            margin: 25px auto;
            padding: 10px;
          }
        `}
      </style>
    </div>
  )
}

export default Search
