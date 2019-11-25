import React, { useEffect, useRef } from "react";
import * as d3Base from "d3";
import { timelines } from "d3-timelines";

import { genData, times } from "./data";

import "./styles.css";

const data = [
  {
    type: "moving",
    times: [
      { starting_time: 1355752800000, ending_time: 1355759900000 },
      { starting_time: 1355767900000, ending_time: 1355774400000 }
    ]
  },
  {
    type: "ignition",
    times: [{ starting_time: 1355759910000, ending_time: 1355761900000 }]
  },
  {
    type: "stop",
    times: [{ starting_time: 1355761910000, ending_time: 1355763910000 }]
  }
];

const createGraph = d3 => {
  const colorScale = d3
    .scaleOrdinal()
    .range(["#6b0000", "#ef9b0f", "#ffee00"])
    .domain(["moving", "ignition", "stop"]);
  const chart = d3
    .timelines()
    .colors(colorScale)
    .colorProperty("type");

  const svg = d3
    .select("#container")
    .append("svg")
    .attr("width", 1000)
    .datum(data)
    .call(chart);
};

const Graph = props => {
  const containerRef = useRef();
  const d3 = Object.assign(d3Base, { timelines });

  useEffect(() => {
    createGraph(d3);
  }, [containerRef]);

  useEffect(() => {
    console.log("TCL: data", genData(times));
  }, []);

  return <div ref={containerRef} id="container" className="container" />;
};

export default Graph;
