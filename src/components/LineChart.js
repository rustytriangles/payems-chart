import React, { useEffect, useRef } from 'react'
import { select } from 'd3-selection'
import { extent, max, min } from 'd3-array'
import { line } from 'd3-shape'
import { scaleLinear, scaleTime } from 'd3-scale'
import { axisBottom, axisLeft } from 'd3-axis'

const margin = {top: 10, right: 30, bottom: 30, left: 60}
const width = 600 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

const LineChart = ({ data }) => {
    const d3svg = useRef(null)
    useEffect(() => {
        if (data && d3svg.current) {
            let svg = select(d3svg.current)

            var x = scaleTime()
                .domain(extent(data, function(d) { return d.date; }))
                .range([ 0, width ]);

            var y = scaleLinear()
                .domain([min(data, function(d) { return +d.value; }), max(data, function(d) { return +d.value; })])
                .range([ height, 0 ]);

            const xAxis = axisBottom(x)

            const yAxis = axisLeft(y)

            var l = line()
                .x(function(d) { return x(d.date) })
                .y(function(d) { return y(d.value) })

            svg = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)

            svg.append('g')
                .attr('class', 'chart-header')
                .attr('transform', `translate(0, ${-margin.top / 2})`)
                .append('text')
                .append('tspan')
                .text('All Employees, Total Nonfarm (PAYEMS)')

            svg.append("g")
                .attr("transform", `translate(0, ${height} )`)
                .call(xAxis);

            svg.append("g")
                .call(yAxis);

            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", l)
        }
    }, [data])

    return (
      <svg
        className="line-chart-container"
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
        role="img"
        ref={d3svg}
      ></svg>
    )
}

export default LineChart
