import { Table, Space, Button, Divider, Popconfirm, message } from 'antd'
import Link from 'next/link'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { fetchAPI } from '../../../../contexts/apollo/fetchAPI'
import Template from '../../../../components/admin/templates/default'
import auth0, { redirect } from '../../../../utils/auth0'

const Page = ({ result, session }) => {
  const router = useRouter()

  const DELETE_CATEGORY = gql`
    mutation DeleteCategory($id: ID!) {
      deleteCategory(id: $id) {
        success
        message
      }
    }
  `
  const [deleteCategory] = useMutation(DELETE_CATEGORY)

  const onDelete = async (id: string) => {
    const response = await deleteCategory({ variables: { id } })

    if (response?.data.deleteCategory.success) {
      message.success(response.data.deleteCategory.message) // show pop message when successful
      router.push({
        pathname: '/admin/catalog/categories',
      })
    } else {
      message.error(response.data.deleteCategory.message) // show pop message when error
    }
  }

  const UPDATE_CATEGORY_PRODUCTS = gql`
    mutation UpdateCategoryProducts($category: String!) {
      updateCategoryProducts(category: $category) {
        success
        message
      }
    }
  `

  const [updateCategoryProducts] = useMutation(UPDATE_CATEGORY_PRODUCTS)

  const handleCheckInventory = async () => {
    if (result.categories && result.categories.length > 0) {
      // Each child in a list should have a unique "key" prop
      result.categories.map(async (data) => {
        try {
          const response = await updateCategoryProducts({
            variables: { category: data.category },
          })

          if (response.data.updateCategoryProducts.success) {
            message.success(response.data.updateCategoryProducts.message)
          } else {
            message.error(response.data.updateCategoryProducts.message)
          }
        } catch (e) {
          console.log(e.message)
          message.error(`Error occured: "${e.message}"`)
        }
      })
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link href={`/admin/catalog/categories/edit/?id=${record._id}`}>
          <a>{text}</a>
        </Link>
      ),
    },
    {
      title: 'Parent',
      dataIndex: 'parent',
      key: 'parent',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        return (
          <Space size="middle">
            <Link href={`/admin/catalog/categories/edit/?id=${record._id}`}>
              <Button>Update</Button>
            </Link>

            <Link
              href={`/admin/catalog/categories/manage-products/?id=${record._id}`}
            >
              <Button>Manage Products</Button>
            </Link>

            <Popconfirm
              title="Are you sure delete this item?"
              onConfirm={() => {
                onDelete(record._id)
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button>Delete</Button>
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      )
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  }

  let data

  if (result.categories && result.categories.length > 0) {
    // Each child in a list should have a unique "key" prop
    data = result.categories.map((data) => {
      return { ...data, key: data._id }
    })
  }

  return (
    <Template session={session}>
      <main className="container">
        <h1>Product Categories</h1>
        <Link href="/admin/catalog/categories/add">
          <Button>Add Item</Button>
        </Link>
        
          <Button onClick={handleCheckInventory}>Update Category Items</Button>
       
        <Divider />
        {data && (
          <Table
            rowSelection={{
              type: 'checkbox',
              ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
          />
        )}
      </main>
    </Template>
  )
}

export default Page

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req)
  // check if user is logged in
  if (!session && res) {
    redirect(res, '/admin')
    return {}
  }

  const QUERY_CATEGORIES = `
  {
    categories {
      _id
      name
      parent
      category
    }
  }
  `

  const result = await fetchAPI(QUERY_CATEGORIES)

  return {
    props: {
      result,
      session,
    }, // will be passed to the page component as props
  }
}
