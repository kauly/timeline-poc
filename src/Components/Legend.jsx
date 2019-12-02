import React from "react";
import { Flex, Box, Text } from "rebass";

const LegendItem = item => (
  <Flex key={item.type} alignItems="center">
    <Box
      sx={{
        width: 10,
        height: 10,
        backgroundColor: item.color,
        borderRadius: "50%",
        marginRight: "5px"
      }}
    ></Box>
    <Text mr={20}>{item.label}</Text>
  </Flex>
);

const Legends = ({ conf }) => (
  <Flex justifyContent="center" alignItems="center" width="100%" padding="20px">
    {conf && conf.map(LegendItem, conf)}
  </Flex>
);

export default Legends;
