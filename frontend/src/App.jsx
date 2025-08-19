import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'


import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import NotificationPage from './pages/NotificationPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import CallPage from './pages/CallPage.jsx'
import LoginPage from './pages/LoginPage.jsx'

import { useQuery } from '@tanstack/react-query'


const App = () => {
  const {data,isLoading,error} = useQuery({queryKey: ["todos"],
    
    queryFn: async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos")
      const data = await response.json()
      return data;
    }
  })
  console.log(data, isLoading, error);

  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="call" element={<CallPage />} />
        <Route path="chat" element={<ChatPage />} />
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App
