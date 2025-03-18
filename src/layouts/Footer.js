import useConfig from "@/hooks/useConfig";
import { Card } from "react-bootstrap";

export default function Footer() {
  const { config } = useConfig();
  return (
    <Card>
      <Card.Body className="text-white text-center">
        <span className="text-warning">{config?.nameServer}</span>
        <br />
        <p>Trò chơi không bản quyền</p>
        <p>Vui lòng cân nhắc trước khi chơi</p>
        <div className="hk-flex gap-1">
          <span> 2025 © Web được code bởi: </span>
          <span className="fw-bold text-warning">HK</span>
        </div>
      </Card.Body>
    </Card>
  );
}
