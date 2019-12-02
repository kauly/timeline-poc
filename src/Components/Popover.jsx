import React, { forwardRef } from "react";
import { Flex, Box, Text, Button } from "rebass";
import * as R from "ramda";

const Popover = forwardRef((props, ref) => {
  return (
    <Flex
      id="popover"
      flexWrap="wrap"
      width={200}
      ref={ref}
      sx={{
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
      <Box width={1 / 1} py="5px">
        <Flex>
          <Text sx={{}}>início</Text>
          <Text>{R.pathOr("", ["start"], props.data)}</Text>
        </Flex>
      </Box>
      <Box width={1 / 1} py="5px">
        <Flex>
          <Text fontWeight="bold" mr={"4px"}>
            Final:
          </Text>
          <Text>{R.pathOr("", ["end"], props.data)}</Text>
        </Flex>
      </Box>
      <Box width={1 / 1} py="5px">
        <Flex>
          <Text fontWeight="bold" mr={"4px"}>
            Duração:
          </Text>
          <Text>{R.pathOr("", ["duration"], props.data)}</Text>
        </Flex>
      </Box>
      <Box width={1 / 1} py="5px">
        <Flex>
          <Text fontWeight="bold" mr={"4px"}>
            Distância:
          </Text>
          <Text>{R.pathOr("", ["distance"], props.data)}</Text>
        </Flex>
      </Box>
      <Box width={1 / 1} py="5px">
        <Flex justifyContent="space-around">
          <Button
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              "&:hover": {
                cursor: "pointer"
              }
            }}
          >
            Mapa
          </Button>
          <Button
            variant="outline"
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
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
