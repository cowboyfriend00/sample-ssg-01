import { styled } from "../../stitches/stitches.config";
import { PropsWithChildren } from "react";
import { fullWidthVariants } from "../../stitches/variants";

type SpacingProps = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  className?: string;
};

const SpacingBase = ({
  top = 0,
  right = 0,
  bottom = 0,
  left = 0,
  children,
  className,
}: PropsWithChildren<SpacingProps>) => (
  <div
    style={{ padding: `${top}px ${right}px ${bottom}px ${left}px` }}
    className={className}
  >
    {children}
  </div>
);

export const Spacing = styled(SpacingBase, fullWidthVariants);
