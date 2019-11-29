import React from "react";
import { Flex, Box, Text, Button } from "rebass";
import * as R from "ramda";

const Popover = props => {
  React.useEffect(() => {
    console.log(props);
  }, [props]);
  return (
    <Flex id="popover" flexWrap="wrap" width={200}>
      <Box width={1 / 1}>
        <Text fontWeight="bold">{R.pathOr("", ["title"], props)}</Text>
      </Box>
      <Box width={1 / 1} py="5px">
        <Flex>
          <Text fontWeight="bold">Começo:</Text>
          <Text>{R.pathOr("", ["start"], props)}</Text>
        </Flex>
      </Box>
      <Box width={1 / 1} py="5px">
        <Flex>
          <Text fontWeight="bold">Final:</Text>
          <Text>{R.pathOr("", ["end"], props)}</Text>
        </Flex>
      </Box>
      <Box width={1 / 1} py="5px">
        <Flex>
          <Text fontWeight="bold">Duração:</Text>
          <Text>{R.pathOr("", ["duration"], props)}</Text>
        </Flex>
      </Box>
      <Box width={1 / 1} py="5px">
        <Flex>
          <Text fontWeight="bold">Distância:</Text>
          <Text>{R.pathOr("", ["distance"], props)}</Text>
        </Flex>
      </Box>
      <Box width={1 / 1} py="5px">
        <Flex justifyContent="space-around">
          <Button>Mapa</Button>
          <Button variant="outline">Relatório</Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Popover;
