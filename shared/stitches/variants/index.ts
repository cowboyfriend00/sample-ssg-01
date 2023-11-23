import { css } from "@stitches/react";

const fullWidthVariants = css({
  variants: {
    fullWidth: {
      true: {
        width: "100% !important",
      },
    },
  },
});

const fullHeightVariants = css({
  variants: {
    fullHeight: {
      true: {
        height: "100%",
      },
    },
  },
});

const flexVariants = css({
  display: "flex",
  alignItems: "center",
  variants: {
    column: {
      true: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      },
    },
    reverse: {
      true: {
        flexDirection: "row-reverse",
      },
    },
    center: {
      true: {
        justifyContent: "center",
      },
    },
    between: {
      true: {
        justifyContent: "space-between",
      },
    },
    around: {
      true: {
        justifyContent: "space-around",
      },
    },
    start: {
      true: {
        justifyContent: "flex-start",
      },
    },
    end: {
      true: {
        justifyContent: "flex-end",
      },
    },
    fitToParent: {
      true: {
        flex: 1,
      },
    },
    printOnly: {
      true: {
        display: "none",
        "@media print": {
          display: "block",
        },
      },
    },
    screenOnly: {
      true: {
        "@media print": {
          display: "none",
        },
      },
    },
    elevation: {
      100: {
        boxShadow: "$elevation100",
      },
      200: {
        boxShadow: "$elevation100",
      },
      300: {
        boxShadow: "$elevation100",
      },
    },
  },
  compoundVariants: [
    {
      column: true,
      center: true,
      css: {
        alignItems: "center",
        justifyContent: "center",
      },
    },
    {
      column: true,
      reverse: true,
      css: {
        flexDirection: "column-reverse",
      },
    },
    {
      column: true,
      between: true,
      css: {
        justifyContent: "space-between",
      },
    },
  ],
});

export { fullWidthVariants, flexVariants, fullHeightVariants };
