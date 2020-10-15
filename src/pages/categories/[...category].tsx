import Head from 'next/head'
import Template from '../../components/templates/default'
import { fetchAPI } from '../../contexts/apollo/fetchAPI'
import { useEffect, useState } from 'react'
import { Pagination } from 'rsuite'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'
import { SelectPicker } from 'rsuite'

const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const paginate = (array, page_size, page_number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size)
}

const Page = ({ result, query }) => {
  const router = useRouter()
  const category = result.categories[0]

  /** If Category doesn't exist redirect to 404 */
  useEffect(() => {
    if(!category) {
      router.push('/404')
    }
  }, [])
  
  /** Set State Variables */
  const [products, setProducts] = useState(category?.products ? category.products : null)
  const [sort, setSort] = useState(query.sort ? parseInt(query.sort) : null)
  const [productsPerPage, setProductsPerPage] = useState(
    query.perpage ? parseInt(query.perpage) : 18
  )
  const [totalPages, setTotalPages] = useState(
    products?.length ? Math.ceil(products.length / productsPerPage) : 0
  )
  const [activePage, setActivePage] = useState(
    query.page ? parseInt(query.page) : 1
  )
  const [pages, setPages] = useState(totalPages)
  const [showProducts, setShowProducts] = useState(
    products ? paginate(products, productsPerPage, activePage) : null
  )

  const onProductsPerPageChange = (value) => {
    setProductsPerPage(value)
    setTotalPages(Math.ceil(products.length / value))
    setPages(Math.ceil(products.length / value))
    setActivePage(1)
    setShowProducts(paginate(products, value, 1))

    const asURL = `${query.category.join('/')}?page=1&perpage=${value}`
    router.push(`?page=1&perpage=${value}`, asURL, { shallow: true })
  }

  const onSortChange = (value) => {
    let sortedProducts = [...products] // create a copy of current products
    switch (value) {
      case 1: {
        sortedProducts.sort((a, b) => (a.price > b.price ? 1 : -1))
        console.log('sort 1')
        break
      }
      case 2: {
        sortedProducts.sort((a, b) => (a.price < b.price ? 1 : -1))
        console.log('sort 2')
        break
      }
      default: {
        console.log('sort null')
        sortedProducts = category.products
      }
    }

    setProducts(sortedProducts)
    setSort(value)

    setActivePage(1)
    setShowProducts(paginate(sortedProducts, productsPerPage, 1))

    const asURL = `${query.category.join(
      '/'
    )}?page=${activePage}&perpage=${productsPerPage}&sort=${value}`
    router.push(
      `?page=${activePage}&perpage=${productsPerPage}&sort=${value}`,
      asURL,
      { shallow: true }
    )
  }

  const onPageChange = (pageNumber) => {
    setActivePage(pageNumber)
    setShowProducts(paginate(products, productsPerPage, pageNumber))

    const asURL = `${query.category.join('/')}?page=${pageNumber}`
    router.push(`?page=${pageNumber}`, asURL, { shallow: true })
    if (process.browser) {
      console.log(window)
      window.scrollTo(0, 0)
    }
  }

  let pageTitle = ''
  // let parent = ''
  if (result.categories && result.categories.length > 0) {
    pageTitle = category.name
    // parent = category.parent
  }

  const productsHtml = () => {
    if (showProducts) {
      return showProducts.map((product) => {
        return (
          <div key={product.sku} className="product">
            <div className="product-img">
              <Link href={`/products/${product.sku}`}>
                <a><img className="responsive" src={product.primary_image} /></a>
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
                  font-size: 1.0em;
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

  const selectPickerProps = {
    searchable:false,
    size:"xs",
  }

  return (
    <Template>
      <Head>
        <title>Uneek Jewelry - {pageTitle}</title>
      </Head>
      <main className="main-container">
        <h1>{pageTitle}</h1>
        {products?.length > 0 && (
          <div className="filter-selection">
            Sort by&nbsp;
            <SelectPicker {...selectPickerProps}
              data={sortData}
              defaultValue={sort}
              onChange={onSortChange}
              cleanable={true}
            />
            &nbsp;|&nbsp; Products per page&nbsp;
            <SelectPicker
              {...selectPickerProps}
              data={productsPerPageData}
              defaultValue={productsPerPage}
              onChange={onProductsPerPageChange}
              cleanable={false}
            />
          </div>
        )}
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
          .filter-selection {
            margin: 1em;
          }
          .main-container {
            max-width: 992px;
            margin: 1rem auto;
            text-align: center;
          }

          .main-container h1{
            font-size: 2.5em;
          }
          .products-container {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
          }

          @media only screen and (max-width: 600px) {
            .products-container {
              grid-template-columns: auto auto;
            }

            .main-container h1{
            font-size: 2.0em;
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
        query GetCategories($filter1: CategoryInput) {
          categories(filter: $filter1) {
            name
            parent
            category
            products {
              sku
              name
              description
              price
              primary_image
            }
          }
        }`

  const result = await fetchAPI(QUERY, {
    variables: { filter1: { category } },
  })

  return {
    props: {
      result,
      query,
    }, // will be passed to the page component as props
  }
}
