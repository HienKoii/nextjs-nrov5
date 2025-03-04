"use client";
import { formatCurrency, formatStatusCard, formatTime } from "@/lib/utils";
import { Badge, Table } from "react-bootstrap";
import Title from "../Title/Title";

export default function TransactionHistory({ history }) {
  return (
    <>
      <div>
        <Title title={"Lịch sử nạp thẻ"} />
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
      </div>

      <div className="mt-5">
        <Title title={"Lịch sử nạp atm"} />
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
      </div>
    </>
  );
}
