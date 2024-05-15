import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Login from './components/Login/Login'
import MainPage from './components/MainPage/MainPage'
import { useState } from 'react'

function App() {

  const [selectedUser, setSelectedUser] = useState()


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setSelectedUser={setSelectedUser} />} />
        <Route path='/main' element={<MainPage selectedUser={selectedUser} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

