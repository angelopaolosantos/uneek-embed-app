import { Table, Space, Button, Divider, Popconfirm, message } from "antd";
import Link from "next/link";
import { fetchAPI } from "../../../contexts/apollo/fetchAPI";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Template from "../../../components/templates/admin";

const Page = ({ result }) => {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => { 
    if (result.accessKeys && result.accessKeys.length > 0) {
      setData(result.accessKeys);
    }
  }, []); // run this only once

  const DELETE_ACCESS_KEY = gql`
    mutation DeleteAccessKey($id: ID!) {
      deleteAccessKey(id: $id) {
        success
        message
      }
    }
  `;

  const [deleteAccessKey] = useMutation(DELETE_ACCESS_KEY);

  const onDelete = async (id: string) => {
    const response = await deleteAccessKey({ variables: { id } });

    if (response && response.data.deleteAccessKey.success) {
      message.success(response.data.deleteAccessKey.message); // show pop message when successful
      router.push("/admin/retailers"); // redirect back to retailers page on success
    } else {
      message.error(response.data.deleteAccessKey.message); // show pop message when error
    }
  };

  const columns = [
    {
      title: "Retailer",
      dataIndex: "retailer",
      key: "retailer",
      render: (text, record) => (
        <Link href={`/admin/retailers/edit/?id=${record._id}`}>
          <a>{text}</a>
        </Link>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Key",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <Space size="middle">
            <Link href={`/admin/retailers/edit/?id=${record._id}`}>
              <Button>Update</Button>
            </Link>

            <Popconfirm
              title="Are you sure delete this item?"
              onConfirm={() => {
                onDelete(record._id);
              }}
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

  return (
    <Template>
      <main className="container">
        <h1>Access Keys</h1>
        <Link href="/admin/retailers/add">
          <Button>Add Item</Button>
        </Link>
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
      </main>
    </Template>
  );
};

export default Page;

export async function getServerSideProps({ params, query }) {
  console.log("Params: ", params);
  console.log("Query: ", query);
  const QUERY = `
          query GetAccessKeys($filter: AccessKeyInput){
              accessKeys(filter: $filter) {
              _id
              retailer    
              type
              status
              key
              url
        }
          }`;

  const result = await fetchAPI(QUERY, { variables: { filter: query }});
  console.log("From getServerSideProps: ", result);

  return {
    props: {
      result,
    }, // will be passed to the page component as props
  };
}
