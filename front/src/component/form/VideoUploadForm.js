import React, { useRef, useState } from "react";
import { Button, Form, Input, InputNumber, Alert } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Dropzone from "react-dropzone";
import profHandler from "../../lib/handler/profHandler";

let msg = "";

const VideoUpload = (props) => {
  const [form] = Form.useForm();
  const [isUploaded, setUpload] = useState(false);
  const [fileName, setFileName] = useState("");

  const onDrop = async (files) => {
    console.log("Dropped files", files);
    let formData = new FormData();
    formData.append("file", files[0]);

    const result = await profHandler.postVideo(formData);
    console.log(result);
    if (result.success) {
      setUpload(true);
      setFileName(result.fileName);
      msg = `파일명 : ${result.fileName}`;
      return;
    }
  };

  const onSubmitHandler = async (values) => {
    const result = await profHandler.postVideoInfo({
      course_num: props.classnum,
      profnum: props.profnum,
      fileName: fileName,
      ...values,
    });
    console.log(result);
  };

  return (
    <div>
      <h1>강의 업로드</h1>
      <hr />
      <p>비디오를 업로드 하세요..</p>
      <Form form={form} onFinish={onSubmitHandler}>
        {!isUploaded ? (
          <Dropzone
            onDrop={onDrop}
            multiple={false} //한번에 올리는 파일 갯수
            maxSize={100000000}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <Input {...getInputProps()} />
                <UploadOutlined type="plus" style={{ fontSize: "3rem" }} />
              </div>
            )}
          </Dropzone>
        ) : (
          <>
            <br />
            <Alert
              message={msg}
              s
              description={"업로드 성공 !"}
              type="success"
            />
            <br />
          </>
        )}
        <Form.Item name="video_title" label="강의명">
          <Input />
        </Form.Item>
        <Form.Item name="video_order" label="강의 순서">
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            제출
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VideoUpload;
