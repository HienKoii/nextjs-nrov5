"use client";
import Title from "@/components/Title/Title";
import { Image } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
export default function Home() {
  const slider = [
    {
      src: "/imgs/slider/1.png",
      caption: "Mở thành viên free",
      content: "Mọi người có thể mở thành viên free tại nhà. Server hoàn toàn không mất phí mở thành viên. !",
    },
    {
      src: "/imgs/slider/2.png",
      caption: "Two",
      content: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    },
    {
      src: "/imgs/slider/3.png",
      caption: "Three",
      content: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    },
  ];
  return (
    <>
      <Title title="Thông tin" />
      <Carousel>
        {slider?.map((item, index) => {
          return (
            <Carousel.Item key={index}>
              <Image
                className="d-block w-100"
                src={item.src}
                alt={`slider ${index}`}
                style={{
                  borderRadius: "12px", // Bo tròn góc
                  height: "500px", // Chiều cao cố định
                  objectFit: "cover", // Ảnh không bị méo
                }}
              />
              {/* <Carousel.Caption>
                <h1 className="text-warning">{item.caption}</h1>
                <p className="text-dark fw-bold">{item.content}</p>
              </Carousel.Caption> */}
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
}
