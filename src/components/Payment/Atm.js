import { formatCurrency } from "@/lib/utils";
import React, { useState } from "react";
import { Button, Col, Image, Row, Table } from "react-bootstrap";
import TextDivider from "../Divider/TextDivider";
import Link from "next/link";

export default function PaymentAtm() {
  const [selectedValue, setSelectedValue] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const napTheValues = [
    { value: 10000, receive: 10000 },
    { value: 20000, receive: 20000 },
    { value: 50000, receive: 50000 },
    { value: 100000, receive: 100000 },
    { value: 200000, receive: 200000 },
    { value: 500000, receive: 500000 },
    { value: 1000000, receive: 1000000 },
    { value: 2000000, receive: 2000000 },
    { value: 5000000, receive: 5000000 },
    { value: 10000000, receive: 10000000 },
  ];

  const handlePayment = () => {
    if (selectedValue) {
      setShowPayment(!showPayment);
    }
  };

  return (
    <>
      {!showPayment ? (
        <>
          {selectedValue && <p className="text-center fw-bold text-white">Bạn đang chọn mốc nạp: {formatCurrency(selectedValue)}đ </p>}
          <Row className="justify-content-center  mt-3">
            {napTheValues.map((item, index) => {
              return (
                <Col key={index} xs={6} md={3} className="mb-3">
                  <div
                    className={`recharge-method-item fw-semibold text-center ${selectedValue === item.value ? "active" : ""}`}
                    onClick={() => setSelectedValue(item.value)}
                    style={{ cursor: "pointer", padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}
                  >
                    <p>{formatCurrency(item.value)}đ</p>
                    <TextDivider text={"Nhận"} color={"danger"} />
                    <p className="text-primary">{formatCurrency(item.receive)} vnđ</p>
                  </div>
                </Col>
              );
            })}
          </Row>
          <Button
            variant="success"
            className="w-100" //
            onClick={handlePayment}
            disabled={!selectedValue}
          >
            {selectedValue ? "Thanh toán" : " Vui lòng chọn 1 gói bất kì "}
          </Button>
          <div className="hk-flex p-2 mt-2">
            <Link href={"/"} className="text-warning">
              Kiểm tra lịch sử nạp
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center fw-semibold text-white">
          <Table responsive="sm" hover className="transparent-table">
            <tbody>
              <tr>
                <td className="text-white">Ngân hàng</td>
                <td className="text-white">Table cell</td>
              </tr>
              <tr>
                <td className="text-white">Chủ tài khoản</td>
                <td className="text-white">Table cell</td>
              </tr>
              <tr>
                <td className="text-white">Số tài khoản</td>
                <td className="text-white">Table cell</td>
              </tr>
              <tr>
                <td className="text-white">Số tiền</td>
                <td className="text-white">Table cell</td>
              </tr>
              <tr>
                <td className="text-white">Nội dung</td>
                <td className="text-white">Table cell</td>
              </tr>
            </tbody>
          </Table>
          <div>
            <p className="fs-5">Quét mã để thanh toán</p>
            <Image
              src="https://img.vietqr.io/image/VCB-7377912172763-qr_only.png?&addInfo=naptien 104625&accountName=VO CONG NHAM"
              alt="qr" //
              width={250}
            />
          </div>
          <div className="hk-flex p-2 mt-2">
            <Link href={"/"} className="text-warning">
              Kiểm tra lịch sử nạp
            </Link>
          </div>
          <p className="fs-6 mt-3">
            - Lưu ý khi thanh toán: Giao dịch trên hoàn toàn được kiểm duyệt tự động, yêu cầu kiểm tra kỹ nội dung chuyển tiền trước khi thực hiện chuyển. Nếu ghi thiếu, sai hoặc quá 10 phút không thấy cộng tiền, các bạn
            hãy liên hệ với Admin để được hỗ trợ
          </p>
        </div>
      )}
    </>
  );
}
