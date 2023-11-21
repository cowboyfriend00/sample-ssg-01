import React, { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import { PostType } from "../interfaces/postType";
import Link from "next/link";

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
  const posts = pageProps.posts || [];
  const [params, setParams] = useState<any>();

  const router = useRouter();

  const handleClick = (e: any, slug: string) => {
    const params = {
      searchKeyword: "markdown",
      treeParam: { selected: true, treeId: "a" },
      url: slug,
    };
    setParams(params);
    router.push(params.url).then((res) => {
      console.log("res", res);
    });
  };

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
        <div>왼쪽트리지롱</div>
        {posts.map((post: PostType) => (
          <div
            key={`${post.slug}`}
            onClick={(e) => handleClick(e, `${post.slug}`)}
          >
            {post.slug === params?.url ? `==${post.slug}` : post.slug}
          </div>
          // <div key={post.slug}>
          //   <Link
          //     href={{
          //       pathname: post.slug,
          //       query: { info: "zxcvzxcv" },
          //     }}
          //   >
          //     {post.slug === params?.url ? `==${post.slug}` : post.slug}
          //   </Link>
          // </div>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};
