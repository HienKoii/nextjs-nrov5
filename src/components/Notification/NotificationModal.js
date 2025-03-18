import { useState, useEffect } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import Logo from "../Logo/Logo";
import Link from "next/link";
import useConfig from "@/hooks/useConfig";

export default function NotificationModal() {
  const { config } = useConfig();
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    setModalShow(true);
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
      <Modal.Body className="hk">
        <div className="hk-flex mb-2">
          <Logo width={255} />
        </div>
        <h5 className="text-center">Thông báo</h5>
        <div dangerouslySetInnerHTML={{ __html: config?.thongBao?.text }} />
        <div className="hk-flex-col-y gap-2 mt-3">
          {config?.hotLink.map((item, index) => {
            return (
              <Button key={index} variant="success" href={item?.href}>
                {item?.title}
              </Button>
            );
          })}
          <Button variant="success" onClick={() => setModalShow(false)}>
            Đóng
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
