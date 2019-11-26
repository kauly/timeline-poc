import React, { useRef, useState, useEffect } from "react";

import { genViz } from "./Viz";
import { cleanDate } from "./forReal";
import "./styles.css";

const App = props => {
  const [data, setData] = useState(null);
  const containerRef = useRef();

  useEffect(() => {
    setData(cleanDate());
  }, []);

  useEffect(() => {
    data && genViz(data);
  }, [data]);

  return <div ref={containerRef} id="viz" className="container" />;
};

export default App;
