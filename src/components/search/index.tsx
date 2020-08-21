import SearchForm from './SearchForm'
import SearchResults from './SearchResults'
import { useState } from 'react'

import { useRouter } from 'next/router'

import queryString from 'query-string' // https://www.npmjs.com/package/query-string


const Search = () => {
    const [keywords, setKeywords] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [countResults, setCountResults] = useState(0)
    const [limit, setLimit] = useState(9)

    const router = useRouter()

    const { filters } = queryString.parse(router.asPath.substring(7))
    console.log(filters)
    console.log(router.asPath.substring(7))

    return (
        <div className="search-container">
            <h1>Search Product</h1>
            <SearchForm keywords={keywords} setKeywords={setKeywords} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            <SearchResults keywords={keywords} currentPage={currentPage} countResults={countResults} limit={limit} setCurrentPage={setCurrentPage} />
            <style jsx>{`
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