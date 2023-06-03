import React from "react";
import { useSelector } from "react-redux";
import { Button, Form, Input } from "antd";
import profHandler from "../../lib/handler/profHandler";

const ClassOpen = () => {
  const curNum = useSelector((state) => state.num);

  const onFinish = async (values) => {
    console.log("Success:", values);
    let classInfo = values;
    classInfo.num = curNum;

    const result = await profHandler.classPost(classInfo);

    console.log("통신 결과", result);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h1>강좌 개설하기</h1>
      <hr />
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="강좌명"
          name="course_name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="수용인원"
          name="capacity"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="강의기간"
          name="course_term"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="강의 내용"
          name="course_content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
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
      </Form>
    </div>
  );
};

export default ClassOpen;
