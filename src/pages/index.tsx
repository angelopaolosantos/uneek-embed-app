import Head from "next/head";
import Template from "../components/templates/default";
import { useEffect } from 'react'


const Home = ({partner_key}) => {

  useEffect(()=>{
    if(typeof(partner_key) == "string") {
      sessionStorage.setItem('partner_key',partner_key)
    }
    console.log("session key: ",sessionStorage.getItem('partner_key'))
  },[])

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
            <li id="responsive-carousel__slide1" className="responsive-carousel__slide">
              <div className="responsive-carousel__snapper"></div>
              <div className="responsive-carousel-item responsive-carousel-image-1">
                <div className="responsive-carousel-text">
                  <h1>Inspired by tradition.</h1>
                  <h2>Exceptionally Uneek.</h2>
                  <a href="https://www.uneekjewelry.com/award">
                    <div className="responsive-carousel-button">SEE MORE</div>
                  </a>
                </div>
              </div>
              <a href="#responsive-carousel__slide3" className="responsive-carousel__prev">
                Go to last slide
              </a>
              <a href="#responsive-carousel__slide2" className="responsive-carousel__next">
                Go to next slide
              </a>
            </li>
            <li id="responsive-carousel__slide2" className="responsive-carousel__slide">
              <div className="responsive-carousel__snapper"></div>
              <div className="responsive-carousel-item responsive-carousel-image-2">
                <div className="responsive-carousel-text">
                  <h1>Meet our Best Seller.</h1>
                  <h2>The Petals Collection.</h2>
                  <a href="https://www.uneekjewelry.com/collections/the-petals-collection.html">
                    <div className="responsive-carousel-button">SEE MORE</div>
                  </a>
                </div>
              </div>
              <a href="#responsive-carousel__slide1" className="responsive-carousel__prev">
                Go to previous slide
              </a>
              <a href="#responsive-carousel__slide3" className="responsive-carousel__next">
                Go to next slide
              </a>
            </li>
            <li id="responsive-carousel__slide3" className="responsive-carousel__slide">
              <div className="responsive-carousel__snapper"></div>
              <div className="responsive-carousel-item responsive-carousel-image-3">
                <div className="responsive-carousel-text">
                  <h1>Inspired by tradition.</h1>
                  <h2>Exceptionally Uneek.</h2>
                  <a href="https://www.uneekjewelry.com/award">
                    <div className="responsive-carousel-button">SEE MORE</div>
                  </a>
                </div>
              </div>
              <a href="#responsive-carousel__slide2" className="responsive-carousel__prev">
                Go to previous slide
              </a>
              <a href="#responsive-carousel__slide1" className="responsive-carousel__next">
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
  );
};

export default Home;

export async function getServerSideProps({query: { partner_key }}) {
  if (partner_key) { // if partner_key query is 
    return { props: { partner_key } }
  }

  return { props: {} }
}