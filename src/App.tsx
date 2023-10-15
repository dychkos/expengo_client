import React from 'react'
import { Routing } from './router'
import Header from './components/Header'
import NavBar from './components/NavBar'
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <div>
      <Header />

      <Provider store={store}>
        <Routing />
      </Provider>

      <div className="fixed z-50 bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <NavBar />
      </div>
    </div>
  )
}

export default App
