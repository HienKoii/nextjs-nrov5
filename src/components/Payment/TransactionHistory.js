"use client";
import { formatCurrency, formatStatusCard, formatTime } from "@/lib/utils";
import { Badge, Button, Table } from "react-bootstrap";
import Title from "../Title/Title";
import axios from "axios";

export default function TransactionHistory({ history, historyAtm }) {
  const fetchAutoDeposit = async () => {
    try {
      const res = await axios.post("/api/payment/atm");
      console.log("Kết quả cộng tiền: ", res.data);
    } catch (error) {
      console.error("Fetch history error:", error);
    }
  };

  return (
    <>
      <div>
        <Button onClick={() => fetchAutoDeposit()}>Kiểm tra</Button>
        <Title title={"Lịch sử nạp thẻ"} />

        {history && history.length > 0 ? (
          <Table striped className="m-0 transparent-table transaction-history" style={{ borderRadius: "8px" }} responsive="lg">
            <thead>
              <tr>
                <th className="text-warning">Trạng Thái</th>
                <th className="text-warning">Nhận</th>
                <th className="text-warning">Khai</th>
                <th className="text-warning">Nhà Mạng</th>
                <th className="text-warning">Mã Thẻ</th>
                <th className="text-warning">Serial</th>
                <th className="text-warning">Thời Gian</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record, index) => (
                <tr key={index}>
                  <td>
                    <Badge //
                      bg={record?.status === 1 || record?.status === 2 ? "success" : "danger"}
                    >
                      {formatStatusCard(record.status)}
                    </Badge>
                  </td>
                  <td className="text-white">{record?.amount ? formatCurrency(record.value) : 0}</td>
                  <td className="text-white">{formatCurrency(record?.declared_value)}</td>
                  <td className="text-white">{record?.telco}</td>
                  <td className="text-white">{record?.code}</td>
                  <td className="text-white">{record?.serial}</td>
                  <td className="text-white">{formatTime(record?.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-center text-warning"> Chưa có giao dịch nào !!!!</p>
        )}
      </div>

      <div className="mt-5">
        <Title title={"Lịch sử nạp atm"} />
        {historyAtm && historyAtm.length > 0 ? (
          <Table striped hover className="m-0 transparent-table transaction-history" style={{ borderRadius: "8px" }} responsive="lg">
            <thead>
              <tr>
                <th className="text-warning">STT</th>
                <th className="text-warning">VNĐ</th>
                <th className="text-warning">Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {historyAtm.map((record, index) => (
                <tr key={index}>
                  <td className="text-white">{index + 1}</td>
                  <td className="text-white">{formatCurrency(record?.amount)}</td>
                  <td className="text-white">{formatTime(record?.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-center text-warning"> Chưa có giao dịch nào !!!!</p>
        )}
      </div>
    </>
  );
}
