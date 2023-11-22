import React, { useState, useEffect, FormEvent } from "react";
import { PostType } from "../interfaces/postType";
import Tree from "./Tree";

function SearchComp({ initialPosts }: any) {
  const [posts, setPosts] = useState<PostType[]>(initialPosts);

  // console.log("initialPosts", initialPosts);
  const onChangeSearch = (event: any) => {
    event.preventDefault();
    const searchKeyword = event.currentTarget.value;
    const result = initialPosts.filter((post: any) =>
      post.title.includes(searchKeyword)
    );
    // console.log("onChangeSearch : searchKeyword", searchKeyword);
    // console.log("onChangeSearch : result", result);
    setPosts(result);
    // console.log("onChangeSearch : posts", posts);
  };
  useEffect(() => {}, [posts]);
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        minWidth: "250px",
        backgroundColor: "#ffffff",
        color: "black",
        padding: "20px",
      }}
    >
      <div style={{ paddingBottom: "10px", borderBottom: "1px solid #000000" }}>
        <input
          type="text"
          name="searchKeyword"
          style={{ width: "-webkit-fill-available" }}
          placeholder={"검색어를 입력하세요"}
          onChange={onChangeSearch}
        />
      </div>
      {posts && posts.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px 0",
          }}
        >
          Menu
        </div>
      )}
      {/*{posts.map((post: PostType) => (*/}
      {/*  <div*/}
      {/*    key={`${post.slug}`}*/}
      {/*    onClick={(e) => handleClick(e, `${post.slug}`)}*/}
      {/*    style={{*/}
      {/*      textOverflow: "ellipsis",*/}
      {/*      overflow: "hidden",*/}
      {/*      whiteSpace: "nowrap",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    {post.slug === params?.url ? `<<${post.title}>>` : post.title}*/}
      {/*  </div>*/}
      {/*  // <div key={post.slug}>*/}
      {/*  //   <Link*/}
      {/*  //     href={{*/}
      {/*  //       pathname: post.slug,*/}
      {/*  //       query: { info: "zxcvzxcv" },*/}
      {/*  //     }}*/}
      {/*  //   >*/}
      {/*  //     {post.slug === params?.url ? `==${post.slug}` : post.slug}*/}
      {/*  //   </Link>*/}
      {/*  // </div>*/}
      {/*))}*/}
      <Tree posts={posts} />
    </div>
  );
}

export default SearchComp;
