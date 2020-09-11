import { Table, Space, Button, Divider, Popconfirm, message } from "antd";
import Link from "next/link";
import { fetchAPI } from "../../../contexts/apollo/fetchAPI";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from 'next/router'

const Page = ({ result }) => {
  const columns = [
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (text, record) => <Link href={`/admin/retailers/edit/?id=${record._id}`}><a>{text}</a></Link>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Product",
      dataIndex: "product.sku",
      key: "product.sku",
      render: (text, record) => <a>{record.product.sku}</a>,
    },
    {
      title: "Retailer",
      dataIndex: "retailer",
      key: "retailer",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <Space size="middle">
              <Popconfirm
                title="Are you sure delete this item?"
                onConfirm={()=>{
                  console.log("Perform Delete")
                }
              }
                okText="Yes"
                cancelText="No"
              >
                <Button>Delete</Button>
              </Popconfirm>
          </Space>
        );
      },
    },
  ];
  
  let data;
  
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  if (result && result.inquiries.length > 0) {
    data = result.inquiries;
  }
  
  return (
    <div>
      <h1>Inquiries</h1>
      <Divider />
      {data && (
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
        />
      )}
    </div>
  );
};

export default Page;

export async function getServerSideProps({ params, query }) {
  const QUERY = `
          {
              inquiries {
              _id
              customer
              email
              message
              product {
                sku
              }
              retailer
        }
    }`;

  const result = await fetchAPI(QUERY);
  console.log("fetch result:", result);

  return {
    props: {
      result,
    }, // will be passed to the page component as props
  };
}
