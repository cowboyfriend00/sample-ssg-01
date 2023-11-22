import React, { useState } from "react";
import TreeItem from "./TreeItem";
import { useRouter } from "next/router";

const Tree = ({ posts }: any) => {
  // console.log("Treeposts", posts);

  const nest = (
    posts: any,
    id = "__posts",
    parentId = "parentId",
    depth = 0
  ) => {
    // console.log("=========== " + depth + " / " + id + " ===========");
    // console.log("posts", posts);

    const result = posts
      .filter((item: any) => {
        // console.log("item", item);
        // console.log("slug", slug);
        // console.log("item[parentId]", item[parentId]);
        return item[parentId] === id;
      })
      .map((item: any) => ({
        ...item,
        depth: depth,
        childNodes: nest(
          posts.filter((item: any) => {
            return item[parentId] !== id;
          }),
          item.id,
          parentId,
          depth + 1
        ),
      }))
      .sort((post1: any, post2: any) => (post1.seq < post2.seq ? -1 : 1));
    // console.log("result", result);
    return result;
  };
  const tree = nest(posts);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {tree?.map((subItem: any, index: any) => (
        <TreeItem item={subItem} key={index} />
      ))}
    </div>
  );
};

export default Tree;
