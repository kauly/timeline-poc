import * as d3 from "d3";
import React, { useEffect, useState, useRef } from "react";
import { Flex } from "rebass";
import { isNil, path, reduce } from "ramda";

import Popover from "./Popover";
import Legends from "./Legend";
import { begin, end, genPoints, daysOfWeek, toMoment } from "./assets/forReal";

import "./assets/styles.css";

const TimeViz = ({ conf, data }) => {
  const vizRef = useRef();
  const popRef = useRef();
  const loading = useState(false);
  const [popProps, setPopProps] = useState();
  const [colorProps, setColorProps] = useState(0);

  useEffect(() => {
    if (isNil(data) || isNil(vizRef.current) || isNil(colorProps)) return;

    genViz();
  }, [data]);

  useEffect(() => {
    if (isNil(conf)) return;
    const colorHash = reduce(
      (acc, elem) => ({ ...acc, [elem.type]: elem }),
      {},
      conf.legend
    );
    setColorProps(colorHash);
  }, [conf]);

  const { width, height } = conf;
  const margins = { top: 40, left: 60, bottom: 20, right: 40 };
  const innerHeight = height - margins.top - margins.bottom;
  const innerWidth = width - margins.left - margins.right;

  const _xScale = d3
    .scaleTime()
    .domain([begin, end])
    .range([0, innerWidth])
    .nice();
  const _yScale = d3
    .scaleBand()
    .domain(daysOfWeek)
    .rangeRound([innerHeight, 0])
    .paddingInner(0.08);

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
      ...popProps,
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
    d3.select("#x-axis")
      .call(_xAxis.scale(newXscale))
      .call(g => g.select(".domain").remove())
      .call(g =>
        g
          .selectAll(".tick line")
          .attr("stroke", "#BBCBFC")
          .attr("y2", margins.top + height * -1)
      );

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
      [innerWidth, innerHeight]
    ])
    .extent([
      [0, 0],
      [innerWidth, innerHeight]
    ])
    .on("zoom", zoomed);

  const _xAxis = d3.axisBottom(_xScale).tickFormat(d3.timeFormat("%H:%M"));
  const _yAxis = d3.axisLeft(_yScale).ticks(8);
  const _colorAcc = d => {
    console.log(path([d.type, "color"], colorProps), colorProps);
    return path([d.type, "color"], colorProps);
  };

  const genViz = () => {
    const svg = d3
      .select(vizRef.current)
      .on("click", () => d3.select(popRef.current).style("opacity", 0));

    const mainG = svg
      .append("g")
      .attr("id", "main")
      .attr("transform", `translate(${margins.left}, ${margins.top})`);
    const clipPath = mainG
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", innerWidth)
      .attr("x", _xScale.range()[0])
      .attr("height", innerHeight)
      .attr("fill", "#F2F5FF");

    const xG = mainG
      .append("g")
      .attr("id", "x-axis")
      .attr("class", "axis")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(_xAxis)
      .call(g => g.select(".domain").remove())
      .call(g =>
        g
          .selectAll(".tick line")
          .attr("stroke", "#BBCBFC")
          .attr("y2", margins.top + height * -1)
      );

    const yG = mainG
      .append("g")
      .attr("id", "y-axis")
      .attr("class", "axis")
      .call(_yAxis)
      .call(g => g.select(".domain").remove())
      .call(g =>
        g
          .selectAll(".tick line")
          .attr("stroke", "#BBCBFC")
          .style("opacity", "0.25")
          .attr("x2", innerWidth)
      )
      .call(g =>
        g
          .selectAll(".tick")
          .append("line")
          .attr("stroke", "#BBCBFC")
          .attr("x1", -8)
      )
      .call(g =>
        g.selectAll(".tick text").attr("dy", _yScale.bandwidth() * 0.5 * -1)
      );

    const barsG = mainG
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
      {!isNil(conf.legend) && <Legends conf={conf.legend} />}
    </Flex>
  );
};

export default TimeViz;
