import React, { useState, useEffect } from 'react'
import { csv } from 'd3-fetch'
import { timeParse } from 'd3-time-format'
import LineChart from './LineChart'

function type(d) {
  return {
    date: timeParse("%Y-%m-%d")(d.date),
    value: +d.value,
  }
}

function filterData(data) {
  return data.filter(d => {
    return d.value > 0
  })
}

const LineChartData = () => {
  const [lineChartData, setLineChartData] = useState(null)

  useEffect(() => {
    csv('/static/data/PAYEMS.csv', type).then(data => {
      const dataClean = filterData(data)
      setLineChartData(dataClean)
    })
  }, [])

  if (lineChartData === null) {
    return <p>Loading...</p>
  }

  return <LineChart data={lineChartData} />
}

export default LineChartData
