import React, { useState } from "react";
import ArrowLower from "../icons/icon__arrow-lower.svg";
import ArrowUpper from "../icons/icon__arrow-upper.svg";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
const TreeItem = ({ item }: any) => {
  const [params, setParams] = useState<any>();
  const router = useRouter();
  const handleClick = (e: any, slug: string) => {
    const params = {
      searchKeyword: "markdown",
      treeParam: { selected: true, treeId: "a" },
      url: slug,
    };
    setParams(params);
    router.push(params.url);
  };
  const [collapsed, setCollapsed] = useState(false);

  // console.log("TreeItem", item);
  // console.log("depth", item.depth);
  function toggleCollapse() {
    setCollapsed((prevValue) => !prevValue);
  }
  return (
    <>
      {item.childNodes.length > 0 ? (
        <>
          <div style={{ paddingLeft: item.depth * 20 }}>
            <div className={styles.tree}>
              <div onClick={toggleCollapse}>
                {collapsed ? <ArrowUpper /> : <ArrowLower />}
              </div>
              <div onClick={(e) => handleClick(e, `${item.slug}`)}>
                [{item.seq}]_
                {item.title}
              </div>
            </div>
          </div>
          <div
            style={{
              maxHeight: collapsed ? "100%" : "0",
              display: collapsed ? "contents" : "none",
            }}
          >
            {item.childNodes.map((child: any, index: number) => (
              <TreeItem key={index} item={child} />
            ))}
          </div>
        </>
      ) : (
        <div
          className={styles.tree}
          style={{ paddingLeft: item.depth * 20 + ArrowUpper().props.width }}
          onClick={(e) => handleClick(e, `${item.slug}`)}
        >
          [{item.seq}]_{item.title}
        </div>
      )}
    </>
  );
};

export default TreeItem;
