import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Login from './components/Login/Login'
import MainPage from './components/MainPage/MainPage'
import { useState } from 'react'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
function App() {

  const [selectedUser, setSelectedUser] = useState()


  return (
    <BrowserRouter>
      <MantineProvider>
        <Routes>
          <Route path="/" element={<Login setSelectedUser={setSelectedUser} />} />
          <Route path='/main' element={<MainPage selectedUser={selectedUser} />} />
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  )
}

export default App

