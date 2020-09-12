import { Table, Space, Button, Divider, Popconfirm, message } from 'antd'
import Link from 'next/link'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Template from '../../../../components/templates/admin'

const QUERY_CATEGORIES = gql`
  query GetCategories($filter: CategoryInput) {
    categories(filter: $filter) {
      _id
      name
    }
  }
`

const Page = () => {
  const { loading, error, data, refetch } = useQuery(QUERY_CATEGORIES, {
    variables: { filter: null },
    // pollInterval:500,
  })

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

    if (response.data.deleteCategory.success) {
      message.success(response.data.deleteCategory.message) // show pop message when successful
      refetch()
    } else {
      message.error(response.data.deleteCategory.message) // show pop message when error
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
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        return (
          <Space size="middle">
            <Link href={`/admin/catalog/categories/edit/?id=${record._id}`}>
              <Button>Update</Button>
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

  return (
    <Template>
      <main className="container">
        <h1>Product Categories</h1>
        <Link href="/admin/catalog/categories/add">
          <Button>Add Item</Button>
        </Link>
        <Divider />
        {data && (
          <Table
            rowSelection={{
              type: 'checkbox',
              ...rowSelection,
            }}
            columns={columns}
            dataSource={data.categories}
          />
        )}
      </main>
    </Template>
  )
}

export default Page
