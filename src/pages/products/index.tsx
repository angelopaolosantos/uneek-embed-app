import { Component } from 'react'
import { Icon, Breadcrumb, Divider } from 'rsuite'
import Head from 'next/head'
import Template from '../../components/templates/default'
import Link from 'next/link'

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup, ImageWithZoom } from 'pure-react-carousel';

type AppState = {
    currentSlide: number;    
}

class Page extends Component< {}, AppState> {
    constructor(props) {
        super(props)
        this.state = {
            currentSlide: 0
        }
        this.handleImageOnClick = this.handleImageOnClick.bind(this)
    }

    handleImageOnClick(e) {
        console.log(e.target)
        this.setState({currentSlide: e.target.dataset.index})
    }

    render() {
        const MyBreadcrumb = ({ separator }) => (
            <Breadcrumb separator={separator}>
                <Breadcrumb.Item href="/">
                    Home
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/products">
                    Products
                </Breadcrumb.Item>
                <Breadcrumb.Item active>LVS1062PE</Breadcrumb.Item>
            </Breadcrumb>
        );

        return (
            <Template>
                <Head>
                    <title>Uneek Jewelry - Products</title>
                </Head>
                <main>
                    <div className="container">
                        <h1>Products</h1>
                        <MyBreadcrumb separator={<Icon icon="angle-right" />} />
                        <div className="product-block">
                            <div className="product-images">
                                <CarouselProvider
                                    naturalSlideWidth={100}
                                    naturalSlideHeight={100}
                                    totalSlides={3} 
                                    currentSlide={this.state.currentSlide}
                                >
                                    <Slider>
                                        <Slide index={0}><ImageWithZoom src="images/lvs1062pe.jpg" /></Slide>
                                        <Slide index={1}><ImageWithZoom src="images/lvs1062pe.jpg" /></Slide>
                                        <Slide index={2}><ImageWithZoom src="images/lvs1062pe.jpg" /></Slide>
                                    </Slider>
                                    <DotGroup />
                                    <ButtonBack>Back</ButtonBack>
                                    <ButtonNext>Next</ButtonNext>
                                </CarouselProvider>
                                <img data-index="0" onClick={this.handleImageOnClick} className="mini-image" src="images/lvs1062pe.jpg" />
                                <img data-index="1" onClick={this.handleImageOnClick} className="mini-image" src="images/lvs1062pe.jpg" />
                                <img data-index="2" onClick={this.handleImageOnClick} className="mini-image" src="images/lvs1062pe.jpg" />
                            </div>
                            <div className="product-details">
                                <h3 className="product-name">Uneek Pear White Diamond Engagement Ring, in Platinum</h3>
                                <div className="style-block">Style: LVS1062PE</div>
                                <div className="msrp-block">MSRP: $9,577 USD</div>
                                <Link href="/"><a className="see-in-store-btn">See In Store</a></Link>
                                <Link href="/"><a className="find-nearest-store-btn">Find Nearest Store</a></Link>
                                <Divider />
                                <div className="product-details-2">
                                    <h3>Product Details</h3>
                                    <p>This enticing platinum Uneek engagement ring is ideal for any celebration. Schemed with a striking sum of shimmer that doubtless overawes everyone with its 2 baguette diamonds with combined approximate weight of 0.77ct baguette diamonds, and pear center of 5.88ct j/si2 gia diamond in a glossy finish.</p>

                                    <dl>
                                        <dt>Product Type</dt><dd> Earrings</dd>
                                        <dt>Gender</dt><dd>Ladies</dd>
                                        <dt>Metal (As Pictured)</dt><dd>18K Yellow Gold</dd>
                                        <dt>Side Stone Count</dt><dd>30 Round Diamonds, 2 Pear Shaped Diamond, 2 Pear Shaped Indicolite Tourmaline</dd>
                                        <dt>Side Stone</dt><dd>Carat Weight0.18CT Round Diamonds , 0.64CT Pear Shaped Diamond, 3.31CT Pear Shaped Indicolite Tourmaline</dd>
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
                `
                }
                </style>
            </Template>
        )
    }

}

export default Page