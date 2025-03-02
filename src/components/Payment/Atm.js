import { formatCurrency } from "@/lib/utils";
import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import TextDivider from "../Divider/TextDivider";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PaymentAtm() {
  const router = useRouter();

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
      router.push(`/payment/atm?amount=${selectedValue}`);
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
        <> </>
      )}
    </>
  );
}
