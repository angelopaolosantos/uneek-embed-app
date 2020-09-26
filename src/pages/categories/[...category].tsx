import Head from 'next/head'
import Template from '../../components/templates/default'
import { fetchAPI } from '../../contexts/apollo/fetchAPI'
import { useState } from 'react'
import { Pagination } from 'rsuite'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'

const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const paginate = (array, page_size, page_number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size)
}

const Page = ({ result, query }) => {
  const router = useRouter()

  const products = result.products
  const productsPerPage = 9
  const totalPages = Math.ceil(products.length / productsPerPage)

  const [activePage, setActivePage] = useState(
    query.page ? parseInt(query.page) : 1
  )
  const [pages, setPages] = useState(totalPages)
  const [showProducts, setShowProducts] = useState(
    paginate(products, productsPerPage, activePage)
  )

  const onPageChange = (pageNumber) => {
    setActivePage(pageNumber)
    setShowProducts(paginate(products, productsPerPage, pageNumber))

    const asURL = `${query.category.join('/')}?page=${pageNumber}`
    router.push(`?page=${pageNumber}`, asURL, { shallow: true })
  }

  let pageTitle = ''
  let parent = ''
  if (result.categories && result.categories.length > 0) {
    pageTitle = result.categories[0].name
    parent = result.categories[0].parent
  }

  const productsHtml = () => {
    return showProducts.map((product) => {
      return (
        <div key={product.sku} className="product">
          <div className="product-img">
            <Link href={`/products/${product.sku}`}>
              <img className="responsive" src={product.primary_image} />
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
  }

  return (
    <Template>
      <Head>
        <title>Uneek Jewelry - {pageTitle}</title>
      </Head>
      <main className="main-container">
        <h1>{pageTitle}</h1>
        <div className="products-container">{productsHtml()}</div>
        <Pagination
          prev
          next
          size="lg"
          pages={pages}
          maxButtons={5}
          ellipsis={true}
          activePage={activePage}
          onSelect={onPageChange}
          boundaryLinks={true}
        />
      </main>
      <style jsx>
        {`
          .main-container {
            max-width: 992px;
            margin: 1rem auto;
            text-align: center;
          }
          .products-container {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
          }

          @media only screen and (max-width: 600px) {
              .products-container {
                grid-template-columns: auto auto;
              }
            }
        `}
      </style>
    </Template>
  )
}

export default Page

export async function getServerSideProps({ query }) {
  const category = `/${query.category.join('/')}`

  const QUERY = `
        query GetCategories($filter1: CategoryInput, $filter2: ProductInput) {
          categories(filter: $filter1) {
            name
            parent
            category
          }

          products(filter: $filter2) {
            sku
            name
            description
            price
            primary_image
          }
      }`

  const result = await fetchAPI(QUERY, {
    variables: { filter1: { category }, filter2: { category: [category] } },
  })

  return {
    props: {
      result,
      query,
    }, // will be passed to the page component as props
  }
}
