import { Card } from "react-bootstrap";

export default function Footer() {
  return (
    <Card>
      <Card.Body className="text-white text-center">
        <span className="text-warning">Ngọc Rồng Lậu</span>
        <br />
        <div className="hk-flex gap-1">
          <span> 2025 © Được Vận Hành Bởi: </span>
          <span className="fw-bold text-warning">HienKoii</span>
        </div>
      </Card.Body>
    </Card>
  );
}
