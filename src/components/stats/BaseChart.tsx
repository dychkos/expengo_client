import React, { useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { useAppSelector } from '../../store'
import { useExpensesByGoal, useStatsSelector } from '../../hooks'

const BaseChart: React.FC = () => {
  const expenseCategories = useAppSelector(state => state.goals.list)
  const stats = useStatsSelector()

  if (!expenseCategories.length) {
    return <p>No found</p>
  }

  const getGraphData = () => {
    return stats.stats.map(s => ({ value: s.totalPrice, name: s.category }))
  }

  const options = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    height: '225px',
    series: [
      {
        name: 'Витрати за місяць',
        type: 'pie',
        radius: ['20%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: getGraphData(),
      },
    ],
  }

  return <ReactECharts option={options} />
}

export default BaseChart
