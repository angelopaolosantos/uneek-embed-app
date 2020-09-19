import { fetchAPI } from '../../../../contexts/apollo/fetchAPI'
import { gql, useMutation } from '@apollo/client'
import {
  Form,
  Input,
  Button,
  Divider,
  Select,
  message,
  Table,
  Space,
  Popconfirm,
} from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
const { Option } = Select
const { TextArea } = Input

const Page = ({ result }) => {
  console.log(result)

  const router = useRouter()

  const EDIT_PRODUCT = gql`
    mutation EditProduct($id: ID!, $input: ProductInput) {
      updateProduct(id: $id, input: $input) {
        success
        message
      }
    }
  `
  const [editProduct, { data }] = useMutation(EDIT_PRODUCT)

  const onAddCategory = async (category) => {
    const values = { category: [...result.productById.category, category] }
    const id = result.productById._id
    const response = await editProduct({ variables: { id, input: values } })

    if (response && response.data.updateProduct.success) {
      message.success(response.data.updateProduct.message)
      router.push(
        `/admin/catalog/products/editCategories?id=${result.productById._id}`
      )
    } else {
      message.error(response.data.updateProduct.message)
    }
  }

  const onRemoveCategory = async (category) => {
    let categories = [...result.productById.category]
    var index = categories.indexOf(category)
    categories.splice(index, 1)
    const values = { category: categories }
    const id = result.productById._id
    const response = await editProduct({ variables: { id, input: values } })

    if (response && response.data.updateProduct.success) {
      message.success(response.data.updateProduct.message)
      router.push(
        `/admin/catalog/products/editCategories?id=${result.productById._id}`
      )
    } else {
      message.error(response.data.updateProduct.message)
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
        //var index = array.indexOf(item);
        //array.splice(index, 1);
        let index = -1

        if (
          result.productById.category &&
          result.productById.category.length > 0
        ) {
          index = result.productById.category.indexOf(record.category)
        }
        return (
          <Space size="middle">
            {index == -1 && (
              <Button onClick={() => onAddCategory(record.category)}>
                Add Category
              </Button>
            )}
            {index > -1 && (
              <Button onClick={() => onRemoveCategory(record.category)}>
                Remove Category
              </Button>
            )}
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

  let categoryData

  if (result.categories && result.categories.length > 0) {
    // Each child in a list should have a unique "key" prop
    categoryData = result.categories.map((data) => {
      return { ...data, key: data._id }
    })
  }

  return (
    <div className="container">
      <a
        onClick={() => {
          router.push(
            `/admin/catalog/products/edit?id=${result.productById._id}`
          )
        }}
      >
        Return to edit product
      </a>
      <h1>Edit Product Categories</h1>
      <div>
        Sku: {result.productById.sku}
        <br />
        Name: {result.productById.name}
        <br />
        <h3>Category/Categories:</h3>
        <ul>
          {result.productById.category.map((data) => {
            return (
              <li>
                {data} - <a onClick={() => onRemoveCategory(data)}>Remove</a>
              </li>
            )
          })}
        </ul>
      </div>
      <Divider></Divider>
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={categoryData}
      />
    </div>
  )
}

export default Page

export async function getServerSideProps({ query }) {
  const { id } = query

  const QUERY = `
            query GetProduct($id: ID!) {
                productById(id: $id) {
                  _id
                  thumbnail
                  sku
                  name
                  category
                }

                categories {
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
