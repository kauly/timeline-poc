import React, { useState, useEffect } from "react";
import { Flex } from "rebass";
import TimeViz from "./TimeViz";

import { cleanData } from "./forReal";
import "./styles.css";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const d = cleanData();
    setData(d);
  }, []);

  const dimensions = {
    width: 1000,
    height: 500,
    padding: 50
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <TimeViz data={data} dimensions={dimensions} />
    </Flex>
  );
};

export default App;
