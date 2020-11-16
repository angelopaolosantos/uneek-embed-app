import Head from 'next/head'
import Template from '../components/templates/default'
import { fetchAPI } from '../contexts/apollo/fetchAPI'
import Link from 'next/link'
import { Button, Divider } from 'rsuite'
import ReactHtmlParser from 'react-html-parser'
import { formatNumber } from '../utils/uneek-utilities'

const Home = ({ query, result }) => {
  const popularProducts = result.products

  const productsHtml = () => {
    if (popularProducts) {
      return popularProducts.map((product) => {
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

  return (
    <Template partnerKey={query.partner_key}>
      <Head>
        <meta name="description" content="Description"></meta>
        <meta name="keywords" content="Keywords"></meta>
        <title>Uneek Jewelry</title>
      </Head>
      <main>
        <section className="uneek-section">
          <div className="section1">
            <div className="uneek-section-content">
              <h1>One Of A Kind</h1>
              <p>Uneeks Signature Line</p>
              <Link href="/categories/one-of-a-kind">
                <button>Explore</button>
              </Link>
            </div>
          </div>
        </section>
        <section className="uneek-section">
          <div className="section2">
            <div className="uneek-section-content">
              <h1>Engagement Rings</h1>
              <p>Finding a perfect, made-for-you engagement ring is simple.</p>
              <Link href="/categories/engagement-rings">
                <button>Explore</button>
              </Link>
            </div>
          </div>
        </section>
        <section className="uneek-section">
          <div className="section3">
            <div className="uneek-section-content">
              <h1>Fashion Jewelry</h1>
              <p>
                We promise to provide personalized experiences and hand-crafted,
                stunning jewelry every time.
              </p>
              <Link href="/categories/fine-jewelry">
                <button>Explore</button>
              </Link>
            </div>
          </div>
        </section>
        <section className="popular-items-section">
          <h1>Browse by Style</h1>
          <div className="popular-styles">
            <div>
              <Link href="/categories/engagement-rings/halo">
                <a>
                  <img src="https://uneek-web-assets.s3.us-west-1.amazonaws.com/uneek-embed/images/650/sws232dhds-7x5em_1603323777949.webp" />
                </a>
              </Link>
              <Link href="/categories/engagement-rings/halo">
                <a>
                  <h6>Halo</h6>
                </a>
              </Link>
            </div>
            <div>
              <Link href="/categories/engagement-rings/classic">
                <a>
                  <img src="https://uneek-web-assets.s3.us-west-1.amazonaws.com/uneek-embed/images/650/swus020cw-6.5rd_1603325622446.webp" />
                </a>
              </Link>
              <Link href="/categories/engagement-rings/classic">
                <a>
                  <h6>Classic</h6>
                </a>
              </Link>
            </div>
            <div>
              <Link href="/categories/engagement-rings/three-stone">
                <a>
                  <img src="https://uneek-web-assets.s3.us-west-1.amazonaws.com/uneek-embed/images/650/LVS983RAD_1603319910985.webp" />
                </a>
              </Link>
              <Link href="/categories/engagement-rings/three-stone">
                <a>
                  <h6>Three Stone</h6>
                </a>
              </Link>
            </div>
            <div>
              <Link href="/categories/engagement-rings/solitaire">
                <a>
                  <img src="https://uneek-web-assets.s3.us-west-1.amazonaws.com/uneek-embed/images/650/sws118_1603325567670.webp" />
                </a>
              </Link>
              <Link href="/categories/engagement-rings/solitaire">
                <a>
                  <h6>Solitaire</h6>
                </a>
              </Link>
            </div>
          </div>
        </section>
        <section className="popular-items-section">
          <h1>Popular Items</h1>
          <div className="popular-items">{productsHtml()} </div>
        </section>
        <Divider></Divider>
        <section className="about-section">
          <div className="about-image">
            <img src="/images/About-Uneek.webp" width={250} />
          </div>
          <div className="about-content">
            <h1>About Uneek</h1>
            <p>
              Uneek Jewelry, a Los Angeles-based brand founded by Benjamin
              Javaheri, the most awarded jewelry designer in the industry,
              blends the bold spirit of contemporary American culture with the
              delicacy and detail born of old-world metalsmithing and
              stone-setting disciplines.
            </p>
            <Link href="/about-us">
              <Button>Read More</Button>
            </Link>
          </div>
        </section>
        <section>
          <iframe
            src="//lightwidget.com/widgets/066a4dd31ad05860bff70365f33f424b.html"
            scrolling="no"
            className="lightwidget-widget"
          ></iframe>
        </section>
      </main>
      <style jsx>
        {`
          .lightwidget-widget {
            width: 100%;
            border: 0;
            overflow: hidden;
          }
          .about-section {
            max-width: 900px;
            margin: 15px auto;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .about-section > div {
            padding: 15px;
          }

          .popular-styles {
            display: grid;
            grid-template-columns: 25% 25% 25% 25%;
          }

          .popular-styles div {
            padding: 35px;
          }

          .popular-styles img {
            width: 100%;
            height: auto;
          }
          .popular-items-section {
            max-width: 992px;
            margin: 1rem auto;
            text-align: center;
          }
          .popular-items {
            display: grid;
            grid-template-columns: auto auto auto auto;
          }
          .uneek-section {
            margin: 15px auto;
            max-width: 1200px;
          }
          .uneek-section > div {
            height: 500px;
            background-color: #d2d2d2; /* Used if the image is unavailable */
            background-repeat: no-repeat; /* Do not repeat the image */
            background-size: cover; /* Resize the background image to cover the entire container */
            padding: 25px;
          }
          .uneek-section-content {
            max-width: 450px;
          }
          .uneek-section-content p {
            color: #fff;
            margin: 5px;
          }
          .uneek-section-content h1 {
            color: #fff;
            margin: 0;
            padding: 0;
            text-transform: uppercase;
            font-size: 2.5em;
            line-height: 1em;
          }
          .uneek-section-content button {
            border: 2px solid #fff;
            color: #fff;
            padding: 5px;
            text-transform: uppercase;
            background-color: Transparent;
            cursor: pointer;
            overflow: hidden;
            outline: none;
            width: 250px;
          }
          .uneek-section-content button:hover {
            background-color: #fff;
            color: #000;
          }
          .uneek-category img {
            width: 100%;
            height: auto;
          }
          .section1 {
            background: url('/images/Uneek-Home-5.webp');
            background-position: center;
            justify-content: flex-end;
            align-items: center;
            display: flex;
          }
          .section2 {
            background: url('/images/Uneek-Home-4.webp');
            background-position: right center;
            justify-content: flex-start;
            align-items: center;
            display: flex;
          }
          .section3 {
            background: url('/images/Uneek-Home-6.webp');
            background-position: left center;
            justify-content: flex-end;
            align-items: center;
            display: flex;
          }
          @media only screen and (max-width: 600px) {
            .about-section {
              display: flex;
              flex-direction: column;
            }

            .popular-items {
              display: grid;
              grid-template-columns: auto auto;
            }

            .popular-styles {
              display: grid;
              grid-template-columns: auto auto;
          }
          }
        `}
      </style>
    </Template>
  )
}

export default Home

export async function getServerSideProps({ query }) {
  const QUERY = `
        query GetProducts($filter: ProductInput) {
          products(filter: $filter) {
            sku
              name
              description
              price
              primary_image
          }
        }`

  const result = await fetchAPI(QUERY, {
    variables: { filter: { category: '/popular' } },
  })

  return { props: { query, result } }
}
