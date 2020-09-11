import { fetchAPI } from "../../../../contexts/apollo/fetchAPI";
import { gql, useMutation } from "@apollo/client";
import { Form, Input, Button, Divider, Select, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
const { Option } = Select;
const { TextArea } = Input;

const Page = ({ result }) => {
  console.log(result);

  const router = useRouter();

  const EDIT_PRODUCT = gql`
    mutation EditProduct($id: ID!, $input: ProductInput) {
      updateProduct(id: $id, input: $input) {
        success
        message
      }
    }
  `;
  const [editProduct, { data }] = useMutation(EDIT_PRODUCT);

  const onFinish = async (values) => {
    const id = result.productById._id;
    console.log(id)
    const response = await editProduct({ variables: { id, input: values } });

    if (response && response.data.updateProduct.success) {
      message.success(response.data.updateProduct.message);
      // router.push("/admin/catalog/products");
    } else {
      message.error(response.data.updateProduct.message);
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
      <h1>Edit Product</h1>
      <Divider />
      <img src={result.productById.images} width="250" />
      <Button>Update Images</Button>
      <Form
        {...layout}
        name="basic"
        initialValues={result && result.productById ? { ...result.productById } : {}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="SKU"
          name="sku"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Select style={{ width: 120 }}>
            <Option value="TRUE">Enabled</Option>
            <Option value="FALSE">Disabled</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Images" name="images">
          <Input />
        </Form.Item>
        <Form.Item label="Product Type" name="product_type">
          <Select style={{ width: 200 }}>
            <Option value="Engagement Ring">Engagement Ring</Option>
            <Option value="Wedding Band">Wedding Band</Option>
            <Option value="Fashion Ring">Fashion Ring</Option>
            <Option value="Earrings">Earrings</Option>
            <Option value="Pendant">Pendant</Option>
            <Option value="Bracelet">Bracelet</Option>
            <Option value="Bangle">Bangle</Option>
            <Option value="Accessory">Accessory</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Category" name="category">
          <Input />
        </Form.Item>
        <Form.Item label="Gender" name="gender">
          <Select style={{ width: 120 }}>
            <Option value="Ladies">Ladies</Option>
            <Option value="Mens">Mens</Option>
            <Option value="Unisex">Unisex</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Metal" name="metal">
          <Select style={{ width: 200 }}>
            <Option value="14k White Gold">14k White Gold</Option>
            <Option value="14k Yellow Gold">14k Yellow Gold</Option>
            <Option value="14k Rose Gold">14k Rose Gold</Option>
            <Option value="18k White Gold">18k White Gold</Option>
            <Option value="18k Yellow Gold">18k Yellow Gold</Option>
            <Option value="18k Rose Gold">18k Rose Gold</Option>
            <Option value="Silver">Silver</Option>
            <Option value="Platinum">Platinum</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Center Size" name="center_size">
          <Input />
        </Form.Item>
        <Form.Item label="Center Shape" name="center_shape">
          <Select style={{ width: 120 }}>
          <Option value="">-</Option>
            <Option value="Asscher">Asscher</Option>
            <Option value="Cushion">Cushion</Option>
            <Option value="Emerald">Emerald</Option>
            <Option value="Heart">Heart</Option>
            <Option value="Marquise">Marquise</Option>
            <Option value="Oval">Oval</Option>
            <Option value="Pear">Pear</Option>
            <Option value="Princess">Princess</Option>
            <Option value="Radiant">Radiant</Option>
            <Option value="Round">Round</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Side Stone Weight" name="side_stone_weight">
          <Input />
        </Form.Item>
        <Form.Item label="Side Stone Pieces" name="side_stone_pieces">
          <Input />
        </Form.Item>
        <Form.Item label="Gemstone" name="gemstone">
          <Input />
        </Form.Item>
        <Form.Item label="Center Stone" name="center_stone">
          <Input />
        </Form.Item>
        <Form.Item label="Price" name="price">
          <Input />
        </Form.Item>
        <Form.Item label="Meta Keyword" name="meta_keyword">
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          &nbsp;
          <Link href="/admin/catalog/products">
            <Button>Cancel</Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Page;

export async function getServerSideProps({ query }) {
  const { id } = query;

  const QUERY = `
            query GetProduct($id: ID!) {
                productById(id: $id) {
                  _id
                  thumbnail
                  sku
                  name
                  description
                  product_type
                  category
                  gender
                  price
                  status
                  metal
                  center_size
                  center_shape
                  side_stone_weight
                  side_stone_pieces
                  images
                  gemstone
                  center_stone
                  url
                  meta_keyword
                  meta_description
                  meta_title
          }
      }`;

  const result = await fetchAPI(QUERY, { variables: { id } });

  return {
    props: {
      result,
    }, // will be passed to the page component as props
  };
}
