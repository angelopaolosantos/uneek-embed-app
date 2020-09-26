import Head from 'next/head'
import Template from '../components/templates/default'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { fetchAPI } from '../contexts/apollo/fetchAPI'
import Link from 'next/link'

const getParentUrl = () => {
  var isInIframe = parent !== window,
    parentUrl = null

  if (isInIframe) {
    parentUrl = document.referrer
  }

  return parentUrl
}

const VERIFY_ACCESS_KEY = `
  query VerifyAccessKey($key: String!) {
    verifyAccessKey(key: $key) {
      key
      url
    }
  }
`

const Home = ({ query }) => {
  const router = useRouter()

  useEffect(() => {
    const parentUrl = getParentUrl()

    if (query.partner_key) {
      // check if partner key is valid
      fetchAPI(VERIFY_ACCESS_KEY, { variables: { key: query.partner_key } })
        .then((data) => {
    
          if (data.verifyAccessKey) {
            if (data.verifyAccessKey.url == parentUrl) {
              
              // Parent Website and Retailer is authorized
              console.log("Parent Website and Retailer is authorized")
              sessionStorage.setItem('partner_key', data.verifyAccessKey.key)
            } else {
              // Parent Website and Retailer is not authorized. Block access
              console.log("Website is not authorized")
              router.push("/unauthorized")
            }
          } else {
            // Retailer not authorized
            console.log("Invalid access key")
            router.push("/unauthorized")
          }
        })
        .catch((err) => {
          console.log(err)
          // Retailer not authorized
          router.push("/unauthorized")
        })
    } else {
        // no partner key supplied, uncomment below in production
        // router.push("/unauthorized")
    }
  }, [])

  return (
    <Template>
      <Head>
        <meta name="description" content="Description"></meta>
        <meta name="keywords" content="Keywords"></meta>
        <title>Uneek Jewelry</title>
      </Head>
      <main>
        <section className="responsive-carousel" aria-label="Gallery">
          <ol className="responsive-carousel__viewport">
            <li
              id="responsive-carousel__slide1"
              className="responsive-carousel__slide"
            >
              <div className="responsive-carousel__snapper"></div>
              <div className="responsive-carousel-item responsive-carousel-image-1">
                <div className="responsive-carousel-text">
                  <h1>Inspired by tradition.</h1>
                  <h2>Exceptionally Uneek.</h2>
                  <Link href="/categories/one-of-a-kind/rings-and-bands">
                    <div className="responsive-carousel-button">SEE MORE</div>
                  </Link>
                </div>
              </div>
              <a
                href="#responsive-carousel__slide3"
                className="responsive-carousel__prev"
              >
                Go to last slide
              </a>
              <a
                href="#responsive-carousel__slide2"
                className="responsive-carousel__next"
              >
                Go to next slide
              </a>
            </li>
            <li
              id="responsive-carousel__slide2"
              className="responsive-carousel__slide"
            >
              <div className="responsive-carousel__snapper"></div>
              <div className="responsive-carousel-item responsive-carousel-image-2">
                <div className="responsive-carousel-text">
                  <h1>Meet our Best Seller.</h1>
                  <h2>The Petals Collection.</h2>
                  <Link href="/categories/engagement-rings/petals-collection">
                    <div className="responsive-carousel-button">SEE MORE</div>
                  </Link>
                </div>
              </div>
              <a
                href="#responsive-carousel__slide1"
                className="responsive-carousel__prev"
              >
                Go to previous slide
              </a>
              <a
                href="#responsive-carousel__slide3"
                className="responsive-carousel__next"
              >
                Go to next slide
              </a>
            </li>
            <li
              id="responsive-carousel__slide3"
              className="responsive-carousel__slide"
            >
              <div className="responsive-carousel__snapper"></div>
              <div className="responsive-carousel-item responsive-carousel-image-3">
                <div className="responsive-carousel-text">
                  <h1>Inspired by tradition.</h1>
                  <h2>Exceptionally Uneek.</h2>
                  <a href="/categories/fine-jewelry">
                    <div className="responsive-carousel-button">SEE MORE</div>
                  </a>
                </div>
              </div>
              <a
                href="#responsive-carousel__slide2"
                className="responsive-carousel__prev"
              >
                Go to previous slide
              </a>
              <a
                href="#responsive-carousel__slide1"
                className="responsive-carousel__next"
              >
                Go to next slide
              </a>
            </li>
          </ol>
          <aside className="responsive-carousel__navigation">
            <ol className="responsive-carousel__navigation-list">
              <li className="responsive-carousel__navigation-item">
                <a
                  href="#responsive-carousel__slide1"
                  className="responsive-carousel__navigation-button"
                >
                  Go to slide 1
                </a>
              </li>
              <li className="responsive-carousel__navigation-item">
                <a
                  href="#responsive-carousel__slide2"
                  className="responsive-carousel__navigation-button"
                >
                  Go to slide 2
                </a>
              </li>
              <li className="responsive-carousel__navigation-item">
                <a
                  href="#responsive-carousel__slide3"
                  className="responsive-carousel__navigation-button"
                >
                  Go to slide 3
                </a>
              </li>
            </ol>
          </aside>
        </section>
      </main>
    </Template>
  )
}

export default Home

export async function getServerSideProps({ query }) {
  return { props: { query } }
}
