import React from "react";
import { Modal, Button, Tooltip } from "antd";
import { DownloadOutlined, CloseOutlined } from "@ant-design/icons";
import "../styles/modal.css";

interface ImageModalProps {
  open: boolean;
  imageUrl: string | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ open, imageUrl, onClose }) => {
  const handleDownload = async () => {
    if (!imageUrl) return;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "image.jpg";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      closable={false}
      width="auto"
    >
      <div className="modal-container">
        <Button
          shape="circle"
          icon={<CloseOutlined />}
          size="large"
          className="modal-close"
          onClick={onClose}
          style={{ top: 10, right: 10 }}
        />
        <Tooltip title="Download">
          <Button
            shape="circle"
            icon={<DownloadOutlined />}
            size="large"
            className="download"
            onClick={handleDownload}
            style={{ top: 10, right: 60 }}
          />
        </Tooltip>
        <img src={imageUrl || ""} alt="" className="modal-img" />
      </div>
    </Modal>
  );
};

export default ImageModal;
