import * as d3 from "d3";
import React, { useEffect, useState, useRef } from "react";
import { Flex } from "rebass/styled-components";

import Popover from "./Popover";
import {
  begin,
  end,
  genPoints,
  daysOfWeek,
  types,
  colors,
  resetTime
} from "./forReal";

const TimeViz = ({ dimensions, data }) => {
  const vizRef = useRef();
  const loading = useState(false);

  useEffect(() => {
    console.log(dimensions, data);
  }, [dimensions, data]);

  const { width, height, padding } = dimensions;
  const _xScale = d3
    .scaleTime()
    .domain([begin, end])
    .range([padding, width - padding])
    .nice();
  const _yScale = d3
    .scaleBand()
    .domain(daysOfWeek)
    .rangeRound([height - padding, padding])
    .paddingInner(0.08);

  const _colorScale = d3
    .scaleOrdinal()
    .domain(types)
    .range(colors);

  return (
    <Flex flexDirection="column">
      <svg id="viz" width={width} height={height}></svg>
      <Popover />
    </Flex>
  );
};

export default TimeViz;
