import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ScatterPlot = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    // Set up the SVG container
    const margin = { top: 20, right: 20, bottom: 75, left: 45 };
    const width = 500 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.x)))
      .range([0, width]);

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.y))
      .range([height, 0])
      .padding(0.1);

    // Draw circles (scatter plot points)
    svg.selectAll('circle')
      .data(data)
      .enter().append('circle')
      .attr('cx', d => xScale(new Date(d.x)))
      .attr('cy', d => yScale(d.y) + yScale.bandwidth() / 2)
      .attr('r', 5)
      .style('fill', 'steelblue');

    // Create axes
    const xAxis = d3.axisBottom(xScale)
    .tickFormat(d3.timeFormat('%Y-%m-%d %H:%M:%S'))
    .tickPadding(10) // Adjust the padding between ticks and labels
    .tickSize(0) // Set tick size to 0 to hide ticks initially
    .tickSizeInner(0) // Set inner tick size to 0
    .tickSizeOuter(0); // Set outer tick size to 0
    const yAxis = d3.axisLeft(yScale);

  
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    svg.append('g')
      .call(yAxis);

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default ScatterPlot;