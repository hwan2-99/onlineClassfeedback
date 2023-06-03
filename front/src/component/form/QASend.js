import React from "react";
import { Button, Form, Input, Textarea } from "antd";
import studHandler from "../../lib/handler/studHandler";
import { useForm } from "rc-field-form";

const QASend = (props) => {
  const { sec_num, std, vid, vid_stop_time } = props.info;

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const info = values;
    info.sec_num = sec_num;
    info.studnum = std;
    info.videonum = vid;
    info.video_stop_time = vid_stop_time;
    const result = await studHandler.postQAStud(info);
    form.resetFields();

    if (result.status === 200) {
      alert("Q&A 전송 완료");
    } else {
      alert("오류 발생");
    }

    console.log(result);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      form={form}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: false,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="제목"
        name="qa_title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="질문 내용"
        name="qa_content"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea rows={4} />
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
  );
};

export default QASend;
