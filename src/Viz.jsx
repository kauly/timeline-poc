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
  ],
  types: ["weird", "move", "stop"],
  colors: ["#eb4d4b", "#6ab04c", "#f0932b"]
};

const resetTime = d =>
  moment(d)
    .year(1987)
    .month(7)
    .date(2)
    .toDate();

const begin = moment("02/08/1987", "DD/MM/YYYY").startOf("day");
const end = moment("02/08/1987", "DD/MM/YYYY").endOf("day");

const genPoints = (d, scaleX, scaleY) => {
  const x_1 = scaleX(resetTime(d.begin_at));
  const x_2 = scaleX(resetTime(d.end_at));
  const y_1 =
    scaleY(moment(d.begin_at).format("ddd")) - scaleY.bandwidth() * 0.5 - 2;
  const y_2 = y_1 + scaleY.bandwidth();
  const points = {
    p_1: `${x_1},${y_1}`,
    p_2: `${x_2},${y_1}`,
    p_3: `${x_2},${y_2}`,
    p_4: `${x_1},${y_2}`,
    p_5: `${x_1},${y_1}`
  };
  return {
    points,
    coord: `${points.p_1} ${points.p_2} ${points.p_3} ${points.p_4} ${points.p_5}`
  };
};

export const genViz = data => {
  console.log("TCL: data", data);
  const { daysOfWeek, colors, width, padding, height, types } = graphProps;

  const tooltip = d3
    .select("#viz")
    .append("div")
    .style("opacity", 0)
    .attr("id", "popover");
  const svg = d3
    .select("#viz")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .on("click", function() {
      tooltip.style("opacity", 0);
    });

  // SCALES
  const xScale = d3
    .scaleTime()
    .domain([begin, end])
    .range([padding, width - padding])
    .nice();
  const yScale = d3
    .scaleBand()
    .domain(daysOfWeek)
    .rangeRound([height - padding, padding])
    .paddingInner(0.08);

  const colorScale = d3
    .scaleOrdinal()
    .domain(types)
    .range(colors);

  const clipPath = svg
    .append("defs")
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width - padding * 2)
    .attr("x", xScale.range()[0])
    .attr("height", height - padding);

  const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%H:%M"));
  const yAxis = d3.axisLeft(yScale).ticks(8);

  const colorAcc = d => colorScale(d.type);

  const gX = svg
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${height - padding})`)
    .call(xAxis);

  const gY = svg
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", `translate(${padding}, 0)`)
    .call(yAxis)
    .call(g => g.select(".domain").remove())
    .call(g =>
      g
        .selectAll(".tick line")
        .attr("stroke-opacity", 0.5)
        .attr("stroke-dasharray", "2,2")
        .attr("x2", xScale.range()[1] - padding)
    )
    .call(g =>
      g
        .selectAll(".tick text")

        .attr("dy", -4)
    );

  const chartData = svg
    .append("g")
    .attr("id", "bars-group")
    .attr("clip-path", "url(#clip)")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("polyline")
    .attr("points", d => genPoints(d, xScale, yScale).coord)
    .attr("fill", colorAcc)
    .on("mouseover", function(d) {
      d3.select(this)
        .transition()
        .attr("cursor", "pointer")
        .attr("stroke", "#000")
        .attr("stroke-width", 1);
      tooltip
        .style("opacity", 0.9)
        .html(
          `${moment(d.begin_at).format("hh:mm:ss")} <br/> ${moment(
            d.end_at
          ).format("hh:mm:ss")}`
        )
        .style(
          "top",
          `${this.getBoundingClientRect().top - yScale.bandwidth()}px`
        )
        .style(
          "left",
          `${this.getBoundingClientRect().left +
            this.getBoundingClientRect().width}px`
        );
    })
    .on("mouseout", function() {
      d3.select(this)
        .transition()
        .attr("stroke-width", 0);
    });

  const zoomed = () => {
    const evTransform = d3.event.transform;
    const newXscale = evTransform.rescaleX(xScale);
    gX.call(xAxis.scale(newXscale));
    d3.select("#bars-group")
      .selectAll("polyline")
      .data(data)
      .attr("points", d => genPoints(d, newXscale, yScale).coord);
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

  svg.call(zoom);
  return null;
};
