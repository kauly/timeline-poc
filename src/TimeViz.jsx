import * as d3 from "d3";
import React, { useEffect, useState, useRef } from "react";
import { Flex } from "rebass";
import { isNil } from "ramda";

import Popover from "./Popover";
import {
  begin,
  end,
  genPoints,
  daysOfWeek,
  types,
  colors,
  toMoment
} from "./forReal";

const TimeViz = ({ dimensions, data }) => {
  const vizRef = useRef();
  const popRef = useRef();
  const loading = useState(false);
  const [popProps, setPopProps] = useState();

  useEffect(() => {
    if (!isNil(data) && !isNil(vizRef.current)) {
      genViz();
    }
  }, [data]);

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

  function dataOver(d) {
    const popTop = popRef.current.offsetHeight;
    d3.select(this)
      .transition()
      .attr("cursor", "pointer")
      .attr("stroke", "#000")
      .attr("stroke-width", 1);

    d3.select(popRef.current)
      .style("opacity", 0.9)
      .style("top", `${this.getBoundingClientRect().top - popTop}px`)
      .style(
        "left",
        `${this.getBoundingClientRect().left +
          this.getBoundingClientRect().width}px`
      );
    setPopProps({
      start: toMoment(d.begin_at),
      end: toMoment(d.end_at),
      distance: d.total_distance,
      duration: d.duration
    });
  }

  function dateOut(d) {
    d3.select(this)
      .transition()
      .attr("stroke-width", 0);
  }

  const zoomed = () => {
    const evTransform = d3.event.transform;
    const newXscale = evTransform.rescaleX(_xScale);
    d3.select("#x-axis").call(_xAxis.scale(newXscale));
    d3.select("#bars-group")
      .selectAll("polyline")
      .data(data)
      .attr("points", d => genPoints(d, newXscale, _yScale).coord);
  };

  const zoom = d3
    .zoom()
    .scaleExtent([1, Infinity])
    .translateExtent([
      [0, 0],
      [width, height]
    ])
    .extent([
      [0, 0],
      [width, height]
    ])
    .on("zoom", zoomed);

  const _xAxis = d3.axisBottom(_xScale).tickFormat(d3.timeFormat("%H:%M"));
  const _yAxis = d3.axisLeft(_yScale).ticks(8);
  const _colorAcc = d => _colorScale(d.type);

  const genViz = () => {
    const svg = d3
      .select(vizRef.current)
      .on("click", () => d3.select(popRef.current).style("opacity", 0));
    console.log("TCL: genViz -> svg", data);
    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width - padding * 2)
      .attr("x", _xScale.range()[0])
      .attr("height", height - padding);

    svg
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0, ${height - padding})`)
      .call(_xAxis);

    svg
      .append("g")
      .attr("id", "y-axis")
      .attr("transform", `translate(${padding}, 0)`)
      .call(_yAxis)
      .call(g => g.select(".domain").remove())
      .call(g =>
        g
          .selectAll(".tick line")
          .attr("stroke-opacity", 0.5)
          .attr("stroke-dasharray", "2,2")
          .attr("x2", _xScale.range()[1] - padding)
      )
      .call(g => g.selectAll(".tick text").attr("dy", -4));

    svg
      .append("g")
      .attr("id", "bars-group")
      .attr("clip-path", "url(#clip)")
      .selectAll("polyline")
      .data(data)
      .enter()
      .append("polyline")
      .attr("points", d => genPoints(d, _xScale, _yScale).coord)
      .attr("fill", _colorAcc)
      .on("mouseover", dataOver)
      .on("mouseout", dateOut);

    svg.call(zoom);
  };
  return (
    <Flex flexDirection="column">
      <svg id="viz" width={width} height={height} ref={vizRef} />
      <Popover ref={popRef} data={popProps} />
    </Flex>
  );
};

export default TimeViz;
