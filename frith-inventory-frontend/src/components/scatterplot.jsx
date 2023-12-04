import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ScatterPlot = ({ data , stat}) => {
  const svgRef = useRef();

  useEffect(() => {
    // Set up the SVG container
    const margin = { top: 20, right: 20, bottom: 90, left: 45 };
    const width = 500 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

      var yDomainOrder = [];
      if (stat === "stock") {
        yDomainOrder = ['out', 'low', 'in stock'];
      } else if (stat === "hidden" || stat === "functional") {
        yDomainOrder = [0, 1];
      } else if (stat === "inventory") {
        yDomainOrder  = ['out', 'low', 'in stock'];
      }


    // Create scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.x)))
      .range([0, width]);

      let yScale;

      if (yDomainOrder.length > 0) {
        yScale = d3.scaleBand()
          .domain(yDomainOrder)
          .range([height, 0])
          .padding(0.1);
      } else {
        yScale = d3.scaleLinear()
          .domain(d3.extent(data, d => d.y))
          .range([height, 0]);
      }
      
      svg.selectAll('circle').remove();
      svg.selectAll('.x-axis').remove();
      svg.selectAll('.y-axis').remove();
    // Draw circles (scatter plot points)

    svg.selectAll('circle')
      .data(data)
      .enter().append('circle')
      .attr('cx', d => xScale(new Date(d.x)))
      .attr('cy', d => yScale(d.y) - 50)
      .attr('r', 5)
      .style('fill', 'steelblue');




    // Create axes
    const xAxis = d3.axisBottom(xScale)
    .tickValues(data.map(d => new Date(d.x)))
    .tickFormat(d3.timeFormat('%Y-%m-%d %H:%M:%S'))
    .tickPadding(10) // Adjust the padding between ticks and labels
    .tickSize(0) // Set tick size to 0 to hide ticks initially
    .tickSizeInner(0) // Set inner tick size to 0
    .tickSizeOuter(0); // Set outer tick size to 0
    const yAxis = d3.axisLeft(yScale);

  
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .attr('class', 'x-axis')
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    svg.append('g')
        .attr('class', 'y-axis')
      .call(yAxis);

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default ScatterPlot;