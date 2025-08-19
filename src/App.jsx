import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import AppShell from './components/AppShell'
import Dashboard from './pages/Dashboard'
import Subscriptions from './pages/Subscriptions'
import Discovery from './pages/Discovery'
import Watchlist from './pages/Watchlist'
import Pricing from './pages/Pricing'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <AppProvider>
      <AppShell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/discovery" element={<Discovery />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </AppShell>
    </AppProvider>
  )
}

export default App