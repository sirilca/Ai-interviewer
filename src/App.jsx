import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Root_components/Home'
import QnaSection from './Root_components/QnaSection'
import Upload from './Root_components/Result'
import Error from './Root_components/Error'
const App = () => {
  return (
    <div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/nextpage' element={<QnaSection />} />
        <Route path='/final' element={<Upload />} />
        <Route path='/error' element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
