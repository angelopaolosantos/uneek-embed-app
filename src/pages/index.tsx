import Head from 'next/head'
import Template from '../components/templates/default'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { fetchAPI } from '../contexts/apollo/fetchAPI'
import Link from 'next/link'
import { Button, IconButton, ButtonGroup, ButtonToolbar, Divider } from 'rsuite';

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
              console.log('Parent Website and Retailer is authorized')
              sessionStorage.setItem('partner_key', data.verifyAccessKey.key)
            } else {
              // Parent Website and Retailer is not authorized. Block access
              console.log('Website is not authorized')
              router.push('/unauthorized')
            }
          } else {
            // Retailer not authorized
            console.log('Invalid access key')
            router.push('/unauthorized')
          }
        })
        .catch((err) => {
          console.log(err)
          // Retailer not authorized
          router.push('/unauthorized')
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
        <section className="uneek-section">
          <div className="section1">
          <div className="uneek-section-content">
              <h1>One Of A Kind</h1>
              <p>Uneeks Signature Line</p>
              <Link href="/categories/one-of-a-kind"><Button>Explore</Button></Link>
            </div>
          </div>
        </section>
        <section className="uneek-section">
          <div className="section2">
          <div className="uneek-section-content">
              <h1>Engagement Rings</h1>
              <p>Finding a perfect, made-for-you engagement ring is simple.</p>
              <Link href="/categories/engagement-rings"><Button>Explore</Button></Link>
            </div>
          </div>
        </section>
        <section className="uneek-section">
          <div className="section3">
            <div className="uneek-section-content">
              <h1>Fashion Jewelry</h1>
              <p>We promise to provide personalized experiences and hand-crafted, stunning jewelry every time.</p>
              <Link href="/categories/fine-jewelry"><Button>Explore</Button></Link>
            </div>
          </div>
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
            <Button>Read More</Button>
          </div>
        </section>
        <section>
        <iframe src="//lightwidget.com/widgets/066a4dd31ad05860bff70365f33f424b.html" scrolling="no" className="lightwidget-widget" ></iframe>
        </section>
      </main>
      <style jsx>
        {`
          .lightwidget-widget {
            width:100%;
            border:0;
            overflow:hidden;
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
          .uneek-section {
            margin: 15px auto;
            max-width: 1200px;
            margin: 15px auto;
          }

          .uneek-section > div{
            height: 500px;
            background-color: #d2d2d2; /* Used if the image is unavailable */
            background-position: center; /* Center the image */
            background-repeat: no-repeat; /* Do not repeat the image */
            background-size: cover; /* Resize the background image to cover the entire container */
            padding: 25px;
          }

          .uneek-section-content {
            max-width: 450px;
          }

          .uneek-section-content p {
            color: #fff
          }

          .uneek-section-content h1 {
            color: #fff
          } 

          .uneek-category img {
            width: 100%;
            height: auto;
          }

          .section1 {
            background: url('/images/Uneek-Home-5.webp');
            justify-content: flex-end;
            align-items: center;
            display: flex;
          }

          .section2 {
            background: url('/images/Uneek-Home-4.webp');
            justify-content: flex-start;
            align-items: center;
            display: flex;
          }
          
          .section3 {
            background: url('/images/Uneek-Home-6.webp');
            justify-content: flex-end;
            align-items: center;
            display: flex;
          }
        `}
      </style>
    </Template>
  )
}

export default Home

export async function getServerSideProps({ query }) {
  return { props: { query } }
}
