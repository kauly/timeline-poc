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
  const begin = moment("02/08/1987", "DD/MM/YYYY").startOf("day");
  const end = moment("02/08/1987", "DD/MM/YYYY").endOf("day");
  console.log("TCL: begin", begin.toDate(), end.toDate());

  const svg = d3
    .select("#viz")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const xScale = d3
    .scaleTime()
    .domain([begin, end])
    .rangeRound([padding, width - padding])
    .nice();

  const yScale = d3
    .scaleBand()
    .domain(daysOfWeek)
    .rangeRound([height - padding, padding])
    .paddingInner(0.08);

  const colorScale = d3
    .scaleSequential()
    .domain([
      d3.min(data, d => d.total_distance),
      d3.max(data, d => d.total_distance)
    ])
    .interpolator(d3.interpolateRainbow);

  const xAxis = d3
    .axisBottom(xScale)
    .ticks(d3.timeHour, 4)
    .tickFormat(d3.timeFormat("%H:%M"));

  const yAxis = d3.axisLeft(yScale).ticks(daysOfWeek.length + 1);

  const resetTime = d =>
    moment(d)
      .year(1987)
      .month(7)
      .date(2)
      .toDate();

  const colorAcc = d => colorScale(d.total_distance);
  const genPoints = d => {
    const start = xScale(resetTime(d.begin_at));
    const end = xScale(resetTime(d.end_at));
    const y = yScale(moment(d.begin_at).format("ddd"));
    const yPlusBd = y + yScale.bandwidth();
    const points = {
      p_1: `${start},${y}`,
      p_2: `${end},${y}`,
      p_3: `${end},${yPlusBd}`,
      p_4: `${start},${yPlusBd}`
    };
    return `${points.p_1} ${points.p_2} ${points.p_3} ${points.p_4}`;
  };
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
    .append("polyline")
    .attr("points", genPoints)
    .attr("fill", colorAcc)

    .append("title")
    .text(
      d =>
        `${moment(d.begin_at).format("hh:mm:ss")} - ${moment(d.end_at).format(
          "hh:mm:ss"
        )}`
    );
};
