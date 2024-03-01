import Header from './components/Header'
import NavBar from './components/NavBar'
import SettingsSidebar from './components/SettingsSidebar'
import { Routing } from './router'
import { useAppSelector } from './store'
import { useGetMeQuery } from './store/api/userApi'

function App() {
  const { data, error, isLoading } = useGetMeQuery(null)

  if (isLoading) {
    return <div>loading ... </div>
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
