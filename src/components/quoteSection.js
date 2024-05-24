import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";

/**
 * QuoteSection component displays a quote with its author.
 * @param {string} quoteBg - Background color for the quote section.
 * @param {object} quote - Quote object containing text and author.
 * @returns {JSX.Element} Quote section.
 */
function QuoteSection({ quoteBg, quote }) {
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        p={10}
        borderRadius={4}
        bgColor={quoteBg}
      >
        <Stack spacing={4}>
          <Text fontSize={"2xl"} fontWeight={"bold"} color={"brand.5"}>
            {quote.text}
          </Text>
          <Text color={"brand.5"} fontWeight={"bold"} alignSelf={"flex-end"}>
            --{quote.author}
          </Text>
        </Stack>
      </Box>
    </>
  );
}

export default QuoteSection;
