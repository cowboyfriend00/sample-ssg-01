// import useSWR from "swr";
import React, { FormEvent, useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import { PostType } from "../interfaces/postType";
import Link from "next/link";
import Profile from "./Profile";
import SearchComp from "./Search";

export const Layout = ({
  children,
  pageProps,
  routerInfo,
}: {
  children: React.ReactNode;
  pageProps: any;
  routerInfo: Router;
}) => {
  // console.log("router", routerInfo);
  // const { data, error } = useSWR("/api/navigation");

  // if (error) return <div>Failed to load</div>;
  // if (!data) return <div>Loading...</div>;
  // console.log("Layout : pageProps", pageProps);
  const posts = pageProps.posts || [];

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div
        style={{
          width: "300px",
          backgroundColor: "#ffffff",
          color: "black",
          padding: "20px",
        }}
      >
        <SearchComp initialPosts={posts} />
      </div>
      <main>{children}</main>
    </div>
  );
};
