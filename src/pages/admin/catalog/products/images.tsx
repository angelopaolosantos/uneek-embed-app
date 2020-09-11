import { Form, Input, Button, Divider, Select, message } from "antd";
import { useState } from 'react'
import axios, { post } from 'axios';

const Page = () => {
    const [file, setFile] = useState(null)

    const onFinish = (data) => {
        console.log(data)

        fileUpload(file).then((response)=>{
            console.log(response.data)
        })
    }

    const onFinishFailed = () => {
        console.log("Failed Upload")
    }

    const onChange = (e) => {
        setFile(e.target.files[0])
    }

    const fileUpload = (file) =>{
        const url = 'http://localhost:3000/api/upload';
        const formData = new FormData();
        formData.append('file',file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config)
      }

    return (
        <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
            <Form.Item label="Image" name="image"
            rules={[{ required: true, message: "Required" }]}
            >
          <Input type="file" onChange={onChange} />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Button type="primary" htmlType="submit">Add Image</Button>
        </Form.Item>
        </Form>
    )
}

export default Page