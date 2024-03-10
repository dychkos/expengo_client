import Header from './components/Header'
import { MainLoader } from './components/ui/MainLoader'
import { Routing } from './router'
import { useAppSelector } from './store'
import { useStartSessionQuery } from './store/api/user.api'

function App() {
  const isLoading = useAppSelector(state => state.app.appLoading)

  useStartSessionQuery({})

  if (isLoading) {
    return <MainLoader />
  }

  return (
    <div className="mb-32">
      <Header />

      <Routing />
    </div>
  )
}

export default App
