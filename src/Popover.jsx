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
        fontSize: 12,
        background: "rgba(0, 0, 0, 0.8)",
        borderTop: "5px solid hsla(0, 0%, 20%, 0.9)",
        transition: "all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97)"
      }}
    >
      <Box width={1 / 1}>
        <Text fontWeight="bold">{R.pathOr("", ["title"], props.data)}</Text>
      </Box>
      <Box width={1 / 1} py="5px">
        <Flex>
          <Text fontWeight="bold" mr={"4px"}>
            Começo:
          </Text>
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
