import React from 'react'
import { StatsItem } from '../../app/types/stats.type'

interface StatsCardProps {
  data: StatsItem
  onClick: () => void
}

const StatsCard: React.FC<StatsCardProps> = ({ data, onClick }) => {
  const { category, cost, percent } = data

  return (
    <div
      onClick={onClick}
      className="transition-transform transform hover:scale-105 rounded-lg text-black bg-gray-100 p-3 flex flex-row justify-between"
    >
      <div>
        <h4 className="text-lg font-bold text-gray-700">{cost} грн</h4>
        <p className="mt-1">{category.title}</p>
        <div
          className="mt-1 w-4 h-4 rounded-full"
          style={{ backgroundColor: category.color }}
        ></div>
      </div>
      <div>
        <span>{percent} %</span>
      </div>
    </div>
  )
}

export default StatsCard
