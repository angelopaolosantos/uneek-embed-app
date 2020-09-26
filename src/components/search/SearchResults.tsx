import { Pagination } from 'rsuite'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ReactHtmlParser from 'react-html-parser'

const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const SearchResults = (props) => {
  const { result } = props

  if (result) {
    const listProd = result.products.map((product) => {
      return (
        <div key={product.sku} className="product">
          <div className="product-img">
            <Link href={`/products/${product.sku}`}>
              <a>
                <img src={product.images} className="responsive" />
              </a>
            </Link>
          </div>
          <div className="product-detail">
            <div className="product-name">
              <Link href={`/products/${product.sku}`}>
                <a>{ReactHtmlParser(product.name)}</a>
              </Link>
            </div>
            <div className="product-sku">{product.sku}</div>
            {product.price > 0 && (
              <div className="product_price">
                MSRP ${formatNumber(product.price)}
              </div>
            )}
          </div>
          <style jsx>
            {`
              .product {
                text-align: center;
                padding: 15px;
                margin: 5px;
              }

              .responsive {
                width: 100%;
                height: auto;
              }

              .product-name {
                font-size: 1.2em;
              }
              .product-sku {
                font-size: 0.8em;
              }
              .product-price {
                font-size: 1.2em;
              }
            `}
          </style>
        </div>
      )
    })

    const pages = Math.ceil(result.count / props.limit)

    const router = useRouter()

    const handleOnSelect = (page) => {
      props.setCurrentPage(page)
      router.push(`/search?keywords=${props.search}&page=${page}`)
    }

    return (
      <div className="container">
        <h3>{result.count} results found.</h3>
        <div className="products-block">{listProd}</div>
        <div className="pagination">
          {pages > 1 && (
            <Pagination
              prev={true}
              next={true}
              pages={pages}
              size="lg"
              maxButtons={5}
              activePage={props.currentPage}
              onSelect={handleOnSelect}
              ellipsis={true}
              boundaryLinks={true}
            />
          )}
        </div>
        <style jsx>
          {`
            .container {
              text-align: center;
              padding-top: 25px;
            }

            .products-block {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
            }

            .pagination {
              text-align: center;
            }

            @media only screen and (max-width: 600px) {
              .products-block {
                grid-template-columns: auto auto;
              }
            }
          `}
        </style>
      </div>
    )
  } else {
    const max = 3
    const min = 1
    const filename = `/images/404/Uneek_02_2020_${
      Math.floor(Math.random() * (max - min)) + min
    }.jpg`
    return (
      <div className="container">
        <img className="hero-img" src={filename} />
        <style jsx>
          {`
          .container {
            padding: 15px 0px;
          }
          .hero-img {
          width: 100%;
          height: auto;
        }
          `}
        </style>
      </div>
    )
  }
}

export default SearchResults
