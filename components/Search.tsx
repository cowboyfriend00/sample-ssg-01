import React, { useState, useEffect, FormEvent } from "react";
import { PostType } from "../interfaces/postType";
import Tree from "./Tree";
import { treeMaker } from "../lib/treeMaker";
import { useRouter } from "next/router";

function SearchComp({ initialPosts }: any) {
  // console.log("initialPosts", initialPosts);
  const [posts, setPosts] = useState<PostType[]>(initialPosts);
  const [searchPosts, setSearchPosts] = useState<PostType[]>();
  const [tree, setTree] = useState<any>();
  const [params, setParams] = useState<any>();
  const [selected, setSelected] = useState<string>();
  const router = useRouter();
  useEffect(() => {
    if (posts.length === 0) setPosts(initialPosts);
  }, [initialPosts]);

  useEffect(() => {
    setTree(treeMaker(posts));
  }, [posts]);

  useEffect(() => {
    setSelected(params?.url);
    console.log("selected", selected);
  }, [params]);
  const onChangeSearch = (event: any) => {
    event.preventDefault();
    const searchKeyword = event.currentTarget.value;
    if (searchKeyword !== "") {
      const result = initialPosts.filter((post: any) =>
        post.title.includes(searchKeyword)
      );
      // console.log("onChangeSearch : searchKeyword", searchKeyword);
      // console.log("onChangeSearch : result", result);
      setSearchPosts(result);
    } else {
      setSearchPosts(undefined);
    }

    // console.log("onChangeSearch : posts", posts);
  };

  const handleClick = (e: any, slug: string) => {
    const params = {
      searchKeyword: "markdown",
      treeParam: { selected: true, treeId: "a" },
      url: slug,
    };
    setParams(params);

    router.push(params.url);
  };
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        width: "250px",
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
      {
        searchPosts ? (
          searchPosts?.map((post) => (
            <div
              key={`${post.slug}`}
              onClick={(e) => handleClick(e, `${post.slug}`)}
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                padding: "0px 0px 10px 0px",
              }}
            >
              {selected === post.slug ? (
                <div style={{ backgroundColor: "#f23123" }}>
                  [{post.seq}]_{post.title}
                </div>
              ) : (
                <div>
                  [{post.seq}]_{post.title}
                </div>
              )}
            </div>
          ))
        ) : (
          <Tree tree={tree} selected={selected} />
        )
        //     searchPosts?.map((post: PostType) => (
        //   <div
        //     key={`${post.slug}`}
        //     onClick={(e) => handleClick(e, `${post.slug}`)}
        //     style={{
        //       textOverflow: "ellipsis",
        //       overflow: "hidden",
        //       whiteSpace: "nowrap",
        //     }}
        //   >
        //     {post.slug === params?.url ? `<<${post.title}>>` : post.title}
        //   </div>
        //   // <div key={post.slug}>
        //   //   <Link
        //   //     href={{
        //   //       pathname: post.slug,
        //   //       query: { info: "zxcvzxcv" },
        //   //     }}
        //   //   >
        //   //     {post.slug === params?.url ? `==${post.slug}` : post.slug}
        //   //   </Link>
        //   // </div>
        // ))
      }
    </div>
  );
}

export default SearchComp;
