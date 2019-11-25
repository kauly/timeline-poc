import React, { useRef, useState, useEffect } from "react";

import Graph from "./Graph";
import { genViz } from "./Viz";
import { mockData } from "./mock";

const App = props => {
  const [data, setData] = useState(null);
  const containerRef = useRef();

  useEffect(() => {
    const temp = mockData();
    console.log("TCL: temp", temp);
    setData(temp);
  }, []);

  useEffect(() => {
    console.log(containerRef.current, data);
    data && genViz(data);
  }, [data]);

  return <div ref={containerRef} id="viz" className="container" />;
};

export default App;
