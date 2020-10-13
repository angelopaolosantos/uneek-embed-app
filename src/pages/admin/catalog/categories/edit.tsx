import { fetchAPI } from '../../../../contexts/apollo/fetchAPI'
import { gql, useMutation } from '@apollo/client'
import { Form, Input, Button, Divider, Select, message } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Template from '../../../../components/admin/templates/default'
import auth0, { redirect } from '../../../../utils/auth0'

const Page = ({ result, session }) => {
  console.log(result)
  const router = useRouter()
  const { Option } = Select

  useEffect(() => {
    if (result.error == true) {
      message.error('Error occured')
      router.push('/admin/catalog/categories')
    }
  }, [])

  const EDIT_CATEGORY = gql`
    mutation EditCategory($id: ID!, $input: CategoryInput) {
      updateCategory(id: $id, input: $input) {
        success
        message
      }
    }
  `
  const [editCategory, { data }] = useMutation(EDIT_CATEGORY)

  const onFinish = async (values) => {
    const id = result.category._id
    console.log(id)
    console.log(values)
    try {
      const response = await editCategory({ variables: { id, input: values } })

      if (response.data.updateCategory.success) {
        message.success(response.data.updateCategory.message)
      } else {
        message.error(response.data.updateCategory.message)
      }
    } catch (e) {
      console.log(e.message)
      message.error(`Error occured: "${e.message}"`)
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed: ', errorInfo)
  }

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  }
  const tailLayout = {
    wrapperCol: { offset: 6, span: 18 },
  }

  return (
    <Template session={session}>
      <div className="container">
        <Link href="/admin/catalog/categories">
          <a>Go back to Categories</a>
        </Link>
        <h1>Edit category item</h1>
        <Divider />
        <Form
          {...layout}
          name="basic"
          initialValues={result.category}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Parent"
            name="parent"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            &nbsp;
            <Link href="/admin/catalog/categories">
              <Button>Cancel</Button>
            </Link>
          </Form.Item>
        </Form>
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

  console.log(id)

  const QUERY = `
            query GetCategory($id: ID!) {
                category(id: $id) {
                _id
                name
                parent
                category
          }
      }`

  const result = await fetchAPI(QUERY, { variables: { id } })

  return {
    props: {
      result,
    }, // will be passed to the page component as props
  }
}
