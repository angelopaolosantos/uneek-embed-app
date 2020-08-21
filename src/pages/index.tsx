import Head from 'next/head'
import Template from '../components/templates/default'
import '../styles/carousel.scss'

const Home = () => {
  return (
    <Template>
      <Head>
        <meta name="description" content="Description"></meta>
        <meta name="keywords" content="Keywords"></meta>
        <title>Uneek Jewelry</title>
      </Head>
      <main>
        <section className="carousel" aria-label="Gallery">
          <ol className="carousel__viewport">
            <li id="carousel__slide1" className="carousel__slide">
              <div className="carousel__snapper"></div>
              <div className="carousel-item carousel-image-1">
                <div className="carousel-text">
                  <h1>Inspired by tradition.</h1>
                  <h2>Exceptionally Uneek.</h2>
                  <a href="https://www.uneekjewelry.com/award">
                    <div className="carousel-button">SEE MORE</div>
                  </a>
                </div>
              </div>
              <a href="#carousel__slide3" className="carousel__prev">Go to last slide</a>
              <a href="#carousel__slide2" className="carousel__next">Go to next slide</a>
            </li>
            <li id="carousel__slide2" className="carousel__slide">
              <div className="carousel__snapper"></div>
              <div className="carousel-item carousel-image-2">
                <div className="carousel-text">
                  <h1>Meet our Best Seller.</h1>
                  <h2>The Petals Collection.</h2>
                  <a href="https://www.uneekjewelry.com/collections/the-petals-collection.html">
                    <div className="carousel-button">SEE MORE</div>
                  </a>
                </div>
              </div>
              <a href="#carousel__slide1" className="carousel__prev">Go to previous slide</a>
              <a href="#carousel__slide3" className="carousel__next">Go to next slide</a>
            </li>
            <li id="carousel__slide3" className="carousel__slide">
              <div className="carousel__snapper"></div>
              <div className="carousel-item carousel-image-3">
                <div className="carousel-text">
                  <h1>Inspired by tradition.</h1>
                  <h2>Exceptionally Uneek.</h2>
                  <a href="https://www.uneekjewelry.com/award">
                    <div className="carousel-button">SEE MORE</div>
                  </a>
                </div>
              </div>
              <a href="#carousel__slide2" className="carousel__prev">Go to previous slide</a>
              <a href="#carousel__slide1" className="carousel__next">Go to next slide</a>
            </li>
          </ol>
          <aside className="carousel__navigation">
            <ol className="carousel__navigation-list">
              <li className="carousel__navigation-item">
                <a href="#carousel__slide1" className="carousel__navigation-button">Go to slide 1</a>
              </li>
              <li className="carousel__navigation-item">
                <a href="#carousel__slide2" className="carousel__navigation-button">Go to slide 2</a>
              </li>
              <li className="carousel__navigation-item">
                <a href="#carousel__slide3" className="carousel__navigation-button">Go to slide 3</a>
              </li>
            </ol>
          </aside>
        </section>
      </main>
    </Template>
  )
}

export default Home