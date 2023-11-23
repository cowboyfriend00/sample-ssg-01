import React, { HTMLAttributes, PropsWithChildren } from "react";
import { css } from "@stitches/react";
import { styled } from "../../stitches/stitches.config";
import {
  flexVariants,
  fullHeightVariants,
  fullWidthVariants,
} from "../../stitches/variants";
import { toUnit } from "../../util/util";
import { FlexBaseProps } from "./Flex.type";

const FlexBase = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren<FlexBaseProps> & HTMLAttributes<HTMLDivElement>
>(
  (
    {
      gap: gapValue,
      flex,
      width: widthValue,
      height: heightValue,
      minHeight: minHeightValue,
      maxHeight: maxHeightValue,
      padding: paddingTotal,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      bgColor,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const paddingArray = [paddingTop, paddingRight, paddingBottom, paddingLeft];
    const padding = paddingTotal
      ? toUnit(paddingTotal)
      : paddingArray.some((value) => !!value)
      ? paddingArray.map((value = 0) => toUnit(value)).join(" ")
      : undefined;

    const gap = toUnit(gapValue);
    const width = toUnit(widthValue);
    const height = toUnit(heightValue);
    const minHeight = toUnit(minHeightValue);
    const maxHeight = toUnit(maxHeightValue);
    return (
      <div
        ref={ref}
        className={`${className} ${
          css({ backgroundColor: bgColor })().className
        }`}
        style={{
          padding,
          gap,
          width,
          height,
          minHeight,
          maxHeight,
          flex,
          ...style,
        }}
        {...props}
      />
    );
  }
);

FlexBase.displayName = "FlexBase";
const Flex = styled(
  FlexBase,
  fullWidthVariants,
  fullHeightVariants,
  flexVariants
);

export { Flex };
