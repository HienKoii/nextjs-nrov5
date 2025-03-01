import { useState, useEffect } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import Logo from "../Logo/Logo";
import Link from "next/link";

export default function NotificationModal() {
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    setModalShow(true); // Chỉ mở modal sau khi client đã render
  }, []);

  return (
    <Modal
      show={modalShow} //
      onHide={() => setModalShow(false)}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="hk"
    >
      <Modal.Body className="hk text-center">
        <div className="hk-flex mb-2">
          <Logo width={255} />
        </div>
        <h5>Thông báo</h5>
        <p>
          Chào mừng đến với máy chủ <span className="text-black fw-bold">Ngọc Rồng lậu</span>
        </p>
        <div className="hk-flex-col-y gap-2">
          <Button variant="danger" as={Link} href="/">Tham gia box zalo</Button>
          <Button variant="danger" onClick={() => setModalShow(false)}>Đóng</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
