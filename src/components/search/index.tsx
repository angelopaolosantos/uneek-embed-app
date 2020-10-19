import SearchForm from './SearchForm'
import SearchResults from './SearchResults'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import queryString from 'query-string' // https://www.npmjs.com/package/query-string
import { fetchAPI } from '../../contexts/apollo/fetchAPI'
import { SelectPicker } from 'rsuite'

const Search = () => {
  const [search, setSearch] = useState<String | String[] | undefined>("")
  const [currentPage, setCurrentPage] = useState<Number>(1)
  const [result, setResult] = useState(null)

  const [limit, setLimit] = useState(18)
  const [sort, setSort] = useState(null)

  const router = useRouter()

  console.log(search)

  useEffect(() => {
    const query = queryString.parse(
      router.asPath.substring(7)
    )

    const {keywords, page} = query
    const querySort = query.sort
    const queryLimit = query.limit

    if (keywords) setSearch(keywords)
    if (page && typeof page == "string") {
      setCurrentPage(parseInt(page) ? 1 : parseInt(page))
    }
    if (querySort && typeof querySort == "string") {
      setSort(parseInt(querySort) ? null : parseInt(querySort))
    }
    if (queryLimit && typeof queryLimit == "string") {
      setLimit(parseInt(queryLimit) ? 18 : parseInt(queryLimit))
    }
  }, [])
  

  useEffect(()=> {
    console.log("initial search:", search)
    if (search && search.length > 3) {
      console.log("initial searching:", search)
      const QUERY = `
              query SearchProducts($search: String, $limit: Int, $page: Int, $sort: Int) {
                productPage(search: $search, limit: $limit, page: $page, sort: $sort) {
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
      fetchAPI(QUERY, { variables: { search, limit, page: currentPage, sort } })
        .then((data) => {
          setResult(data.productPage)
        })
        .catch((err) => {})
    }
  }, [])

  useEffect(() => {
    if (search && search.length > 3) {
      const QUERY = `
              query SearchProducts($search: String, $limit: Int, $page: Int, $sort: Int) {
                productPage(search: $search, limit: $limit, page: $page, sort: $sort) {
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
      fetchAPI(QUERY, { variables: { search, limit, page: currentPage, sort } })
        .then((data) => {
          setResult(data.productPage)
        })
        .catch((err) => {})
    }
  }, [search, currentPage, limit, sort])

  const onProductsPerPageChange = (value) => {
    setLimit(value)
  }

  const onSortChange = (value) => {
    setSort(value)
  }

  const productsPerPageData = [
    {
      label: '36',
      value: 36,
    },
    {
      label: '27',
      value: 27,
    },
    {
      label: '18',
      value: 18,
    },
    {
      label: 9,
      value: 9,
    },
  ]

  const sortData = [
    {
      label: 'price: lowest to highest',
      value: 1,
    },
    {
      label: 'price: highest to lowest',
      value: 2,
    },
  ]

  return (
    <div className="search-container">
      <h1>Search Product</h1>
      <SearchForm
        search={search}
        setSearch={setSearch}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      {result?.products.length > 0 && (
        <div className="filter-selection">
          Sort by&nbsp;
          <SelectPicker
            data={sortData}
            searchable={false}
            size="xs"
            cleanable={true}
            onChange={onSortChange}
          />
          &nbsp; |&nbsp; Products per page&nbsp;
          <SelectPicker
            data={productsPerPageData}
            searchable={false}
            size="xs"
            defaultValue={limit}
            cleanable={false}
            onChange={onProductsPerPageChange}
          />
        </div>
      )}
      <SearchResults
        result={result}
        search={search}
        currentPage={currentPage}
        limit={limit}
        setCurrentPage={setCurrentPage}
      />
      <style jsx>
        {`
          .filter-selection {
            margin: 1em;
          }
          .search-container {
            max-width: 998px;
            margin: 25px auto;
            padding: 10px;
          }
          .search-container h1 {
            font-size: 2.5em;
            text-align: center;
          }

          @media only screen and (max-width: 600px) {
            .search-container h1 {
              font-size: 2em;
            }
          }
        `}
      </style>
    </div>
  )
}

export default Search
