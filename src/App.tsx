import React from 'react'
import { Routing } from './router'
import Header from './components/Header'
import NavBar from './components/NavBar'

function App() {
  return (
    <div>
      <Header />
      <Routing />
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <NavBar />
      </div>
    </div>
  )
}

export default App
