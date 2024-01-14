import { cn } from '../../app/className'
import { StatsDiapason } from '../../app/types/stats.type'
import { useAppDispatch, useAppSelector } from '../../store'
import { switchDiapason } from '../../store/statsSlice'


const DiapasonSwitcher: React.FC = () => {
  const dispatch = useAppDispatch()
  const selected = useAppSelector(state => state.stats.currentDiapason)

  const switchCurrentDiapason = (idx: number) => {
    dispatch(switchDiapason(diapasons[idx].key))
  }

  const diapasons: Array<{ key: StatsDiapason; value: string }> = [
    {
      key: 'week',
      value: 'Тиждень',
    },
    {
      key: 'month',
      value: 'Місяць',
    },
    {
      key: 'year',
      value: 'Рік',
    },
  ]

  return (
    <div className="flex gap-1 sm:gap-2 text-md">
      {diapasons.map((d, idx) => (
        <span
          key={d.key}
          onClick={() => switchCurrentDiapason(idx)}
          className={cn('cursor-pointer', d.key === selected ? '' : 'opacity-40')}
        >
          {d.value}
        </span>
      ))}
    </div>
  )
}

export default DiapasonSwitcher
