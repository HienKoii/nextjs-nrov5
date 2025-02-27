import React from "react";
import { Table } from "react-bootstrap";

export default function GiftCodePage() {
  return (
    <Table responsive="sm" className="transparent-table">
      <thead>
        <tr>
          <th className="text-warning">STT</th>
          <th className="text-warning">Code</th>
          <th className="text-warning">HSD</th>
        </tr>
      </thead>
      <tbody >
        <tr>
          <td className="text-white">1</td>
          <td className="text-white">Table cell</td>
          <td className="text-white">Table cell</td>
        </tr>
        <tr>
          <td className="text-white">2</td>
          <td className="text-white">Table cell</td>
          <td className="text-white">Table cell</td>
        </tr>
        <tr>
          <td className="text-white">3</td>
          <td className="text-white">Table cell</td>
          <td className="text-white">Table cell</td>
        </tr>
      </tbody>
    </Table>
  );
}
