import { Table, Space, Button, Divider, Popconfirm, message, Input } from 'antd'
import Link from 'next/link'
import { fetchAPI } from '../../../../contexts/apollo/fetchAPI'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'

const { Search } = Input

const Page = ({ result }) => {
  const router = useRouter()

  console.log(result)

  const DELETE_PRODUCT = gql`
    mutation DeleteProduct($id: ID!) {
      deleteProduct(id: $id) {
        success
        message
      }
    }
  `

  const [deleteProduct] = useMutation(DELETE_PRODUCT)

  const onDelete = async (id: string) => {
    const response = await deleteProduct({ variables: { id } })

    if (response && response.data.deleteProduct.success) {
      message.success(response.data.deleteProduct.message)
      router.push('/admin/catalog/products')
    } else {
      message.error(response.data.deleteProduct.message)
    }
  }

  const columns = [
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      render: (text, record) => (
        <Link href={`/admin/catalog/products/edit/?id=${record._id}`}>
          <a>{text}</a>
        </Link>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Product Type',
      dataIndex: 'product_type',
      key: 'product_type',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        return (
          <Space size="middle">
            <Link href={`/admin/catalog/products/edit/?id=${record._id}`}>
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

  let data

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

  if (result.products && result.products.length > 0) {
    // Each child in a list should have a unique "key" prop
    data = result.products.map((data)=>{
      return {...data, key: data.sku}
    })
  }

  return (
    <div>
      <h1>Products</h1>
      <div>
      <Search
              placeholder="input search text"
              onSearch={(value) => {
                console.log(value)
                router.push({
                  pathname: '/admin/catalog/products',
                  query: { search: value }
                })
              }
              }
              style={{ width: 200 }}
            />
      <Link href="/admin/catalog/products/add">
        <Button>Add Item</Button>
      </Link>
      </div>
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
    </div>
  )
}

export default Page

export async function getServerSideProps({ params, query }) {
  const { search } = query
  console.log('search', search)
  const QUERY = `
    query SearchProducts($filter: ProductInput) {
      products(filter: $filter) {
        _id
        sku
        name
        product_type
        status
        category
      }
    }
  `

  const result = await fetchAPI(QUERY, { variables: { filter: { sku: search } } })
  console.log('fetch result:', result)

  return {
    props: {
      result,
    }, // will be passed to the page component as props
  }
}
