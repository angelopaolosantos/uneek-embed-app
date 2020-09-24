import { useEffect, useState } from 'react'
import { Icon, Breadcrumb, Divider } from 'rsuite'
import Head from 'next/head'
import Template from '../../components/templates/default'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { fetchAPI } from '../../contexts/apollo/fetchAPI'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
  ImageWithZoom,
} from 'pure-react-carousel'

import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  message,
} from 'antd'

const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
const isBrowser = () => typeof window !== 'undefined'

const Page = ({ result, params }) => {
  const router = useRouter()
  const [form] = Form.useForm();
  const product = result.product

  const [currentSlide, setCurrentSlide] = useState(0)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const [partnerKey, setPartnerKey] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // detect window screen width function
      setWindowWidth(window.innerWidth)

      window.addEventListener('resize', () => {
        setWindowWidth(window.innerWidth)
      })
    }
    setPartnerKey(sessionStorage['partner_key'])
  }, [])

  const handleImageOnClick = (e) => {
    console.log(e.target)
    setCurrentSlide(e.target.dataset.index)
  }

  const MyBreadcrumb = ({ separator }) => (
    <Breadcrumb separator={separator}>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item active>{product.sku}</Breadcrumb.Item>
    </Breadcrumb>
  )

  const showDrawer = () => {
    setDrawerVisible(true)
  }

  const onClose = () => {
    setDrawerVisible(false)
  }

  const onFinish = async (values) => {
    console.log('Success:', values)

    if (sessionStorage['partner_key'] == 'undefined') {
      message.error('Failed to send inquiry')
    } else {
      const data = {
        ...values,
        product,
        partnerKey: sessionStorage['partner_key'],
      }

      try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_UNEEK_DOMAIN}/api/inquiry`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )

      const result = await response.json()

      console.log(result)

      if(result.success) {
        setDrawerVisible(false)
        form.resetFields();
        message.success(result.message)
      } else {
        message.error(result.message)
      }

      } catch(e) {
        console.log(e)
      }
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

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
                totalSlides={product.images.length}
                currentSlide={currentSlide}
              >
                <Slider>
                  {product.images.map((image, index) => {
                    return (
                      <Slide index={index}>
                        <ImageWithZoom src={image} />
                      </Slide>
                    )
                  })}
                </Slider>
                <DotGroup />
                <ButtonBack>Back</ButtonBack>
                <ButtonNext>Next</ButtonNext>
              </CarouselProvider>
              {product.images.map((image, index) => {
                return (
                  <img
                    data-index={index}
                    onClick={handleImageOnClick}
                    className="mini-image"
                    src={image}
                  />
                )
              })}
            </div>
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <div className="style-block">Style: {product.sku}</div>
              {product.price > 0 && (
                <div className="msrp-block">
                  MSRP: ${formatNumber(product.price)}
                </div>
              )}

              <a className="see-in-store-btn" onClick={showDrawer}>
                Inquire
              </a>

              <Divider />
              <div className="product-details-2">
                <h3>Product Details</h3>
                <p>{product.description}</p>

                <dl>
                  <dt>Product Type</dt>
                  <dd>{product.product_type}</dd>
                  <dt>Gender</dt>
                  <dd>{product.gender}</dd>
                  <dt>Metal</dt>
                  <dd>{product.metal}</dd>
                  <dt>Side Stone Count</dt>
                  <dd>{product.side_stone_pieces}</dd>
                  <dt>Side Stone Weight</dt>
                  <dd>{product.side_stone_weight}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Drawer
        title={`Inquire about item: ${product.sku}`}
        width={windowWidth < 600 ? `100%` : 600}
        onClose={onClose}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <p>
          Please let us know if you have any questions about {product.sku} and
          someone will get back to you as soon as possible.
        </p>
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Form.Item
            name="firstname"
            label="First Name"
            rules={[
              { required: true, message: 'Please enter your first name' },
            ]}
          >
            <Input style={{ width: '100%' }} placeholder="John" />
          </Form.Item>
          <Form.Item
            name="lastname"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter last name' }]}
          >
            <Input style={{ width: '100%' }} placeholder="Doe" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter a valid email address' },
            ]}
          >
            <Input
              style={{ width: '100%' }}
              placeholder="Please enter your email"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input
              style={{ width: '100%' }}
              placeholder="Please enter your phone number"
            />
          </Form.Item>
          <Form.Item name="message" label="Message">
            <Input.TextArea
              rows={4}
              placeholder="please enter inquiry details here"
            />
          </Form.Item>
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Drawer>
      <style jsx>
        {`
          .myCarousel {
            width: auto;
          }

          .mini-image {
            height: 80px;
            border: 1px solid #d2d2d2;
            margin: 2px;
          }

          .see-in-store-btn,
          .find-nearest-store-btn,
          .drop-a-hint-btn {
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
            content: ':';
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
    </Template>
  )
}

export default Page

export async function getServerSideProps({ params }) {
  console.log(params)
  const { sku } = params
  console.log(sku)
  const QUERY = `
          query GetProduct($sku: String!) {
          product(sku: $sku) {
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
              category
          }
        }`

  const result = await fetchAPI(QUERY, { variables: { sku } })

  console.log(result)

  return {
    props: {
      result,
      params,
    }, // will be passed to the page component as props
  }
}
