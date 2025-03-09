"use client";
import Title from "@/components/Title/Title";
import { formatTime } from "@/lib/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Spinner, Image } from "react-bootstrap";

export default function GiftCodePage() {
  const [giftCodes, setGiftCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGiftCodes = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/giftcode");
        console.log("Lấy danh sách giftcode", response.data);
        setGiftCodes(response.data); // Giả sử API trả về một mảng giftcode
      } catch (error) {
        console.error("Lỗi khi lấy danh sách giftcode", error);
        setGiftCodes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGiftCodes();
  }, []);

  return (
    <>
      <Title title="GiftCode" />
      {loading ? (
        <div className="text-center my-3">
          <Spinner animation="border" variant="light" />
        </div>
      ) : (
        <Table responsive="sm" className="transparent-table">
          <thead>
            <tr>
              <th className="text-warning">STT</th>
              <th className="text-warning">Code</th>
              <th className="text-warning">Danh sách vật phẩm</th>
              <th className="text-warning">HSD</th>
            </tr>
          </thead>
          <tbody>
            {giftCodes.length > 0 ? (
              giftCodes.map((gift, index) => (
                <tr key={gift.id || index}>
                  <td className="text-white">{index + 1}</td>
                  <td className="text-white">{gift.code}</td>
                  <td className="text-white">
                    {gift?.detail?.length > 0 ? (
                      <>
                        <div>
                          {gift.detail.map((item) => (
                            <div key={item.id} className="mb-1">
                              <Image src={`api/icon?id=${item.icon}`} alt={item.icon} width={30} height={30} className="me-2" />
                              {item.name} (x{item.quantity})
                            </div>
                          ))}
                        </div>
                        <br />
                      </>
                    ) : (
                      "Không có vật phẩm"
                    )}
                  </td>
                  <td className="text-white">{formatTime(gift.expired)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-danger">
                  Không có giftcode nào
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </>
  );
}
