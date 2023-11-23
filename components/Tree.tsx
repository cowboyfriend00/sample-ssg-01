import React, { useState } from "react";
import TreeItem from "./TreeItem";
import { useRouter } from "next/router";
import { treeMaker } from "../lib/treeMaker";

const Tree = ({ tree, selected }: any) => {
  // console.log("Treeposts", posts);

  // const tree = treeMaker(posts);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {tree?.map((subItem: any, index: any) => (
        <TreeItem item={subItem} key={index} selected={selected} />
      ))}
    </div>
  );
};

export default Tree;
