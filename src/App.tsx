import Header from './components/Header'
import NavBar from './components/NavBar'
import SettingsSidebar from './components/SettingsSidebar'
import { MainLoader } from './components/ui/MainLoader'
import { Routing } from './router'
import { useAppSelector } from './store'
import { useStartSessionQuery } from './store/api/user.api'

function App() {
  const isLoading = useAppSelector(state => state.app.appLoading)

  useStartSessionQuery(null)

  if (isLoading) {
    return <MainLoader />
  }

  return (
    <div className="mb-32">
      <Header />

      <Routing />

      <div>
        <div className="fixed z-20 bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <NavBar />
        </div>
        <SettingsSidebar />
      </div>
    </div>
  )
}

export default App
