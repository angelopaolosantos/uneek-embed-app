import { Table, Space, Button, Divider, Popconfirm, message } from 'antd'
import Link from 'next/link'
import { gql, useMutation, useQuery } from '@apollo/client'
import Template from '../../../components/admin/templates/default'
import auth0, { redirect } from '../../../utils/auth0'

const QUERY_INQUIRIES = gql`
  {
    inquiries {
      _id
      firstname
      lastname
      email
      message
      product {
        sku
      }
      retailer
    }
  }
`

const Page = ({session}) => {
  const { loading, error, data, refetch } = useQuery(QUERY_INQUIRIES, {
    variables: {},
    pollInterval:1000,
  })
  
  const DELETE_INQUIRY = gql`
    mutation DeleteAccessKey($id: ID!) {
      deleteInquiry(id: $id) {
        success
        message
      }
    }
  `

  const [deleteInquiry] = useMutation(DELETE_INQUIRY)
  
  const onDelete = async (id: string) => {
    const response = await deleteInquiry({ variables: { id } })

    if (response.data.deleteInquiry.success) {
      message.success(response.data.deleteInquiry.message) // show pop message when successful
      refetch()
    } else {
      message.error(response.data.deleteInquiry.message) // show pop message when error
    }
  }

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      render: (text, record) => (
        
        <strong>{(`${record.firstname} ${record.lastname}`).trim()}</strong>
        
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (text, record) => <a>{record.product.sku}</a>,
    },
    {
      title: 'Retailer',
      dataIndex: 'retailer',
      key: 'retailer',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        return (
          <Space size="middle">
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
    <Template session={session}>
      <h1>Inquiries</h1>
      <Divider />
      {data && (
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data.inquiries}
        />
      )}
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

  return {
    props: {
      session
    }
  }
}