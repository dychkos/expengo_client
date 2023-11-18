import React from 'react'
import ReactECharts from 'echarts-for-react'

const PeriodsChart: React.FC = () => {
  const options = {
    height: '100px',
    xAxis: {
      type: 'category',
      data: ['Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жовт'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
      },
    ],
  }

  function onChartClick(param: any, echarts: any) {
    console.log(param, echarts)
  }

  return (
    <ReactECharts
      option={options}
      onEvents={{
        click: onChartClick,
      }}
    />
  )
}

export default PeriodsChart
