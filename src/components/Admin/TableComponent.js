import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TableComponent = ({ data, columns }) => {
  console.log('columns', columns)
  console.log('data', data)
  return (
    <table className="table table-bordered table-hover">
      <thead className="table-dark">
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{row[col.field]}</td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="text-center">
              Không có dữ liệu
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableComponent;
