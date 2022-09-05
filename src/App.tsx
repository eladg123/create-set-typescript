import React from 'react'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'
// import screens:
import HomeScreen from './screens/HomeScreen'
import ChooseShirtScreen from './screens/ChooseShirtScreen'
import ChoosePantsScreen from './screens/ChoosePantsScreen'
import ChooseShoesScreen from './screens/ChooseShoesScreen'
import MySetsScreen from './screens/MySetsScreen'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path={'/'} element={<HomeScreen />} />
          <Route path={'/createSet/shirt'} element={<ChooseShirtScreen />} />
          <Route path={'/createSet/pants'} element={<ChoosePantsScreen />} />
          <Route path={'/createSet/shoes'} element={<ChooseShoesScreen />} />
          <Route path={'/mySets'} element={<MySetsScreen />} />
        </Routes>
      </main>
    </>
  )
}

export default App
