import axios from "axios";
import { Form, Input, Button, Checkbox, Card } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { authenticate, isAuth } from "../helpers/auth";
import { useDataLayerValue } from "../utils/DataLayer";

function Login({ history, setLoggedIn, loginToast }) {
  const SERVER_URL = "http://localhost:4000/api";

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };
  const tailLayout = {
    wrapperCol: { offset: 5, span: 19 },
  };

  const handleLogin = async (data) => {
    // console.log(data); //email, password
    try {
      const response = await axios.post(`${SERVER_URL}/login`, data);
      authenticate(response, () => {
        if (isAuth()) {
          console.log(response.data.msg);
          // toast.success(response.data.msg);
          loginToast();
          setLoggedIn(true);
          history.push("/");
        } else {
          console.log("user is not auth yet");
        }
      });
    } catch (error) {
      // console.log(error.response.data);
      toast.error(error.response.data.error);
      toast.error(error.response.data.msg);
    }
  };
  return (
    <div className="loginPage" style={{ marginTop: 50 }}>
      <ToastContainer />
      <Card title="Login" style={{ width: 500, margin: "0 auto" }}>
        <Form name="loginForm" {...layout} onFinish={handleLogin}>
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
          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remeber me</Checkbox>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
