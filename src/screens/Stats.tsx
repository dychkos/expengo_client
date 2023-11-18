import React from 'react'
import BaseChart from '../components/stats/BaseChart'
import Layout from '../components/layouts/Layout'
import { useStatsSelector } from '../hooks'
import PeriodsChart from '../components/stats/PeriodsChart'

const Stats = () => {
  const total = useStatsSelector()
  return (
    <Layout>
      <div className="text-center">
        <h4 className="font-light text-md">Витрачено за місяць</h4>
        <h5 className="font-light text-xl">{total.total} грн</h5>
        <h5 className="text-zinc-500 font-bold text-md">Листопад 2023</h5>
      </div>

      <BaseChart />
      <PeriodsChart />
    </Layout>
  )
}

export default Stats
