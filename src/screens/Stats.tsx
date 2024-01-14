import Layout from '../components/layouts/Layout'
import CategoryPieChart from '../components/stats/CategoryPieChart'
import StatsCard from '../components/stats/StatsCard'
// import { useStatsSelector } from '../hooks'

import DiapasonSwitcher from '../components/stats/DiapasonSwitcher'
import MonthYearPicker from '../components/stats/MonthYearPicker'
import { useStats } from '../hooks'
import { useAppDispatch, useAppSelector } from '../store'
import { setupStatsDate } from '../store/statsSlice'

const Stats = () => {
  // const total = useStatsSelector()

  const dispatch = useAppDispatch()
  const [expenseCategories, diapason, targetMonth, targetYear] = useAppSelector(state => [
    state.categories.list,
    state.stats.currentDiapason,
    state.stats.targetMonth,
    state.stats.targetYear,
  ])

  const statsData = useStats({
    forWeek: diapason === 'week',
    targetMonth,
    targetYear,
  })

  const setupTimePeriod = (calendarValue: any) => {
    dispatch(
      setupStatsDate({
        month: new Date(calendarValue._d).getMonth(),
        year: new Date(calendarValue._d).getFullYear(),
      }),
    )
  }

  return (
    <Layout>
      <div className="flex flex-row justify-between gap-2">
        <DiapasonSwitcher />
        <MonthYearPicker handleDatePick={setupTimePeriod} />
      </div>

      <CategoryPieChart data={statsData} />

      <div className="mt-5 grid grid-cols-2 gap-4">
        {statsData.map(st => (
          <StatsCard data={st} key={Date.now()} />
        ))}
      </div>
    </Layout>
  )
}

export default Stats
