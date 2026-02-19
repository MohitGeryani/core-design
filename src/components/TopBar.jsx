import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Clock, FileEdit, Bell } from 'lucide-react'

const CRUMBS = {
  '/':              [{ label: 'People' }],
  '/timesheet':     [{ label: 'Team Management' }, { label: 'Timesheet' }],
  '/reimbursement': [{ label: 'Team Management' }, { label: 'Reimbursement' }],
}

export default function TopBar() {
  const [time, setTime] = useState(new Date())
  const location = useLocation()
  const crumbs = CRUMBS[location.pathname] || [{ label: 'Dashboard' }]

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const timeStr = time.toLocaleTimeString('en-US', {
    hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit',
  })

  return (
    // On mobile: push down below the fixed top strip
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700/50 shrink-0 mt-14 md:mt-0">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 min-w-0">
        {crumbs.map((c, i) => (
          <span key={c.label} className="flex items-center gap-2 min-w-0">
            {i > 0 && <span className="text-gray-400 text-base shrink-0">›</span>}
            <span className={`truncate text-[15px] font-semibold
              ${i < crumbs.length - 1
                ? 'text-gray-400 dark:text-gray-500'
                : 'text-gray-800 dark:text-gray-100'
              }`}
            >
              {c.label}
            </span>
          </span>
        ))}
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 shrink-0 ml-4">
        {/* MST badge */}
        <span className="hidden sm:inline-flex border border-gray-200 dark:border-gray-600 rounded-full
                         px-3 py-1 text-[11px] font-bold text-gray-600 dark:text-gray-300 tracking-wider">
          MST
        </span>

        {/* Clock — hidden on very small screens */}
        <div className="hidden sm:flex items-center gap-1.5 border border-gray-200 dark:border-gray-600
                        rounded-full px-3 py-1">
          <Clock size={12} className="text-gray-400 shrink-0" />
          <span className="text-[11px] font-mono font-semibold text-gray-700 dark:text-gray-300 tracking-wide">
            {timeStr}
          </span>
        {/* Edit */}
        <button className="w-8 h-8 flex items-center justify-center rounded-lg
                           hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400
                           transition-colors">
          <FileEdit size={16} />
        </button>
        </div>


        {/* Bell with red dot */}
        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg
                           hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400
                           transition-colors">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full
                           border border-white dark:border-[#1e1e1e]" />
        </button>

        {/* Avatar */}
        <img
          src="https://i.pravatar.cc/150?img=47"
          alt="User"
          className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600 cursor-pointer"
        />
      </div>
    </div>
  )
}