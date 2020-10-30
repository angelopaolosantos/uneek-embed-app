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

const paginate = (array, page_size, page_number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size)
}

const Page = ({ result, query }) => {
  const router = useRouter()
  const [sort, setSort] = useState<number | null>(
    query.sort ? parseInt(query.sort) : null
  )
  const [productsPerPage, setProductsPerPage] = useState(
    query.perpage ? parseInt(query.perpage) : 18
  )
  const [activePage, setActivePage] = useState<number>(
    query.page ? parseInt(query.page) : 1
  )

  const [products, setProducts] = useState([])
  const [pages, setPages] = useState<number>(0)
  const [showProducts, setShowProducts] = useState([])
  const [category, setCategory] = useState('')

  useEffect(() => {
    if (result.categories.length == 0) {
      router.push('/404')
    } else {
      let products = result.categories[0].products

      if (sort) {
        let sortedProducts = [...products] // create a copy of current products
        switch (sort) {
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
            sortedProducts = result.categories[0].products
          }
        }

        setProducts(sortedProducts)
        setShowProducts(paginate(sortedProducts, productsPerPage, 1))
      }else {
        setProducts(products)
        setShowProducts(paginate(products, productsPerPage, 1))
      }

      setCategory(result.categories[0].name)
      setPages(Math.ceil(products.length / productsPerPage))
      setActivePage(1)
    }
  }, [result])

  /** on changing products shown per page */

  const onProductsPerPageChange = (value) => {
    setProductsPerPage(value)
    setPages(Math.ceil(products.length / value))
    setActivePage(1)
    setShowProducts(paginate(products, value, 1))

    const asURL = `${query.category.join('/')}?page=1&perpage=${value}&sort=${sort}`
    router.push(`?page=1&perpage=${value}&sort=${sort}`, asURL, { shallow: true })
  }

  /** on changing sorting order */

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
        sortedProducts = result.categories[0].products
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

  /** on changing page number */

  const onPageChange = (pageNumber) => {
    setActivePage(pageNumber)
    setShowProducts(paginate(products, productsPerPage, pageNumber))

    const asURL = `${query.category.join('/')}?page=${pageNumber}&perpage=${productsPerPage}&sort=${sort}`
    router.push(`?page=${pageNumber}&perpage=${productsPerPage}&sort=${sort}`, asURL, { shallow: true })
    if (process.browser) {
      console.log(window)
      window.scrollTo(0, 0)
    }
  }

  /** -------------- HTML ------------------ */
  const productsHtml = () => {
    if (showProducts.length > 0) {
      return showProducts.map((product) => {
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

  console.log(sort)

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
              defaultValue={sort}
              onChange={onSortChange}
              cleanable={true}
            />
            &nbsp;|&nbsp; Products per page&nbsp;
            <SelectPicker
              {...selectPickerProps}
              data={productsPerPageData}
              value={productsPerPage}
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
