import { Table, Space, Button, Divider, Popconfirm, message } from 'antd'
import Link from 'next/link'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Template from '../../../components/admin/templates/default'
import auth0, { redirect } from '../../../utils/auth0'

const QUERY_ACCESS_KEYS = gql`
  query GetAccessKeys($filter: AccessKeyInput) {
    accessKeys(filter: $filter) {
      _id
      retailer
      type
      status
      key
      url
    }
  }
`

const Page = ({ session }) => {
  const { loading, error, data, refetch } = useQuery(QUERY_ACCESS_KEYS, {
    variables: { filter: null },
    // pollInterval: 1000,
  })

  const router = useRouter()

  const DELETE_ACCESS_KEY = gql`
    mutation DeleteAccessKey($id: ID!) {
      deleteAccessKey(id: $id) {
        success
        message
      }
    }
  `

  const [deleteAccessKey] = useMutation(DELETE_ACCESS_KEY)

  const onDelete = async (id: string) => {
    const response = await deleteAccessKey({ variables: { id } })

    if (response.data.deleteAccessKey.success) {
      message.success(response.data.deleteAccessKey.message) // show pop message when successful
      refetch()
    } else {
      message.error(response.data.deleteAccessKey.message) // show pop message when error
    }
  }

  const columns = [
    {
      title: 'Retailer',
      dataIndex: 'retailer',
      key: 'retailer',
      render: (text, record) => (
        <Link href={`/admin/accesskeys/edit/?id=${record._id}`}>
          <a>{text}</a>
        </Link>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        return (
          <Space size="middle">
            <Link href={`/admin/accesskeys/edit/?id=${record._id}`}>
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
    <Template session={session}>
      <div className="container">
        <h1>Access Keys</h1>
        <p>
          Manage access keys for web embed access. Retailer is required to
          provide URL where the embedded page will appear.
        </p>
        <Divider />
        <Link href="/admin/accesskeys/add">
          <Button>Add Item</Button>
        </Link>
        
          <Button onClick={()=>refetch()}>Refresh</Button>
      
        {data && (
          <Table
            rowSelection={{
              type: 'checkbox',
              ...rowSelection,
            }}
            columns={columns}
            dataSource={data.accessKeys}
          />
        )}
      </div>
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

  return { props: { session } }
}
