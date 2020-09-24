import { fetchAPI } from "../../../contexts/apollo/fetchAPI";
import { gql, useMutation } from "@apollo/client";
import { Form, Input, Button, Divider, Select, message } from "antd";
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Page = ({ result }) => {
  const router = useRouter()
  const { Option } = Select;  
  
  useEffect(()=>{
    if (result.error==true) {
      message.error("Error occured")
      router.push('/admin/accesskeys')
    }
  },[])

  const EDIT_ACCESS_KEY = gql`
    mutation EditAccessKey($id: ID!, $input: AccessKeyInput) {
      updateAccessKey(id: $id, input: $input) {
        success
        message
      }
    }
  `;
  const [editAccessKey, { data }] = useMutation(EDIT_ACCESS_KEY);

  const onFinish = async (values) => {
    const id = result.accessKey._id;
    try {
    const response = await editAccessKey({ variables: { id, input: values }})
    
    if (response.data.updateAccessKey.success) {
      message.success(response.data.updateAccessKey.message)
    } else {
      message.error(response.data.updateAccessKey.message)
    }
    } catch(e) {
      console.log(e.message)
      message.error(`Error occured: "${e.message}"`)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed: ", errorInfo);
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 18 },
  };

  return (
    <div className="container">
      <h1>Edit item</h1>
      <Divider />
      <Form
        {...layout}
        name="basic"
        initialValues={
          result && result.accessKey
            ? { ...result.accessKey }
            : { type: "embed", status: "enabled" }
        }
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Retailer"
          name="retailer"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Select style={{ width: 120 }}>
            <Option value="embed">Embed</Option>
            <Option value="general">General</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Key" name="key">
          <Input />
        </Form.Item>
        <Form.Item label="URL" name="url">
          <Input />
        </Form.Item>
        <Form.Item label="Email Address" name="email"
        rules={[{ required: true, message: "Please enter email address" }, { type:"email", message: "Please enter a valid email address"}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Select style={{ width: 120 }}>
            <Option value="enabled">Enabled</Option>
            <Option value="disabled">Disabled</Option>
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          &nbsp;
          <Link href="/admin/accesskeys"><Button>Cancel</Button></Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Page;

export async function getServerSideProps({ query }) {
  const { id } = query;
  
  const QUERY = `
            query GetAccessKey($id: ID!) {
                accessKey(id: $id) {
                _id
                retailer
                type
                status
                key
                url
                email
          }
      }`;

  const result = await fetchAPI(QUERY, { variables: { id } });

  return {
    props: {
      result,
    }, // will be passed to the page component as props
  };
}
