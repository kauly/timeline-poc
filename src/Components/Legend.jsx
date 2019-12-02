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
        marginRight: "8px"
      }}
    ></Box>
    <Text
      mr={20}
      sx={{
        fontFamily: "Nunito",
        fontSize: 14,
        color: "#657286"
      }}
    >
      {item.label}
    </Text>
  </Flex>
);

const Legends = ({ conf }) => (
  <Flex justifyContent="center" alignItems="center" width="100%" padding="20px">
    {conf && conf.map(LegendItem, conf)}
  </Flex>
);

export default Legends;
