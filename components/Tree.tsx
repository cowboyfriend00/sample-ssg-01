import React, { useState } from "react";
import TreeItem from "./TreeItem";
import { useRouter } from "next/router";
import { getTreeForm } from "../lib/getTreeForm";

const Tree = ({ tree, selected, handleClick }: any) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {tree?.map((subItem: any, index: any) => (
        <TreeItem
          item={subItem}
          key={index}
          selected={selected}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};

export default Tree;
