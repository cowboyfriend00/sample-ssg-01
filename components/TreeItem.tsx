import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import ArrowLower from "../icons/icon__arrow-lower.svg";
import ArrowUpper from "../icons/icon__arrow-upper.svg";

const TreeItem = ({ item, selected }: any) => {
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
  // console.log("ArrowUpper");

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
                {collapsed ? (
                  <Image
                    src={ArrowUpper}
                    alt="close button"
                    style={{ cursor: "pointer" }}
                    width={16}
                    height={16}
                  />
                ) : (
                  <Image
                    src={ArrowLower}
                    alt="close button"
                    style={{ cursor: "pointer" }}
                    width={16}
                    height={16}
                  />
                )}
              </div>
              <div
                onClick={(e) => handleClick(e, `${item.slug}`)}
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
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
        <div className={styles.tree}>
          <div
            style={{
              paddingLeft: item.depth * 20 + ArrowUpper.width,
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
            onClick={(e) => handleClick(e, `${item.slug}`)}
          >
            [{item.seq}]_{item.title}
          </div>
        </div>
      )}
    </>
  );
};

export default TreeItem;
