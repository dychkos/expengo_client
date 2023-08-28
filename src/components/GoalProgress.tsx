import React from 'react'
import clsx from 'clsx'
import { Icon } from './Icon'

interface GoalProgressProps {
  current: number
  limit: number
  icon?: string
  size?: 'huge' | 'default'
}

const GoalProgress: React.FC<GoalProgressProps> = ({
  current,
  limit,
  icon,
  size = 'default',
}) => {
  const progressPercent = (current / limit) * 100

  const calcProgressColor = (percent: number) => {
    if (percent <= 30) {
      return 'bg-success'
    } else if (percent <= 75) {
      return 'bg-warning'
    } else {
      return 'bg-danger'
    }
  }

  const ProgressBarClasses = clsx(
    `absolute top-0 h-10 ${calcProgressColor(progressPercent)}`,
    {
      'rounded-r-lg': !!icon,
      'rounded-lg': !icon,
      'h-16': size === 'huge',
    },
  )

  const ProgressStyle = {
    width: progressPercent + '%',
  }

  return (
    <>
      {icon && (
        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary">
          <Icon nameIcon={icon} propsIcon={{ size: '36px' }} />
        </div>
      )}

      <div className="w-full relative">
        <div className="font-default font-bold z-10 text-white w-max text-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {current} / {limit}
        </div>
        <div
          className={clsx(`h-10 align-middle w-full bg-slate-300`, {
            'rounded-r-lg': !!icon,
            'rounded-lg': !icon,
            'h-16': size === 'huge',
          })}
        ></div>
        <div className={ProgressBarClasses} style={ProgressStyle}></div>
      </div>
    </>
  )
}

GoalProgress.defaultProps = {
  size: 'default',
}

export default GoalProgress
