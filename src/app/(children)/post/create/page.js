"use client";

import Title from "@/components/Title/Title";
import { useUser } from "@/context/UserContext";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Form, Image, Row, Spinner } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";

export default function PostCreatePage() {
  const router = useRouter();
  const { user } = useUser();

  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false); // Trạng thái tải
  const [selectedImages, setSelectedImages] = useState([]); // Chứa ảnh chưa upload
  const [formData, setFormData] = useState({
    tieude: "",
    noidung: "",
    hot: false,
    new: false,
    images: [], // Danh sách URL ảnh sau khi upload xong
  });

  useEffect(() => {
    if (!token || (token && !user?.is_admin)) {
      router.push("/");
    }
  }, [token, user, router]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files); // Chỉ lưu file, không tải lên vội
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1️⃣ Tải tất cả ảnh lên Uploadcare
      const uploadedImageUrls = await Promise.all(
        selectedImages.map(async (image) => {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("UPLOADCARE_PUB_KEY", "2cd5453617104898456f"); // Thay bằng pubkey của bạn

          const response = await axios.post("https://upload.uploadcare.com/base/", formData);

          return response.data.file ? `https://ucarecdn.com/${response.data.file}/` : null;
        }),
      );
      // 2️⃣ Kiểm tra nếu có ảnh lỗi
      const validImageUrls = uploadedImageUrls.filter((url) => url !== null);
      // 3️⃣ Gửi dữ liệu bài viết sau khi upload xong
      const payload = {
        ...formData,
        images: validImageUrls,
      };

      const postResponse = await axios.post("/api/posts/create", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Kết quả đăng bài viết: ", postResponse);
      if (postResponse.status === 201) {
        router.push("/");
      }
    } catch (error) {
      console.error("Lỗi Uploadcare: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title title={"Đăng bài viết"} />
      <Form onSubmit={handleSubmit} className="p-3">
        <Form.Group controlId="tieude">
          <Form.Label className="text-warning">Tiêu Đề</Form.Label>
          <Form.Control
            type="text"
            name="tieude" //
            value={formData.tieude}
            onChange={handleChange}
            placeholder="Nhập tiêu đề"
            required
          />
        </Form.Group>

        <Form.Group controlId="noidung" className="mt-3">
          <Form.Label className="text-warning">Nội Dung</Form.Label>
          <Form.Control
            as="textarea"
            rows={3} //
            name="noidung"
            value={formData.noidung}
            onChange={handleChange}
            placeholder="Nhập nội dung bài viết"
            required
          />
        </Form.Group>

        <div className="hk-flex gap-2">
          <Form.Group controlId="hot" className="mt-3 d-flex align-items-center">
            <Form.Check type="checkbox" name="hot" checked={formData.hot} onChange={handleChange} label=" " />
            <Image src="/imgs/hot.gif" alt="hot" width={23} height={12} />
          </Form.Group>

          <Form.Group controlId="new" className="mt-3 d-flex align-items-center">
            <Form.Check type="checkbox" name="new" checked={formData.new} onChange={handleChange} label=" " />
            <Image src="/imgs/new.gif" alt="new" width={23} height={12} />
          </Form.Group>
        </div>
        <Form.Group controlId="images" className="mt-3">
          <Form.Label className="text-warning">Chọn ảnh</Form.Label>
          <Form.Control type="file" multiple onChange={handleImageChange} />
        </Form.Group>
        {/* Hiển thị ảnh đã chọn */}
        <Row className="mt-3">
          {formData.images.map((image, index) => (
            <Col key={index} lg={6}>
              <Image
                src={URL.createObjectURL(image)} //
                alt={`selected-${index}`}
                thumbnail
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </Col>
          ))}
        </Row>

        <div className="w-100 hk-flex">
          <Button
            variant="success"
            type="submit" //
            disabled={loading}
            className="mt-3 d-flex align-items-center"
          >
            {loading ? (
              <>
                <Spinner animation="border" variant="light" size="sm" /> Đang đăng...
              </>
            ) : (
              <>
                <FaPaperPlane className="me-2" /> Đăng bài
              </>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}
