import { StyledFlexVariants } from "../../stitches/variants/type";

interface FlexBaseProps extends StyledFlexVariants {
  gap?: number | string;
  flex?: number | string;
  width?: number | string;
  height?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  padding?: number | string;
  paddingTop?: number | string;
  paddingRight?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
  bgColor?: string;
  maxWidth?: number | string;
}

export type { FlexBaseProps };
