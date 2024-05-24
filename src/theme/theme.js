import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

export const theme = extendTheme(
  {
    colors: {
      green: {
        500: "#1B6039",
      },
      p: {
        green: "#1B6039",
        black: "#171717",
      },
      brand: {
        5: "#FFFFFF",
        6: "#F3F3F7",
        10: "#BABAC4",
        20: "#BFF3D4",
        40: "#27AE60",
        60: "#1B6039",
        70: "#797E82",
        80: "#1C1C1C",
        90: "#1A202C",
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            h: "38px",
            borderRadius: "8px",
            fontSize: "sm",
            pb: "0",
            _focus: {
              boxShadow: "0 0 0 1px #1B6039",
            },
          },
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "green" })
);
