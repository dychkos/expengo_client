import React from 'react'
import { Cell, Pie, PieChart, Tooltip } from 'recharts'
import { uiTransformPeriod } from '../../app/helper'
import { StatsItem, StatsDiapason } from '../../app/types/stats.type'

interface CategoryPieChartProps {
  data: StatsItem[]
  diapason: StatsDiapason
}

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ data, diapason }) => {
  return (
    <div className="flex flex-row sm:flex-col justify-center items-center">
      <PieChart width={150} height={150}>
        <Pie
          data={data}
          cx={70}
          cy={70}
          innerRadius={40}
          outerRadius={60}
          fill="#8884d8"
          paddingAngle={4}
          dataKey="cost"
          nameKey="category.title"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <div className="text-center mt-2">
        <h4 className="font-light text-md">Витрачено за {uiTransformPeriod(diapason)}</h4>
        <h5 className="font-semibold text-gray-700 text-xl">2 200 грн</h5>
      </div>
    </div>
  )
}

export default CategoryPieChart
