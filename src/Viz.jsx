import * as d3 from "d3";
import moment from "moment";
moment.locale("pt-br");
const graphProps = {
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
  const { daysOfWeek, timesOfDay } = graphProps;

  const margins = { top: 20, right: 10, bottom: 20, left: 10 };
  const paddings = { top: 60, right: 60, bottom: 60, left: 60 };
  const outerWidth = 1000;
  const outerHeight = 500;
  const innerWidth = outerWidth - margins.left - margins.right;
  const innerHeight = outerHeight - margins.top - margins.bottom;
  const width = innerWidth - paddings.left - paddings.right;
  const height = innerHeight - paddings.top - paddings.bottom;

  const svg = d3
    .select("#viz")
    .append("svg")
    .attr("width", outerWidth)
    .attr("height", outerHeight)
    .append("g")
    .attr("transform", `translate(${margins.left}, ${margins.top})`)
    .append("g")
    .attr("transform", `translate(${paddings.left}, ${paddings.top})`)
    .attr("width", width)
    .attr("height", height);

  const yScale = d3
    .scaleBand()
    .domain(daysOfWeek)
    .rangeRound([height, 0])
    .paddingInner(0.08);

  const minScale = d3
    .scaleLinear()
    .domain([0, 1440])
    .rangeRound([0, width]);

  const colorScale = d3
    .scaleOrdinal()
    .domain(["move", "stop", "weird"])
    .range(["#6b0000", "#ef9b0f", "#ffee00"]);

  const xAxis = d3
    .axisBottom(minScale)
    .ticks(timesOfDay.length)
    .tickFormat((d, i) => {
      console.log(d, i);
      const hr = d / 60;
      return graphProps.timesOfDay[i];
    });
  const yAxis = d3.axisLeft(yScale).ticks(daysOfWeek.length + 1);

  const resetTime = d =>
    moment(d)
      .year(2019)
      .month(10)
      .date(12);

  const xAcc = d => {
    const n = moment(d.startTime).get("hour");
    // console.log(d.startTime, "::", n);
    return minScale(n * 60);
  };
  const yAcc = d => {
    const f = moment(d.startTime).format("ddd");
    const n = yScale(f);
    //console.log(f, n);

    return n;
  };

  const wiAcc = d => {
    const i = resetTime(d.startTime);
    const f = resetTime(d.endTime);
    const dt = f.diff(i, "minutes");

    // console.log("TCL: n ", i.toDate(), "::", f.toDate(), "::", dt);
    return minScale(dt);
  };
  const typeAcc = d => colorScale(d.type);
  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);
  svg
    .append("g")
    .attr("id", "y-axis")
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
    .attr("fill", typeAcc);
};
