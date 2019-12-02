import React, { useState, useEffect } from "react";
import { Flex, Box } from "rebass";
import TimeViz from "./TimeViz";

import { cleanData } from "./forReal";
import "./styles.css";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const d = cleanData();
    setData(d);
  }, []);

  const timeConf = {
    width: 1000,
    height: 500,
    padding: 50,
    legend: [
      { label: "Em movimento", color: "#eb4d4b", type: "move" },
      { label: "Parado com ingnição ligada", color: "#6ab04c", type: "weird" }
    ]
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="primary"
    >
      <Box
        bg="#ffff"
        sx={{
          borderRadius: 4
        }}
      >
        <TimeViz data={data} conf={timeConf} />
      </Box>
    </Flex>
  );
};

export default App;
