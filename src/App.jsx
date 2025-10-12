import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import SavedLocations from './pages/SavedLocations'
import CompareLocation from './pages/CompareLocation'

function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/savedlocations' element={<SavedLocations/>}></Route>
        <Route path='/compare' element={<CompareLocation/>}></Route>
      </Routes>
      </BrowserRouter>
  )
}

export default App
