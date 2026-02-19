import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import PeoplePage from './pages/PeoplePage'
import TimesheetPage from './pages/TimesheetPage'
import './App.css'

export default function App() {
  
  return (
    <div className="flex h-screen bg-[#EBEBEB] p-3 gap-3 overflow-hidden pt-[68px] md:pt-3">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-white rounded-2xl overflow-hidden min-w-0 shadow-sm">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Routes>
            <Route path="/"          element={<PeoplePage />} />
            <Route path="/timesheet" element={<TimesheetPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}