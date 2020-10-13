import { gql, useMutation } from "@apollo/client";
import { Form, Input, Button, Divider, Select, message } from "antd";
import Link from 'next/link'
import { useRouter } from 'next/router'
import Template from '../../../../components/admin/templates/default'
import auth0, { redirect } from '../../../../utils/auth0'
const { Option } = Select

const Page = ({session}) => {
  const router = useRouter()

  const CREATE_CATEGORY = gql`
    mutation CreateCategory($input: CategoryInput) {
      createCategory(input: $input) {
        success
        message
      }
    }
  `;
  const [createCategory, { data }] = useMutation(CREATE_CATEGORY);

  const onFinish = async (values) => {
    console.log(values)
    const response = await createCategory({ variables: { input: values }})

    if (response && response.data.createCategory.success) {
      message.success(response.data.createCategory.message)
      router.push('/admin/catalog/categories')
    } else {
      message.error(response.data.createCategory.message)
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
    <Template session={session}>
    <div className="container">
    <Link href="/admin/catalog/categories">
          <a>Go back to Categories</a>
        </Link>
        <h1>Add new category item</h1>
        <Divider />
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Parent"
          name="parent"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>&nbsp;
          <Link href="/admin/catalog/categories"><Button>Cancel</Button></Link>
        </Form.Item>
      </Form>
    </div>
    </Template>
  );
};

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