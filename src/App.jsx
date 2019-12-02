import React, { useState, useEffect } from "react";
import { Flex, Box } from "rebass";
import TimeViz from "./Components/TimeViz";

import { cleanData } from "./Components/assets/forReal";

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
      { label: "Em movimento", color: "#4876FF", type: "move" },
      { label: "Parado com ingnição ligada", color: "#FF983D", type: "weird" }
    ]
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="#fffff"
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
