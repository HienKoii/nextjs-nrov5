import Title from "@/components/Title/Title";
import useConfig from "@/hook/useConfig";
import React from "react";
import { Card } from "react-bootstrap";

export default function Introduce() {
  const { config } = useConfig();

  return (
    <Card>
      <Card.Body>
        <Title title={"Giới thiệu"} />
        <div className="text-white">
          <span className="text-warning"> {config?.nameServer} </span> là Trò Chơi Trực Tuyến với cốt truyện xoay quanh bộ truyện tranh 7 viên Ngọc Rồng. Người chơi sẽ hóa thân thành một trong những anh hùng của 4 hành
          tinh: Trái Đất, Xayda, Namếc và Fide Cùng luyện tập, tăng cường sức mạnh và kỹ năng. Đoàn kết cùng chiến đấu chống lại các thế lực hung ác. Cùng nhau tranh tài.
          <br />
          <br />
          <h6 > Đặc điểm nổi bật:</h6>
        - Thể loại hành động, nhập vai. Trực tiếp điều khiển nhân vật hành động. Dễ chơi, dễ điều khiển nhân vật. Đồ họa sắc nét. Có phiên bản đồ họa cao cho điện thoại mạnh và phiên bản pixel cho máy cấu hình
          thấp.
          <br />- Cốt truyện bám sát nguyên tác. Người chơi sẽ gặp tất cả nhân vật từ Bunma, Quy lão kame, Jacky-chun, Tàu Pảy Pảy... cho đến Fide, Pic, Poc, Xên, Broly, đội Bojack.
          <br />
          -Đặc điểm nổi bật nhất: Tham gia đánh doanh trại độc nhãn. Tham gia đại hội võ thuật, Đại chiến vũ trụ. Tham gia săn lùng ngọc rồng để mang lại điều ước cho bản thân.
        </div>
      </Card.Body>
    </Card>
  );
}
