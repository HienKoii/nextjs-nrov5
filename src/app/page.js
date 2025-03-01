"use client";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import { Button, Card, Image } from "react-bootstrap";
import Header from "@/layouts/Header";
import Navigation from "@/components/Nav/Navigation";
import Link from "next/link";
import { useState } from "react";
import NotificationModal from "@/components/Notification/NotificationModal";
import Title from "@/components/profile/Title/Title";
import PostsList from "@/components/posts/PostsList";
export default function Home() {
  return (
    <>
      {/* <FileUploaderRegular
        sourceList="local, camera" //
        cameraModes="photo, video"
        classNameUploader="uc-light"
        pubkey="2cd5453617104898456f"
      /> */}
      {/* <button className="btn btn-menu btn-success w-100 fw-semibold">test</button> */}

      <PostsList />
    </>
  );
}
