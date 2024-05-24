import React from "react";
import { Card, CardHeader, CardBody } from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/react";

/**
 * CustomCard component renders a customizable card with a title, description,
 * count, and optional background image.
 * @param {Object} props - Component props
 * @param {boolean} props.isInverted - Flag to determine text color
 * @param {string} props.title - Title of the card
 * @param {string} props.desc - Description of the card
 * @param {string} props.count - Count value displayed in the card
 * @param {string} props.imgUrl - URL of the background image for the card
 */
function CustomCard({ isInverted, title, desc, count, imgUrl }) {
  return (
    <>
      <Card
        rowGap={0}
        align="center"
        bgImage={imgUrl}
        bgRepeat={"no-repeat"}
        bgSize={"cover"}
        color={isInverted ? "brand.5" : "brand.40"}
      >
        <CardHeader pb={0}>
          <Heading size="lg"> {title}</Heading>
        </CardHeader>
        <CardBody p={2}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {desc}
          </Text>
          <Text fontSize={"6xl"} fontWeight={"bold"}>
            {count}
          </Text>
        </CardBody>
      </Card>
    </>
  );
}

export default CustomCard;
