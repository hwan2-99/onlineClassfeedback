import { Button, Modal } from "antd";
import React, { useState } from "react";

const RegisterModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        강의 신청하기
      </Button>
      <Modal
        title="강의 신청하기"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {props.children}
      </Modal>
    </>
  );
};

export default RegisterModal;
