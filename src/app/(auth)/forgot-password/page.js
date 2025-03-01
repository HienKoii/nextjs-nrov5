"use client";
import { useState } from "react";
import { Form, Button, Container, Spinner, Card } from "react-bootstrap";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <Container className="p-3">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail" className="mb-3">
          <Form.Label className="text-warning">Nhập email của bạn</Form.Label>
          <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <div className="hk-flex">
          <Button variant="success" type="submit" disabled={loading}>
            {loading && <Spinner animation="border" variant="light" size="sm" />} Gửi liên kết đặt lại mật khẩu
          </Button>
        </div>
      </Form>
      <Card className="text-warning mt-2 fw-bold p-2" style={{ backgroundColor: "#fce5e5" }}>
        <p>- Yêu cầu là email thật và đã liên kết với tài khoản.</p>
        <p>- Sau khi gửi liên kết hãy vào hộp thư kiểm tra (có thể ở thư rác).</p>
        <p>- Sau khi thấy email hãy ấn vào link đó để đổi mật khẩu !</p>
        <p>- Chúc các bạn chơi game vui vẻ</p>
      </Card>
    </Container>
  );
}
