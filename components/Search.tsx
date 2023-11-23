import React, { useState, useEffect, FormEvent } from "react";
import { PostType } from "../interfaces/postType";
import Tree from "./Tree";
import { getTreeForm } from "../lib/getTreeForm";
import { useRouter } from "next/router";
import { SelectedTreeItemFlex } from "./TreeItem";
import { Flex } from "../shared/components/Flex";

function SearchComp({ initialPosts }: any) {
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
    setTree(getTreeForm(posts));
  }, [posts]);

  useEffect(() => {
    setSelected(params?.url);
  }, [params]);
  const onChangeSearch = (event: any) => {
    event.preventDefault();
    const searchKeyword = event.currentTarget.value;
    if (searchKeyword !== "") {
      const result = initialPosts.filter((post: any) =>
        post.title.includes(searchKeyword)
      );
      setSearchPosts(result);
    } else {
      setSearchPosts(undefined);
    }
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
        <Flex
          center
          style={{
            padding: "10px 0",
          }}
        >
          Menu
        </Flex>
      )}
      {searchPosts ? (
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
              <SelectedTreeItemFlex>
                [{post.seq}]_{post.title}
              </SelectedTreeItemFlex>
            ) : (
              <div>
                [{post.seq}]_{post.title}
              </div>
            )}
          </div>
        ))
      ) : (
        <Tree tree={tree} selected={selected} handleClick={handleClick} />
      )}
    </div>
  );
}

export default SearchComp;
