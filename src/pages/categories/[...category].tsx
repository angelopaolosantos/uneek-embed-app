import Head from 'next/head'
import Template from '../../components/templates/default'
import { fetchAPI } from '../../contexts/apollo/fetchAPI'
import { useEffect, useState } from 'react'
import { Pagination } from 'rsuite'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'
import { SelectPicker } from 'rsuite'
import { formatNumber } from '../../utils/uneek-utilities'

const sortProducts = (products, value) => {
  // Define sort functions here.
  let sortedProducts = [...products] // create a copy of current products
      switch (value) {
        case 1: {
          sortedProducts.sort((a, b) => (a.price > b.price ? 1 : -1))
          console.log('sort by price: lowest to highest')
          break
        }
        case 2: {
          sortedProducts.sort((a, b) => (a.price < b.price ? 1 : -1))
          console.log('sort by price: highest to lowest')
          break
        }
        default: {
          console.log('no sorting')
        }
      }
  return sortedProducts
}

const paginate = (array, page_size, page_number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size)
}

const Page = ({ result, query }) => {
  const router = useRouter()

  const [pageFilter, setPageFilter] = useState(
    { sortBy: null, productsPerPage: 18, activePage: 1}
  )
  const [products, setProducts] = useState(result?.categories[0]?.products)
  const [pages, setPages] = useState<number>(0)
  const [productsOnActivePage, setProductsOnActivePage] = useState([])
  const [category, setCategory] = useState('')

  useEffect(() => {
    if (result?.categories?.length == undefined || result?.categories?.length == 0 ) {
      router.push('/404')
    } else {
      let sortedProducts = sortProducts([...result.categories[0].products],pageFilter.sortBy)
      setProducts(sortedProducts)
      setProductsOnActivePage(paginate(sortedProducts, pageFilter.productsPerPage, 1))

      setCategory(result.categories[0].name)
      setPages(Math.ceil(products.length / pageFilter.productsPerPage))
      setPageFilter({...pageFilter, activePage: 1})
    }
  }, [result])

  /** on changing products shown per page */

  const onProductsPerPageChange = (value) => {
    setPageFilter({...pageFilter, activePage: 1, productsPerPage: value})
    setPages(Math.ceil(products.length / value))
    setProductsOnActivePage(paginate(products, value, 1))

    const asURL = `${query.category.join('/')}?page=1&perpage=${value}&sort=${pageFilter.sortBy}`
    router.push(`?page=1&perpage=${value}&sort=${pageFilter.sortBy}`, asURL, { shallow: true })
  }

  /** on changing sorting order */
  const onSortChange = (value) => {
    let sortedProducts = sortProducts([...result.categories[0].products], value)
    setProducts(sortedProducts)
    setPageFilter({...pageFilter, sortBy: value, activePage: 1})
    setProductsOnActivePage(paginate(sortedProducts, pageFilter.productsPerPage, 1))

    const asURL = `${query.category.join(
      '/'
    )}?page=${pageFilter.activePage}&perpage=${pageFilter.productsPerPage}&sort=${value}`
    router.push(
      `?page=${pageFilter.activePage}&perpage=${pageFilter.productsPerPage}&sort=${value}`,
      asURL,
      { shallow: true }
    )
  }

  /** on changing page number */

  const onPageChange = (pageNumber) => {
    setPageFilter({...pageFilter, activePage: pageNumber})
    setProductsOnActivePage(paginate(products, pageFilter.productsPerPage, pageNumber))

    const asURL = `${query.category.join('/')}?page=${pageNumber}&perpage=${pageFilter.productsPerPage}&sort=${pageFilter.sortBy}`
    router.push(`?page=${pageNumber}&perpage=${pageFilter.productsPerPage}&sort=${pageFilter.sortBy}`, asURL, { shallow: true })
    if (process.browser) {
      console.log(window)
      window.scrollTo(0, 0)
    }
  }

  /** -------------- HTML ------------------ */
  const productsHtml = () => {
    if (productsOnActivePage.length > 0) {
      return productsOnActivePage.map((product) => {
        return (
          <div key={product.sku} className="product">
            <div className="product-img">
              <Link href={`/products/${product.sku}`}>
                <a>
                  <img className="responsive" src={product.primary_image} />
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
                  transition: all 0.5s;
                }

                .product:hover {
                  border: 1px solid #d2d2d2;
                  transform: translateY(-10px);
                  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
                    0 6px 20px 0 rgba(0, 0, 0, 0.19);
                }

                .responsive {
                  width: 100%;
                  height: auto;
                }

                .product-name {
                  font-size: 1em;
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
    searchable: false,
    size: 'xs',
  }

  return (
    <Template>
      <Head>
        <title>Uneek Jewelry - {category}</title>
      </Head>
      <main className="section-container">
        <h1>{category}</h1>
        {products?.length > 0 && (
          <div className="filter-selection">
            Sort by&nbsp;
            <SelectPicker
              {...selectPickerProps}
              data={sortData}
              defaultValue={pageFilter.sortBy}
              onChange={onSortChange}
              cleanable={true}
            />
            &nbsp;|&nbsp; Products per page&nbsp;
            <SelectPicker
              {...selectPickerProps}
              data={productsPerPageData}
              value={pageFilter.productsPerPage}
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
          activePage={pageFilter.activePage}
          onSelect={onPageChange}
          boundaryLinks={true}
        />
      </main>
      <style jsx>
        {`
          .section-container {
            text-align: center;
          }

          .filter-selection {
            margin: 1em;
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
          }
        `}
      </style>
    </Template>
  )
}

export default Page

export async function getServerSideProps({ query, res }) {
  const category = `/${query.category.join('/')}`

  const QUERY = `
        query GetCategories($filter: CategoryInput) {
          categories(filter: $filter) {
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
    variables: { filter: { category } },
  })

  return {
    props: {
      result,
      query,
    }, // will be passed to the page component as props
  }
}