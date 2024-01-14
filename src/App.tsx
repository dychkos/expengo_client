import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { Provider } from 'react-redux'
import Header from './components/Header'
import NavBar from './components/NavBar'
import SettingsSidebar from './components/SettingsSidebar'
import { Routing } from './router'
import store from './store'

function App() {
  return (
    <div className="mb-32">
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Provider store={store}>
          <Header />

          <Routing />

          <div className="fixed z-20 bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <NavBar />
          </div>
          <SettingsSidebar />
        </Provider>
      </LocalizationProvider>
    </div>
  )
}

export default App
