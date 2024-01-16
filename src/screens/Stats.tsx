import Layout from '../components/layouts/Layout'
import CategoryPieChart from '../components/stats/CategoryPieChart'
import DiapasonSwitcher from '../components/stats/DiapasonSwitcher'
import EmptyStats from '../components/stats/EmptyStats'
import MonthYearPicker from '../components/stats/MonthYearPicker'
import StatsCard from '../components/stats/StatsCard'
import { useStats } from '../hooks'
import { useAppDispatch, useAppSelector } from '../store'
import { setupStatsDate } from '../store/statsSlice'

const Stats = () => {
  const dispatch = useAppDispatch()

  const [diapason, targetMonth, targetYear] = useAppSelector(state => [
    state.stats.currentDiapason,
    state.stats.targetMonth,
    state.stats.targetYear,
  ])

  const statsData = useStats({
    diapason,
    targetMonth,
    targetYear,
  })

  console.log(statsData)

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
      <div>
        {statsData.length === 0 ? (
          <EmptyStats />
        ) : (
          <div>
            <CategoryPieChart data={statsData} diapason={diapason} />

            <div className="mt-5 grid grid-cols-2 gap-4">
              {statsData.map(st => (
                <StatsCard data={st} key={st.category.title} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Stats
