"use client";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import { Button, Card, Image } from "react-bootstrap";
import Header from "@/layouts/Header";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import { useState } from "react";
import NotificationModal from "@/components/NotificationModal";
export default function Home() {
  return (
    <div>
      {/* <FileUploaderRegular
        sourceList="local, camera" //
        cameraModes="photo, video"
        classNameUploader="uc-light"
        pubkey="2cd5453617104898456f"
      /> */}
      {/* <button className="btn btn-menu btn-success w-100 fw-semibold">test</button> */}
    
      <Card.Title className="text-white">Bài viết mới</Card.Title>
      <hr />
      <div>
        <div className="post-item gap-2 d-flex align-items-center my-2">
          <div className="post-image">
            <Image src="/imgs/avt.gif" alt="post" width={52} />
          </div>
          <div>
            <div className="hk-flex gap-2">
              <Link href={"/"} className="fw-bold text-danger">
                BẢNG XẾP HẠNG
              </Link>
              <div className="hk-flex gap-2">
                <Image src="/imgs/hot.gif" alt="hot" width={28} />
                <Image src="/imgs/new.gif" alt="new" width={28} />
              </div>
            </div>

            <div className="text-muted font-weight-bold">
              Đã đăng bởi <span className="text-danger fw-bold">Admin</span>
            </div>
          </div>
        </div>

        <div className="post-item gap-2 d-flex align-items-center my-2">
          <div className="post-image">
            <Image src="/imgs/avt.gif" alt="post" width={52} />
          </div>
          <div>
            <div className="hk-flex gap-2">
              <Link href={"/"} className="fw-bold text-danger">
                BẢNG XẾP HẠNG
              </Link>
              <div className="hk-flex gap-2">
                <Image src="/imgs/hot.gif" alt="hot" width={28} />
                <Image src="/imgs/new.gif" alt="new" width={28} />
              </div>
            </div>
            <div className="text-muted font-weight-bold">
              Đã đăng bởi <span className="text-danger fw-bold">Admin</span>
            </div>
          </div>
        </div>

        <div className="post-item gap-2 d-flex align-items-center my-2">
          <div className="post-image">
            <Image src="/imgs/avt.gif" alt="post" width={52} />
          </div>
          <div>
            <div className="hk-flex gap-2">
              <Link href={"/"} className="fw-bold text-danger">
                BẢNG XẾP HẠNG
              </Link>
              <div className="hk-flex gap-2">
                <Image src="/imgs/hot.gif" alt="hot" width={28} />
                <Image src="/imgs/new.gif" alt="new" width={28} />
              </div>
            </div>
            <div className="text-muted font-weight-bold">
              Đã đăng bởi <span className="text-danger fw-bold">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
