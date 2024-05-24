import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import MainPage from './components/MainPage/MainPage';
import Login from './components/Login/Login';
import Settings from './components/Settings/Settings';
import Cart from './components/Cart/Cart';
import '@mantine/core/styles.css';
import './App.scss';

function App() {
  


  return (
    <>
      <BrowserRouter>
        <MantineProvider>
          <Routes>
            <Route path="./login" element={<Login />} />
            <Route path="*" element={<MainPage />} />
            <Route path='./Cart' element={<Cart />} />
            <Route path="/Settings" element={<Settings />} />
          </Routes>
        </MantineProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
