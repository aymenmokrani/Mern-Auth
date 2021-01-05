import axios from "axios";
import { Form, Input, Button, Card } from "antd";
import { ToastContainer, toast } from "react-toastify";

function Register() {
  const SERVER_URL = "http://localhost:4000/api";

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };
  const tailLayout = {
    wrapperCol: { offset: 5, span: 19 },
  };

  const handleRegister = async (data) => {
    try {
      const response = await axios.post(`${SERVER_URL}/register`, data);
      console.log(response.data);
      toast.success("Account created successfully");
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="registerPage" style={{ marginTop: 50 }}>
      <ToastContainer />
      <Card title="Register" style={{ width: 500, margin: "0 auto" }}>
        <Form name="registerForm" {...layout} onFinish={handleRegister}>
          <Form.Item
            label="Full name"
            name="name"
            rules={[
              {
                required: true,
                message: "a name is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "a valid email is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, min: "4", max: "16" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Create Account
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Register;
