import { useEffect, useRef } from "react";
import * as d3 from "d3";
import data from "./data/mock.json";
import type { TDataTable } from "./types/data/data.type";
import { detectDataType } from "./helpers/detectDataType";
import drawChartLines from "./functions/drawChartLines";

const width = 500;
const height = 300;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const colors = ["blue", "green", "red"];

const App = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    (data as TDataTable[]).forEach((chart, index) => {
      const isMulti = detectDataType(chart.data) === "MULTI";

      const chartGroup = svg
        .append("g")
        .attr(
          "transform",
          `translate(0, ${index * (height + margin.bottom + 10)})`
        );

      // draw
      drawChartLines(chartGroup, isMulti, chart, height, width, margin, colors);

      chartGroup
        .append("text")
        .text(chart.title)
        .attr("x", width / 2)
        .attr("y", 15)
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", "1rem");
    });

    return () => {
      svg.selectAll("*").remove();
    };
  }, []);

  return (
    <div className="app">
      <svg
        ref={svgRef}
        width={data.length * (width + 50)}
        height={data.length * (height + 50)}
      />
    </div>
  );
};

export default App;
