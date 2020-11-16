import { Form, Input, Button, Divider, Select, message, Upload } from 'antd'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { fetchAPI } from '../../../../contexts/apollo/fetchAPI'
import { gql, useMutation } from '@apollo/client'
import axios from 'axios'
import { useRouter } from 'next/router'
import Template from '../../../../components/admin/templates/default'
import auth0, { redirect } from '../../../../utils/auth0'

const normFile = (e) => {
  console.log('Upload event:', e)
  if (Array.isArray(e)) {
    return e
  }
  return e && e.fileList
}

const Page = ({ result, session }) => {
  const router = useRouter()

  const [file, setFile] = useState(null)

  const EDIT_PRODUCT = gql`
    mutation EditProduct($id: ID!, $input: ProductInput) {
      updateProduct(id: $id, input: $input) {
        success
        message
      }
    }
  `
  const [editProduct, { data }] = useMutation(EDIT_PRODUCT)

  const fileUpload = (file) => {
    /** Upload API URL */
    const url = `${process.env.NEXT_PUBLIC_UNEEK_DOMAIN}/api/upload`
    const formData = new FormData()

    formData.append('file', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
    return axios.post(url, formData, config)
  }

  /** When Add Image Button is clicked, perform onFinish() */
  const onFinish = async (data) => {
    /** Upload to AWS */
    console.log(data.dragger)
    let newFiles = []

    await Promise.all(data.dragger.map(async (image)=>{
      const fileUploadResponse = await fileUpload(image.originFileObj)
      
      if (fileUploadResponse.data.success) {
        newFiles = [...newFiles, fileUploadResponse.data.file[1].Location] // fileUploadResponse.data.file[1].Location - 2nd image result (jpeg version)
      } else {
        message.error('File not upload...')
      }

      if (newFiles.length > 0) {

        const values = {
          images: [
            ...result.productById.images,
            ...newFiles, 
          ],
        }

        const editProductResponse = await editProduct({
          variables: { id: result.productById._id, input: values },
        })

        if (
          editProductResponse &&
          editProductResponse.data.updateProduct.success
        ) {
          message.success(editProductResponse.data.updateProduct.message)
          router.push(
            `/admin/catalog/products/images?id=${result.productById._id}`
          )
        } else {
          message.error(editProductResponse.data.updateProduct.message)
        }
      }

        // To do

/*

        let values = {
          images: [
            ...result.productById.images,
            fileUploadResponse.data.file[0].Location, // Save 1st Image Result 650x650 version
            //fileUploadResponse.data.file[1].Location, // Save 2nd Image Result 2500x2500 version
          ],
        }

        /** Save image url to MongoDB 
        const editProductResponse = await editProduct({
          variables: { id: result.productById._id, input: values },
        })

        if (
          editProductResponse &&
          editProductResponse.data.updateProduct.success
        ) {
          message.success(editProductResponse.data.updateProduct.message)
          router.push(
            `/admin/catalog/products/images?id=${result.productById._id}`
          )
        } else {
          message.error(editProductResponse.data.updateProduct.message)
        }
      } else {
        message.error('Error occured')
      }
*/
    }))}
/*
    try {
      const fileUploadResponse = await fileUpload(file)
      if (fileUploadResponse.data.success) {
        let values = {
          images: [
            ...result.productById.images,
            fileUploadResponse.data.file[0].Location, // Save 1st Image Result 650x650 version
            //fileUploadResponse.data.file[1].Location, // Save 2nd Image Result 2500x2500 version
          ],
        }

        /** Save image url to MongoDB 
        const editProductResponse = await editProduct({
          variables: { id: result.productById._id, input: values },
        })

        if (
          editProductResponse &&
          editProductResponse.data.updateProduct.success
        ) {
          message.success(editProductResponse.data.updateProduct.message)
          router.push(
            `/admin/catalog/products/images?id=${result.productById._id}`
          )
        } else {
          message.error(editProductResponse.data.updateProduct.message)
        }
      } else {
        message.error('Error occured')
      }
    } catch (err) {
      message.error('Error occured')
    }*/
  

  const onFinishFailed = () => {
    console.log('Failed Upload')
  }

  const onChange = (e) => {
    setFile(e.target.files[0])
  }

  const onRemoveImage = async (image) => {
    console.log("Removing Image: ", image)
    let images = [...result.productById.images]
    var index = images.indexOf(image)
    images.splice(index, 1)
    const values = { images: images }
    const id = result.productById._id
    const response = await editProduct({ variables: { id, input: values } })

    if (response && response.data.updateProduct.success) {
      message.success(response.data.updateProduct.message)
      router.push(`/admin/catalog/products/images?id=${result.productById._id}`)
    } else {
      message.error(response.data.updateProduct.message)
    }
  }

  const onSetPrimaryImage = async (image) => {
    const values = { primary_image: image }
    const id = result.productById._id
    const response = await editProduct({ variables: { id, input: values } })

    if (response && response.data.updateProduct.success) {
      message.success(response.data.updateProduct.message)
      router.push(`/admin/catalog/products/images?id=${result.productById._id}`)
    } else {
      message.error(response.data.updateProduct.message)
    }
  }

  console.log(result.productById.images)

  const displayImages = () => {
    if (
      Array.isArray(result.productById.images) &&
      result.productById.images.length > 0
    ) {
      return result.productById.images.map((data) => {
        console.log(data ==result.primary_image)
        return (
          <li>
            <img src={data} width={200} />{' '}
            <a onClick={() => onRemoveImage(data)}>Remove</a> - 
            {data != result.productById.primary_image && 
            <a onClick={() => onSetPrimaryImage(data)}>Set as Primary</a>
            }
          </li>
        )
      })
    }
  }
/*
  <Form.Item
  label="Image"
  name="image"
  rules={[{ required: true, message: 'Required' }]}
>
  <Input type="file" onChange={onChange} />
</Form.Item>
*/
  return (
    <Template session={session}>
      <div>
        <a
          onClick={() => {
            router.push(
              `/admin/catalog/products/edit?id=${result.productById._id}`
            )
          }}
        >
          Return to Edit Product
        </a>
        <div>
          <h1>Manage Product Images</h1>
          Sku: {result.productById.sku}
          <br />
          Name: {result.productById.name}
        </div>
        <Divider></Divider>
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
         

          <Form.Item
              name="dragger"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
              rules={[{ required: true, message: 'Required' }]}
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

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Image
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div>
      <h3>Primary Image</h3>
          {result.productById.primary_image && (
            <img src={result.productById.primary_image} width={200} />
          )}
          <h3>Images</h3>
          <ul>{displayImages()}</ul>
      </div>
    </Template>
  )
}

export default Page

export async function getServerSideProps({ query, req, res }) {
  const session = await auth0.getSession(req)
  // check if user is logged in
  if (!session && res) {
    redirect(res, '/admin')
    return {}
  }

  const { id } = query

  const QUERY = `
            query GetProduct($id: ID!) {
                productById(id: $id) {
                  _id
                  sku
                  name
                  images
                  primary_image
                }
          }`

  const result = await fetchAPI(QUERY, { variables: { id } })

  return {
    props: {
      result,
      session
    }, // will be passed to the page component as props
  }
}
