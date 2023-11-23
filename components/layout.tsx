import React, { FormEvent, useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
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
  const posts = pageProps.posts || [];

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <SearchComp initialPosts={posts} />
      <main>{children}</main>
    </div>
  );
};
