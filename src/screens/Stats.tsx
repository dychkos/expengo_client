import Layout from '../components/layouts/Layout'
// import { useStatsSelector } from '../hooks'

const Stats = () => {
  // const total = useStatsSelector()
  return (
    <Layout>
      <div className="text-center">
        <h4 className="font-light text-md">Витрачено за місяць</h4>
        {/* <h5 className="font-light text-xl">{total.total} грн</h5>
        <h5 className="text-zinc-500 font-bold text-md">Листопад 2023</h5> */}
      </div>

    </Layout>
  )
}

export default Stats
