import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ScatterPlot = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const parseTime = d3.timeParse('%Y-%m-%d %H:%M:%S');
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => parseTime(d.x)))
      .range([0, width]);

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.y))
      .range([height, 0])
      .padding(0.1);

    // Draw circles (scatter plot points)
    svg.selectAll('circle')
      .data(data)
      .enter().append('circle')
      .attr('cx', d => xScale(parseTime(d.x)))
      .attr('cy', d => yScale(d.y) + yScale.bandwidth() / 2)
      .attr('r', 5)
      .style('fill', 'steelblue');

    // Create axes
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.timeFormat('%Y-%m-%d %H:%M:%S'));

    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    svg.append('g')
      .call(yAxis);

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default ScatterPlot;
