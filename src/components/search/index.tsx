import SearchForm from './SearchForm'
import SearchResults from './SearchResults'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import queryString from 'query-string' // https://www.npmjs.com/package/query-string

const Search = () => {
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(9)

    const router = useRouter()

    const { keywords, page } = queryString.parse(router.asPath.substring(7))

    useEffect(()=>{
        setSearch(keywords)
        setCurrentPage(parseInt(page))
    },[])

    return (
        <div className="search-container">
            <h1>Search Product</h1>
            <SearchForm search={search} setSearch={setSearch} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            <SearchResults search={search} currentPage={currentPage} limit={limit} setCurrentPage={setCurrentPage} />
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