import { useState } from 'react'
import { Search, Download, Filter, Plus, LayoutGrid, List, Network } from 'lucide-react'

const EMPLOYEES = [
  { id: 1,  name: 'Ethan Lee',      role: 'IT Specialist',      img: 11, dots: ['#F59E0B','#3B82F6','#10B981','#EF4444'] },
  { id: 2,  name: 'Emily Baker',    role: 'Marketing Manager',  img: 5,  dots: ['#F59E0B','#3B82F6','#10B981','#EF4444'] },
  { id: 3,  name: 'Micheal Shaun',  role: 'Sales Director',     img: 12, dots: ['#F59E0B','#3B82F6','#10B981','#EF4444'] },
  { id: 4,  name: 'Liam Carter',    role: 'Product Designer',   img: 15, dots: ['#F59E0B','#10B981','#3B82F6','#EF4444'] },
  { id: 5,  name: 'Grace Kim',      role: 'Customer Lead',      img: 9,  dots: ['#F59E0B','#3B82F6','#10B981'] },
  { id: 6,  name: 'Noah Williams',  role: 'Finance Head',       img: 14, dots: ['#F59E0B','#3B82F6','#10B981','#EF4444'] },
  { id: 7,  name: 'Isabella Rossi', role: 'Operations Manager', img: 49, dots: ['#F59E0B','#3B82F6','#10B981','#EF4444'] },
  { id: 8,  name: 'Ava Thompson',   role: 'HR Executive',       img: 16, dots: ['#F59E0B','#10B981','#3B82F6','#EF4444'] },
  { id: 9,  name: 'Marcus Reid',    role: 'Sales Executive',    img: 13, dots: ['#F59E0B','#3B82F6','#10B981'] },
  { id: 10, name: 'Sophie Lane',    role: 'UX Designer',        img: 25, dots: ['#F59E0B','#3B82F6','#10B981','#EF4444'] },
  { id: 11, name: 'Priya Sharma',   role: 'HR Manager',         img: 45, dots: ['#F59E0B','#10B981','#EF4444'] },
  { id: 12, name: 'Jake Monroe',    role: 'Dev Lead',           img: 53, dots: ['#F59E0B','#3B82F6','#10B981','#EF4444'] },
]

const BADGE_ICONS = ['⚙️','🔧','📊','🤝','🏆','🎤','📣','🏮','🖌️','💡','👥','💻']

export default function PeoplePage() {
  const [search,     setSearch]     = useState('')
  const [activeView, setActiveView] = useState('grid')

  const filtered = EMPLOYEES.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.role.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <div className="relative">
          <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by Employee Name or Number"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="
              pl-9 pr-4 py-2.5 text-[13px]
              border border-gray-200 dark:border-gray-600 rounded-full
              bg-white dark:bg-[#2a2a2a]
              text-gray-700 dark:text-gray-200 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600
              w-64 sm:w-72
            "
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <ToolBtn><Download size={14} /></ToolBtn>
          <ToolBtn><Filter   size={14} /></ToolBtn>

          <button className="
            w-9 h-9 rounded-[4px] bg-[#3d3936] dark:bg-white
            flex items-center justify-center
            hover:opacity-80 transition-opacity shadow-sm
          ">
            <Plus size={15} className="text-white dark:text-gray-900" />
          </button>

          <ToolBtn active={activeView === 'grid'} onClick={() => setActiveView('grid')}>
            <LayoutGrid size={14} />
          </ToolBtn>
          <ToolBtn active={activeView === 'list'} onClick={() => setActiveView('list')}>
            <List size={14} />
          </ToolBtn>
          <ToolBtn>
            <Network size={14} />
          </ToolBtn>
        </div>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {filtered.map((emp, idx) => (
          <EmployeeCard key={emp.id} emp={emp} badge={BADGE_ICONS[idx % BADGE_ICONS.length]} />
        ))}
      </div>
    </div>
  )
}

// ─── Employee card ─────────────────────────────────────────────────────────────
function EmployeeCard({ emp, badge }) {
  return (
    <div className="
      aspect-square
      bg-white dark:bg-[#2a2a2a]
      border border-gray-200 dark:border-gray-700/50
      rounded-2xl
      flex flex-col items-center justify-center
      gap-1.5 sm:gap-2
      px-2 py-3 sm:px-3
      hover:shadow-lg transition-shadow cursor-pointer
      overflow-hidden
    ">
      {/* Avatar + badge */}
      <div className="relative shrink-0">
        <img
          src={`https://i.pravatar.cc/200?img=${emp.img}`}
          alt={emp.name}
          className="
            w-14 h-14
            xs:w-16 xs:h-16
            sm:w-20 sm:h-20
            md:w-24 md:h-24
            rounded-full object-cover
          "
        />
        <div className="
          absolute -bottom-1 -right-1
          w-6 h-6 sm:w-7 sm:h-7
          rounded-full
          bg-[#1C1C1C] dark:bg-[#111]
          border-2 border-white dark:border-[#2a2a2a]
          flex items-center justify-center
          shadow-md
          text-[10px] sm:text-[12px]
        ">
          {badge}
        </div>
      </div>

      {/* Name */}
      <p className="
        font-semibold text-gray-900 dark:text-gray-100
        text-center leading-tight mt-1
        text-[11px] sm:text-[13px]
        px-1 line-clamp-1
      ">
        {emp.name}
      </p>

      {/* Role */}
      <p className="
        font-medium text-[#F07B2E]
        text-center leading-tight
        text-[10px] sm:text-[11.5px]
        px-1 line-clamp-1 -mt-0.5
      ">
        {emp.role}
      </p>

      {/* Dots — always visible, never clip */}
      <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5 flex-wrap justify-center">
        {emp.dots.map((color, i) => (
          <span
            key={i}
            className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Toolbar button ────────────────────────────────────────────────────────────
function ToolBtn({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-9 h-9 rounded-[4px] border flex items-center justify-center transition-all
        ${active
          ? 'bg-[#3d3936] border-[#1C1C1C] dark:border-white text-white dark:text-gray-900'
          : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] text-gray-500 dark:text-gray-400 hover:border-gray-300'
        }
      `}
    >
      {children}
    </button>
  )
}
