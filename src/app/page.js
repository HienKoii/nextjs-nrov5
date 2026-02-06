"use client";
import Posts from "@/components/Posts/Posts";
import Title from "@/components/Title/Title";
import { Image } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
export default function Home() {
  const slider = [
    {
      src: "/imgs/slider/4.png",
      caption: "Mở thành viên free",
      content: "Mọi người có thể mở thành viên free tại nhà. Server hoàn toàn không mất phí mở thành viên. !",
    },
    {
      src: "/imgs/slider/5.png",
      caption: "Two",
      content: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    },
    {
      src: "/imgs/slider/6.png",
      caption: "Three",
      content: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    },
  ];
  return (
    <>
      <Posts />

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
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
}
