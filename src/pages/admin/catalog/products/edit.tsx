import { fetchAPI } from "../../../../contexts/apollo/fetchAPI";
import { gql, useMutation } from "@apollo/client";
import { Form, Input, Button, Divider, Select, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import Template from '../../../../components/admin/templates/default'
import auth0, { redirect } from '../../../../utils/auth0'

const { Option } = Select;
const { TextArea } = Input;

const Page = ({ result, session }) => {
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
    const id = result.product._id;
    console.log(values)
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
    <Template session={session} >
    <div className="container">
    <Link href="/admin/catalog/products"><a>Go Back to Products</a></Link>
      <h1>Edit Product</h1>
      <Form
        {...layout}
        name="basic"
        initialValues={result && result.product ? { ...result.product } : {}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="SKU"
          name="sku"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input style={{ width: 250 }} />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Select style={{ width: 120 }}>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={4} />
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
        <Form.Item label="Class" name="class">
          <Input style={{ width: 250 }} />
        </Form.Item>
        <Form.Item label="Collection" name="collection">
          <Input style={{ width: 250 }} />
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
        <Form.Item label="Gemstone" name="gemstone">
          <Input style={{ width: 250 }} />
        </Form.Item>
        <Form.Item label="Center Stone" name="center_stone">
          <Input style={{ width: 250 }} />
        </Form.Item>
        <Form.Item label="Center Size" name="center_size">
          <Input style={{ width: 250 }} />
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
        
        <Form.Item label="Price" name="price">
          <Input style={{ width: 100 }} />
        </Form.Item>
        <Form.Item label="Meta Keyword" name="meta_keyword">
          <Input style={{ width: 250 }} />
        </Form.Item>
        <Form.Item label="Meta Description" name="meta_description">
        <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Meta Title" name="meta_title">
          <Input style={{ width: 250 }} />
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
      <Divider></Divider>
      <div>
      <h3>Images</h3>
      <img src={result.product.primary_image} width="100" />
      <Link href={`/admin/catalog/products/images/?id=${result.product._id}`}><Button>Update Images</Button></Link>
      </div>
      <Divider></Divider>
      <div><h3>Categories</h3> <ul>{ result.product.category.map((data)=>{
      return (<li>{data}</li>)
      })
      }
      </ul>
      <Link href={`/admin/catalog/products/editCategories/?id=${result.product._id}`}><Button>Update Categories</Button></Link>
      </div>
    </div>
    </Template>
  );
};

export default Page;

export async function getServerSideProps({ query, res, req }) {
  const session = await auth0.getSession(req)
  // check if user is logged in
  if (!session && res) {
    redirect(res, '/admin')
    return {}
  }
  
  const { id } = query;

  const QUERY = `
            query GetProduct($id: String!) {
                product(search: $id, by: "id") {
                  _id
                  thumbnail
                  sku
                  name
                  description
                  product_type
                  class
                  collection
                  category
                  options {
                    name
                    value
                  }
                  details {
                    name
                    value
                  }
                  gender
                  price
                  status
                  metal
                  center_size
                  center_shape
                  side_stone_weight
                  side_stone_pieces
                  primary_image
                  images
                  gemstone
                  center_stone
                  url
                  meta_keyword
                  meta_description
                  meta_title
                  related_products {
                    sku
                    primary_image
                  }
                  tags
          }
      }`;

  const result = await fetchAPI(QUERY, { variables: { id } });

  return {
    props: {
      result,
      session
    }, // will be passed to the page component as props
  };
}
