import { useState, useEffect } from 'react'
import './App.css'
import { Container, MantineProvider, Space, AppShell } from '@mantine/core'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import { Login } from './components/Auth/Login/Login';
import { ForgotPassword } from './components/Auth/ForgotPassword/ForgotPassword';
import Profile from './components/Profile/Profile';
import QuickBooks from './components/QuickBooks/QuickBooks';
import Settings from './components/Settings/Settings';
import Print from './components/Print/Print';
import Layout from './components/Layout';
import RequireAuth from './components/Auth/RequireAuth';
import PersistLogin from './components/Auth/PersistLogin';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';

function App() {
  const [count, setCount] = useState(0);

  return (
    <MantineProvider theme={{ spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 }, loader: 'bars', datesLocale: 'ca' }} >
      <NotificationsProvider>
        <ModalsProvider>
          <Routes>
            <Route path="login" element={<Login/>} />
            <Route path="forgotPassword" element={<ForgotPassword/>} />
            
            <Route path="/" element={<Layout />}>
              <Route element={<PersistLogin />}>
                <Route element={<RequireAuth />}>
                <Route index element={<Home />} />
                <Route path="print" element={<Print/>} />
                <Route path="quickbooks" element={<QuickBooks />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              </Route>
            </Route>
        </Routes>
        </ModalsProvider>
      </NotificationsProvider>
    </MantineProvider>
  )
}

export default App
