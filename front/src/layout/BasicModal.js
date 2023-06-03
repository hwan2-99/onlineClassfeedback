import { Button, Modal } from "antd";
import React, { useState } from "react";

const BasicModal = (props) => {
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
        {props.title}
      </Button>
      <Modal
        title={props.title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {props.children}
      </Modal>
    </>
  );
};

export default BasicModal;
