import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import './App.css'

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<Home />}
      />
      <Route
        path='/about'
        element={<About />}
      />
      <Route
        path='*'
        element={
          <Navigate
            replace
            to='/'
          />
        }
      />
    </Routes>
  )
}

export default App
