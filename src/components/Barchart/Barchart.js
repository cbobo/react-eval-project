import './barchart.scss'

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

export default class Barchart extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    xLabel: PropTypes.string.isRequired,
    yLabel: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }

 state = {}

 render () {
    // get svg element and add dimensions
    const svgElement = d3.select(this.ref)
      .attr('id', 'chart')
      .attr('width', this.props.width)
      .attr('height', this.props.height)

    // get the chart element
    const chartElement = svgElement.append('g')
      .attr('transform', `translate(80,60)`)

    const chartWidth = this.props.width - 140
    const chartHeight = this.props.height - 140

    // create d3 scales
    const xScale = d3.scaleBand()
      .domain(this.props.data.map(a => a.xval))
      .range([0, chartWidth])
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(this.props.data, a => a.yval)])
      .range([chartHeight, 0])
    const colorScale = d3.scaleOrdinal(d3.schemeDark2)

    // create and style bars
    chartElement.selectAll('.bar')
      .data(this.props.data)
      .enter()
      .append('rect')
      .attr('x', a => xScale(a.xval))
      .attr('y', a => yScale(a.yval))
      .attr('height', a => (chartHeight - yScale(a.yval)))
      .attr('width', a => xScale.bandwidth())
      .style('fill', (a, b) => colorScale(b))

    // create and style labels for the bars
    chartElement.selectAll('.bar-label')
      .data(this.props.data)
      .enter()
      .append('text')
      .attr('x', a => xScale(a.xval) + xScale.bandwidth() / 2)
      .attr('dx', 0)
      .attr('y', a => yScale(a.yval))
      .attr('dy', -6)
      .text(a => a.yval)

    // create and style the x axis label
    chartElement.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom().scale(xScale))
      .append('text')
      .attr('x', chartWidth / 2)
      .attr('y', 60)
      .attr('fill', '#000')
      .style('font-size', '20px')
      .style('text-anchor', 'middle')
      .text(this.props.xLabel)

    // create and style the y axis label
    chartElement.append('g')
      .attr('transform', 'translate(0,0)')
      .call(d3.axisLeft().ticks(10).scale(yScale))
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('transform', `translate(-50, ${chartHeight / 2}) rotate(-90)`)
      .attr('fill', '#000')
      .style('font-size', '20px')
      .style('text-anchor', 'middle')
      .text(this.props.yLabel)

    return (
      <div>
        <svg ref={(r) => (this.ref = r)} />
      </div>
    )
  }
}
