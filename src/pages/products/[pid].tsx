import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Template from '../../components/templates/default'
import { Icon, Breadcrumb, Divider } from 'rsuite'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup, ImageWithZoom } from 'pure-react-carousel';
import { fetchAPI } from '../../contexts/apollo/fetchAPI'


const Page = ({result}) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    let content
    const handleImageOnClick = (e) => { 
        setCurrentSlide(e.target.dataset.index)
    }

    const MyBreadcrumb = ({ separator, item }) => (
        <Breadcrumb separator={separator}>
            <Breadcrumb.Item href="/">
                Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                Products
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{item}</Breadcrumb.Item>
        </Breadcrumb>
    )

    if (!result) {
        content = <div>Error Occured</div>
    }

    if (result.product) {
        content = (
            <div>
                <Head>
                    <title>{result.product.meta_title}</title>
                    <meta name="description" content={result.product.meta_description} />
                    <meta property="og:type" content="website" />
                    <meta name="og:title" property="og:title" content={result.product.meta_title} />
                    <meta name="og:description" property="og:description" content={result.product.meta_description} />
                </Head>
                <main>
                    <div className="container">
                        <h1>Products</h1>
                        <MyBreadcrumb separator={<Icon icon="angle-right" />} item={result.product.sku} />
                        <div className="product-block">
                            <div className="product-images">
                                <CarouselProvider
                                    naturalSlideWidth={100}
                                    naturalSlideHeight={100}
                                    totalSlides={1}
                                    currentSlide={currentSlide}
                                >
                                    <Slider>
                                        <Slide index={0}><ImageWithZoom src={result.product.images} /></Slide>
                                    </Slider>
                                </CarouselProvider>
                                <img data-index="0" onClick={handleImageOnClick} className="mini-image" src={result.product.images} />
                            </div>
                            <div className="product-details">
                                <h3 className="product-name">{result.product.name}</h3>
                                <div className="style-block">Style: {result.product.sku}</div>
                                <div className="msrp-block">MSRP: {result.product.price} USD</div>
                                <Link href="/"><a className="see-in-store-btn">See In Store</a></Link>
                                <Link href="/"><a className="find-nearest-store-btn">Find Nearest Store</a></Link>
                                <Divider />
                                <div className="product-details-2">
                                    <h3>Product Details</h3>
                                    <p>{result.product.description}</p>

                                    <dl>
                                        <dt>Product Type</dt><dd>{result.product.product_type}</dd>
                                        <dt>Gender</dt><dd>{result.product.gender}</dd>
                                        <dt>Metal (As Pictured)</dt><dd>{result.product.metal}</dd>
                                        <dt>Side Stone Count</dt><dd>{result.product.side_stone_pieces}</dd>
                                        <dt>Side Stone</dt><dd>{result.product.side_stone_weight}</dd>
                                    </dl>
                                </div>
                                <Divider />
                                <div className="drop-a-hint">
                                    <Icon icon="envelope" /> Drop a Hint <Icon icon="heart" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <style jsx>{`
.myCarousel {
width: auto;
}

.mini-image {
height: 80px;
border: 1px solid #d2d2d2;
margin: 2px;
}

.see-in-store-btn, .find-nearest-store-btn, .drop-a-hint-btn {
display: block;
padding: 15px;
color: #fff;
background-color: #525b5b;
border: 1px solid #525b5b;
text-align: center;
margin: 5px auto;
}

.find-nearest-store-btn {
color: #525b5b;
background-color: #fff;
border: 1px solid #525b5b;
}

.drop-a-hint {
text-align: right;
}

.style-block {
font-size: 0.9em;
margin: 15px auto;
}

.msrp-block {
font-size: 1.2em;
margin: 15px auto;
font-weight: bold;
}

.product-name {
font-size: 1.8em;
line-height: 1.2em;
}

.product-details p {
font-size: 0.8em;
}

.product-details-2 {
margin: 25px auto;
}

.product-details-2 h3 {
font-size: 1.4em;
}

.product-details dt {
float: left;
clear: left;
width: 100px;
text-align: right;
font-weight: bold;
}

.product-details dt::after {
content: ":";
}
.product-details dd {
margin: 0 0 0 110px;
padding: 0 0 0.5em 0;
}

.product-details dl {
  margin: 25px auto;
  font-size: 0.8em;
}

            .container {
            max-width: 992px;
            margin: 0px auto;
            }
            .product-images {
                flex: 1;
                padding: 15px;
            }
            .product-block {
                display: flex;
            }
            .product-details {
                flex: 1;
                padding: 15px;
            } 
            `}
                </style>
            </div>
        )
    }

    return (
        <Template>
            {!content && <div className="container"><h3>Item not found</h3></div>}
            {content}
            <style jsx>{`
            .container {
                max-width: 992px;
                margin: 0px auto;
                }
            `}
            </style>
        </Template>
    )
}

export default Page

export async function getServerSideProps({params}) {
    const { pid } = params
    const QUERY = `
        query GetProduct($productSku: String!) {
        product(sku: $productSku) {
            sku
            name
            description
            product_type
            price
            metal
            center_size
            center_shape
            side_stone_weight
            side_stone_pieces
            images
            url
            meta_keyword
            meta_description
            meta_title
            gender
        }
      }`

    const result = await fetchAPI(QUERY, { variables: { productSku: pid } })

    return {
      props: {
        result,
        query: params
      }, // will be passed to the page component as props
    }
  }