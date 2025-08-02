import { useEffect, useRef } from "react";
import * as d3 from "d3";
const margin = { top: 50, bottom: 50, left: 30, right: 30 };
const WIDTH = 500 - margin.left - margin.right;
const HEIGHT = 300 - margin.bottom - margin.top;
const DATAX: number[] = [10, 50, 20, 80, 70, 1, 0];
const DATAY: number[] = [50, 55, 65, 80, 70, 1, 0];

const Test = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const DATA = DATAX.map((d, i) => {
      {
        return { x: d, y: DATAY[i] };
      }
    });

    const svg = d3
      .select(svgRef.current)
      .attr("width", WIDTH)
      .attr("height", HEIGHT);
    svg
      .attr("width", WIDTH + margin.left + margin.right)
      .attr("height", HEIGHT + margin.top + margin.bottom);

    // scale

    const scaleX = d3
      .scaleLinear()
      .domain(d3.extent(DATA, (d) => d.x) as number[])
      .range([0, WIDTH] as number[]);

    const scaleY = d3
      .scaleLinear()
      .domain(d3.extent(DATA, (d) => d.y) as number[])
      .range([HEIGHT, 0] as number[]);

    const line = d3
      .line<{ x: number; y: number }>()
      .x((d) => scaleX(d.x))
      .y((d) => scaleY(d.y));

    const group = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    group
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT})`)
      .call(d3.axisBottom(scaleX));

    group
      .append("g")
      .attr("transform", `translate(0, 0)`)
      .call(d3.axisLeft(scaleY));
    group
      .append("path")
      .datum(DATA)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1)
      .attr("stroke-linejoin", "round")
      .attr("d", line);
  }, []);

  return (
    <div className="app">
      <svg ref={svgRef} />
    </div>
  );
};

export default Test;
