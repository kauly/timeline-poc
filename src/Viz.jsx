import * as d3 from "d3";

import moment from "moment";
moment.locale("pt-br");

const graphProps = {
  width: 1000,
  height: 500,
  padding: 50,
  daysOfWeek: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
  timesOfDay: [
    "00:00 AM",
    "03:00 AM",
    "06:00 AM",
    "09:00 AM",
    "12:00 AM",
    "15:00 PM",
    "18:00 PM",
    "21:00 PM",
    "23:59 PM"
  ]
};

export const genViz = data => {
  console.log("TCL: data", data);
  const { daysOfWeek, timesOfDay, width, padding, height } = graphProps;

  const svg = d3
    .select("#viz")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const yScale = d3
    .scaleBand()
    .domain(daysOfWeek)
    .rangeRound([height - padding, padding])
    .paddingInner(0.08);

  const xScale = d3
    .scaleLinear()
    .domain([0, 1440])
    .rangeRound([padding, width - padding]);

  const colorScale = d3
    .scaleSequential()
    .domain([
      d3.min(data, d => d.total_distance),
      d3.max(data, d => d.total_distance)
    ])
    .interpolator(d3.interpolateYlOrBr);

  const xAxis = d3.axisBottom(xScale).ticks(24);
  //.tickFormat((d, i) => graphProps.timesOfDay[i]);

  const yAxis = d3.axisLeft(yScale).ticks(daysOfWeek.length + 1);

  const resetTime = d =>
    moment(d)
      .year(2019)
      .month(10)
      .date(12);

  const xAcc = d => xScale(moment(d.begin_at).get("hour") * 60);
  const yAcc = d => yScale(moment(d.begin_at).format("ddd"));
  const wiAcc = d => {
    const initTime = resetTime(d.begin_at);
    const finalTime = resetTime(d.end_at);
    const deltaTime = finalTime.diff(initTime, "minutes");
    console.log("TCL: deltaTime", deltaTime);
    return xScale(deltaTime);
  };
  const colorAcc = d => colorScale(d.total_distance);
  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${height - padding})`)
    .call(xAxis);
  svg
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", `translate(${padding})`)
    .call(yAxis);

  svg
    .append("g")
    .attr("id", "bars-group")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", xAcc)
    .attr("y", yAcc)
    .attr("height", yScale.bandwidth())
    .attr("width", wiAcc)
    .attr("fill", colorAcc)
    .append("title")
    .text(
      d =>
        `${moment(d.begin_at).format("hh:mm:ss")} - ${moment(d.end_at).format(
          "hh:mm:ss"
        )}`
    );
};
