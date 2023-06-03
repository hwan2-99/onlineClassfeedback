import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import userHandler from "../../lib/handler/userHandler";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginForm = (props) => {
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const onLogInHandler = async (value) => {
    let result = await userHandler.login(value);

    console.log(result);

    if (result) {
      dispatch({ type: "login", info: result.data });
      if (result.data.isProf) {
        //교수로 넘어 올 때~
        navigate("/prof", { replace: true });
      } else {
        //학생으로 넘어 올 때~
        navigate("/stud", { replace: true });
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onLogInHandler}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="isProf"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>교수로 로그인 하기</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <Link to={"signup"}>회원가입</Link>
    </Form>
  );
};

export default LoginForm;
