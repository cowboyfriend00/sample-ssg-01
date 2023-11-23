import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import ArrowLower from "../icons/icon__arrow-lower.svg";
import ArrowUpper from "../icons/icon__arrow-upper.svg";
import { styled } from "../shared/stitches/stitches.config";
import { Flex } from "../shared/components/Flex";

const TreeItem = ({ item, selected, handleClick, setUpperCollapsed }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    if (setUpperCollapsed && selected) {
      if (selected === item.slug) setUpperCollapsed(true);
    }
    if (selected) {
      const strings = selected?.split("/");
      if (
        strings[item?.depth] === item?.id &&
        strings[item.depth + 1] !== item?.id
      )
        setCollapsed(true);
    }
  }, [selected]);
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

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
              {selected === item.slug ? (
                <SelectedTreeItemFlex
                  onClick={(e) => handleClick(e, `${item.slug}`)}
                >
                  [{item.seq}]_{item.title}
                </SelectedTreeItemFlex>
              ) : (
                <TreeItemFlex onClick={(e) => handleClick(e, `${item.slug}`)}>
                  [{item.seq}]_{item.title}
                </TreeItemFlex>
              )}
            </div>
          </div>
          <div
            style={{
              maxHeight: collapsed ? "100%" : "0",
              display: collapsed ? "contents" : "none",
            }}
          >
            {item.childNodes.map((child: any, index: number) => (
              <TreeItem
                key={index}
                item={child}
                handleClick={handleClick}
                selected={selected}
                setUpperCollapsed={setCollapsed}
              />
            ))}
          </div>
        </>
      ) : (
        <div className={styles.tree}>
          {selected === item.slug ? (
            <SelectedTreeItemFlex
              style={{
                paddingLeft: item.depth * 20 + ArrowUpper.width,
              }}
              onClick={(e) => handleClick(e, `${item.slug}`)}
            >
              [{item.seq}]_{item.title}
            </SelectedTreeItemFlex>
          ) : (
            <TreeItemFlex
              style={{
                paddingLeft: item.depth * 20 + ArrowUpper.width,
              }}
              onClick={(e) => handleClick(e, `${item.slug}`)}
            >
              [{item.seq}]_{item.title}
            </TreeItemFlex>
          )}
        </div>
      )}
    </>
  );
};

export default TreeItem;

export const TreeItemFlex = styled(Flex, {
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  wordBreak: "break-all",
});
export const SelectedTreeItemFlex = styled(TreeItemFlex, {
  backgroundColor: "$teal-teal100",
});
