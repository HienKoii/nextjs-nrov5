"use client";

import TableComponent from "@/components/Admin/TableComponent";
import { useUser } from "@/context/UserContext";
import { getToken } from "@/lib/utils";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminTypePage() {
  const { type } = useParams();
  const { user } = useUser();
  const router = useRouter();
  const token = getToken();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Redirect nếu không có quyền
  useEffect(() => {
    if (!token || (token && !user?.is_admin)) {
      router.push("/");
    }
  }, [token, user, router]);

  // Fetch dữ liệu khi token sẵn sàng
  useEffect(() => {
    if (!token) return; // Chờ token sẵn sàng

    const fetchDataType = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/admin/${type}?page=${page}&limit=${limit}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(`Lấy data ${type}: `, response.data);
        setData(response.data.data);
        setTotalPages(response.data.pagination.totalPages || 1);

        // Nếu page hiện tại lớn hơn totalPages, quay về totalPages
        if (page > response.data.pagination.totalPages) {
          setPage(response.data.pagination.totalPages);
        }
      } catch (error) {
        console.error(`Lỗi lấy data ${type}`, error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDataType();
  }, [token, type, page, limit]);

  // Xác định cột hiển thị theo type
  const columns = {
    account: [
      { label: "#", field: "id" },
      { label: "Tên tài khoản", field: "username" },
      { label: "Email", field: "email" },
      { label: "Vai trò", field: "is_admin" },
    ],
    revenue: [
      { label: "#", field: "account_id" },
      { label: "Số tiền", field: "declared_value" },
      { label: "Ngày nạp", field: "created_at" },
      { label: "Kiểu nạp", field: "type" }, // 'naptien' hoặc 'napthe'
    ],
    player: [
      { label: "#", field: "id" },
      { label: "Tài khoản ID", field: "account_id" },
      { label: "Tên nhân vật", field: "name" },
      { label: "Điểm số", field: "score" },
      { label: "Cấp độ", field: "level" },
    ],
  };

  const selectedColumns = columns[type] || [];

  // Hàm tạo danh sách trang hiển thị (tối đa 5 nút)
  const getPageNumbers = () => {
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);

    if (end - start < 4) {
      if (start === 1) {
        end = Math.min(5, totalPages);
      } else if (end === totalPages) {
        start = Math.max(1, totalPages - 4);
      }
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Danh sách {type}</h1>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
        </div>
      ) : (
        <>
          <TableComponent data={data} columns={selectedColumns} />

          {/* Phân trang Bootstrap */}
          {totalPages > 1 && (
            <nav>
              <ul className="pagination justify-content-center">
                {/* Nút về trang đầu */}
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setPage(1)}>
                    «
                  </button>
                </li>

                {/* Nút lùi trang */}
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setPage(page - 1)}>
                    ‹
                  </button>
                </li>

                {/* Nút số trang hiển thị */}
                {getPageNumbers().map((p) => (
                  <li key={p} className={`page-item ${page === p ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setPage(p)}>
                      {p}
                    </button>
                  </li>
                ))}

                {/* Nút tiến trang */}
                <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setPage(page + 1)}>
                    ›
                  </button>
                </li>

                {/* Nút về trang cuối */}
                <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setPage(totalPages)}>
                    »
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
