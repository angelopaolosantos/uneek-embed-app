import Head from 'next/head'
import Template from '../components/templates/default'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { fetchAPI } from '../contexts/apollo/fetchAPI'
import Link from 'next/link'
import { Button, Divider } from 'rsuite'
import ReactHtmlParser from 'react-html-parser'

const Page = () => {
  const router = useRouter()

  return (
    <Template>
      <Head>
        <meta name="description" content="Description"></meta>
        <meta name="keywords" content="Keywords"></meta>
        <title>Uneek Jewelry</title>
      </Head>
      <main>
        <section className="uneek-about-us-section">
          <h1>About Uneek Jewelry</h1>
          <p>
          Uneek Jewelry, a Los Angeles-based brand founded by Benjamin Javaheri, the most awarded jewelry designer in the industry, blends the bold spirit of contemporary American culture with the delicacy and detail born of old-world metalsmithing and stone-setting disciplines. Established in 1996, Uneek Jewelry has emerged as an unparalleled standard in fine diamond jewelry.  Every customer is treated with exceptional service, extraordinary detail, intricate workmanship and breathtaking designs in their extensive bridal, color and fashion collections.
          </p>
          <h1>About Benjamin Javaheri</h1>
          <div className="about-benjamin">
          <p>
          <img src="/images/benjamin_profile.png" />
          Raised in the United States, founding president and master designer, Benjamin Javaheri literally grew up in the trade. It seems to have been carved in his destiny to be in the industry because “javaheri" means jewelry in Farsi language. He started Uneek Jewelry in 1997, a major step that allowed him to provide design and manufacturing services to several brands. His designs are now being sold worldwide --- Australia, Canada, Taiwan, Japan, South Korea --- with more countries to conquer soon. 
          </p>
          <p>
          Looking back to his humble beginnings, Benjamin recalls, <em>&quot;I was the light behind the industry stars. I was the designer who brought their concepts and visions to life.&quot;</em>
          </p>
          <p>
          For Benjamin, it all begins with the stones. <em>&quot;A beautiful diamond is like a treasured work of art. It requires the perfect frame to enhance and protect its beauty and value.&quot;</em>
          </p>
          </div>
        </section>
        <Divider></Divider>
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
            .about-benjamin img {
                float: left;
                margin: 1em;
                border-radius: 15px;
                max-width: 200px;
            }
          .lightwidget-widget {
            width: 100%;
            border: 0;
            overflow: hidden;
          }
          .uneek-about-us-section {
            max-width: 900px;
            margin: 1em auto;
            padding: 1em;
          }

          .uneek-about-us-section h1 {
              font-size: 2.5em;
              text-align: center;
          }

          @media only screen and (max-width: 600px) {
            .about-benjamin img {
                width: 50%;
            }

            .uneek-about-us-section h1 {
              font-size: 2.0em;
          }
          }
        `}
      </style>
    </Template>
  )
}

export default Page
