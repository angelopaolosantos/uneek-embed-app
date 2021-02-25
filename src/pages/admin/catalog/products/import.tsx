import Template from '../../../../components/admin/templates/default'
import auth0, { redirect } from '../../../../utils/auth0'
import Papa from 'papaparse'
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
  Divider,
  Table,
} from 'antd'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { setPriority } from 'os'
import { join } from 'path'
import { gql, useMutation } from '@apollo/client'
import { ConfigurationServicePlaceholders } from 'aws-sdk/lib/config_service_placeholders'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

const normFile = (e) => {
  console.log('Upload event:', e)
  if (Array.isArray(e)) {
    return e
  }
  return e && e.fileList
}

const columns = [
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Product Type',
    dataIndex: 'product_type',
    key: 'product_type',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Upsert Status',
    dataIndex: 'log',
    key: 'log',
  },
]

const Page = ({ session }) => {
  const [form] = Form.useForm()
  const [products, setProducts] = useState([])

  const onFinish = (values) => {
    console.log('Received values of form: ', values)
    console.log(values.dragger[0].originFileObj)
    if (values.dragger[0].originFileObj) {
      Papa.parse(values.dragger[0].originFileObj, {
        worker: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        // Uncomment this to handle big files:
        //step: function (row) {
        //  console.log('Row:', row.data)
        //},
        complete: function (results: any) {
          console.log('All done')
          console.log('result:', results)
          if (results && results.data.length > 0) {
            setProducts(results.data)
          }
        },
      })
    }
  }

  /** Upsert GraphQL Request */
  const UPSERT_PRODUCT = gql`
    mutation UpsertProduct($input: ProductInput) {
      upsertProduct(input: $input) {
        success
        message
      }
    }
  `
  const [upsertProduct, { data }] = useMutation(UPSERT_PRODUCT)

  const onUpdateProducts = async () => {
    let productsWithStatus = [...products]

    //console.log("Products: ",products)
    console.log("Products: ", productsWithStatus)
    /** Remove and log information */
    productsWithStatus.forEach((product)=>{delete product.log})

    /** Used method below to await for all promised in loop to finish */
    await Promise.all(
      products.map(async (product) => {
        console.log('Upserting ', product.sku)
        if (product.sku) {
        
          //console.log(product)
          
          const response: any = await upsertProduct({
            variables: { input: product },
          })
          console.log(response)

          const objectIndex = products.findIndex(
            (obj) => obj.sku == product.sku
          )

          console.log('Object Index:', objectIndex)
          productsWithStatus[objectIndex].log =
            response.data.upsertProduct.message
          
        }
      })
    )
    
    setProducts(productsWithStatus)
    form.resetFields()
  }

  return (
    <Template session={session}>
      <div>
        <h1>Products Import</h1>
        <Divider></Divider>
        <div className="upload-products-section">
          <h3>Step 1</h3>
          <p>Upload CSV file for import. Use Uneek import template.</p>
        </div>
        <Form
          form={form}
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={{}}
        >
          <Form.Item label="Product CSV">
            <Form.Item
              name="dragger"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger name="files">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload.
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Divider></Divider>

      <div>
        <div className="update-products-section">
          <h3>Step 2</h3>
          <p>
            Clicking <strong>Update Products</strong> will upsert items below
          </p>
          <Button
            onClick={onUpdateProducts}
            disabled={products.length <= 0}
          >
            Update Products
          </Button>
        </div>
        <Table dataSource={products} columns={columns}></Table>
      </div>
      <style jsx>{`
        .update-products-section,
        .upload-products-section {
          text-align: center;
          margin: 1rem;
        }
      `}</style>
    </Template>
  )
}

export default Page

export async function getServerSideProps({ query, req, res }) {
  const session = await auth0.getSession(req)
  // check if user is logged in
  if (!session && res) {
    redirect(res, '/admin')
    return {
      props: {
        session,
      }, // will be passed to the page component as props
    }
  }

  return { props: {} }
}
