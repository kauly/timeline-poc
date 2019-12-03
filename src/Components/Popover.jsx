import React, { forwardRef } from "react";
import { Flex, Box, Text, Button } from "rebass";
import * as R from "ramda";

const Label = ({ text }) => (
  <Text
    sx={{
      textTransform: "uppercase",
      color: "#BFC9D9",
      fontSize: "8px"
    }}
  >
    {text}
  </Text>
);

const Item = ({ text }) => (
  <Text
    sx={{
      color: "#ffff",
      fontSize: "12px"
    }}
  >
    {text}
  </Text>
);

const Popover = forwardRef((props, ref) => {
  return (
    <Flex
      id="popover"
      flexWrap="wrap"
      ref={ref}
      sx={{
        width: 165,

        color: "white",
        position: "absolute",
        padding: 10,
        opacity: 0,
        fontFamily: "Nunito",
        background: "#283445",
        boxShadow: "1px 4px 2px rgba(40, 52, 69, 0.25)",
        transition: "all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97)",
        borderRadius: 4
      }}
    >
      <Box width={1 / 2} marginBottom="8px">
        <Flex flexDirection="column">
          <Label text="início" />
          <Item text={R.pathOr("", ["start"], props.data)} />
        </Flex>
      </Box>
      <Box width={1 / 2} marginBottom="8px">
        <Flex flexDirection="column">
          <Label text="fim" />
          <Item text={R.pathOr("", ["end"], props.data)} />
        </Flex>
      </Box>
      <Box width={1 / 2} marginBottom="8px">
        <Flex flexDirection="column">
          <Label text="duração" />
          <Item text={R.pathOr("", ["duration"], props.data)} />
        </Flex>
      </Box>
      <Box width={1 / 2} marginBottom="8px">
        <Flex flexDirection="column">
          <Label text="distância" />
          <Item text={R.pathOr("", ["distance"], props.data)} />
        </Flex>
      </Box>
      <Box width={2 / 2}>
        <Flex>
          <Button
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: "8px",
              fontFamily: "Nunito",
              width: 70,
              height: 25,
              marginRight: "8px",
              "&:hover": {
                cursor: "pointer"
              }
            }}
          >
            Mapa
          </Button>
          <Button
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: "8px",
              fontFamily: "Nunito",
              width: 70,
              height: 25,
              "&:hover": {
                cursor: "pointer"
              }
            }}
          >
            Relatório
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
});
export default Popover;
