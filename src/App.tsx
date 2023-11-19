import React from 'react'
import { Routing } from './router'
import Header from './components/Header'
import NavBar from './components/NavBar'
import { Provider } from 'react-redux'
import store from './store'
import SettingsSidebar from './components/SettingsSidebar'

function App() {
  return (
    <div className="mb-32">
      <Provider store={store}>
        <Header />

        <Routing />

        <div className="fixed z-20 bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <NavBar />
        </div>
        <SettingsSidebar />
      </Provider>
    </div>
  )
}

export default App
