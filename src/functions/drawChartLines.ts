import * as d3 from "d3";
import type {
  MultiPoint,
  SinglePoint,
  TDataTable,
} from "../types/data/data.type";

export const drawChartLines = (
  chartGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
  isMulti: boolean,
  chart: TDataTable,
  height: number,
  width: number,
  margin: { top: number; right: number; bottom: number; left: number },
  colors: string[]
) => {
  let points: SinglePoint[] | MultiPoint[] = [];
  let xDomain: [number, number];
  let yDomain: [number, number];

  if (isMulti) {
    points = (chart.data as [number, (number | null)[]][])
      .filter((d) => Array.isArray(d[1]))
      .map((d) => ({ x: d[0], y: d[1] as number[] }));

    const allY = (points as MultiPoint[]).flatMap((p) =>
      p.y.filter((v): v is number => v !== null)
    );

    xDomain = d3.extent(points, (d) => d.x) as [number, number];
    yDomain = d3.extent(allY) as [number, number];
  } else {
    points = (chart.data as [number, number | null][])
      .filter((d) => d[1] !== null)
      .map((d) => ({ x: d[0], y: d[1] as number }));

    xDomain = d3.extent(points, (d) => d.x) as [number, number];
    yDomain = d3.extent(points, (d) => d.y) as [number, number];
  }

  // scales
  const xScale = d3
    .scaleLinear()
    .domain(xDomain)
    .range([margin.left, width - margin.right]);
  const yScale = d3
    .scaleLinear()
    .domain(yDomain)
    .range([height - margin.bottom, margin.top]);

  chartGroup
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale));

  chartGroup
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale));

  if (isMulti) {
    const seriesCount = (points[0] as MultiPoint).y.length;

    for (let i = 0; i < seriesCount; i++) {
      const series = (points as MultiPoint[]).map((p) => ({
        x: p.x,
        y: p.y[i],
      }));

      const line = d3
        .line<SinglePoint>()
        .defined((d) => d.y !== null)
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y));

      const normalizedColorIndex = i % colors.length;

      chartGroup
        .append("path")
        .datum(series)
        .attr("fill", "none")
        .attr("stroke", colors[normalizedColorIndex])
        .attr("stroke-width", 2)
        .attr("d", line);
    }
  } else {
    const line = d3
      .line<SinglePoint>()
      .defined((d) => d.y !== null)
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    chartGroup
      .append("path")
      .datum(points as SinglePoint[])
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);
  }
};

export default drawChartLines;
