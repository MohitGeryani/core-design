import { useState } from 'react'
import {
  Search, Download, Filter, Calendar,
  Clock, AlertTriangle, Users, DollarSign, ArrowUpDown,
  
} from 'lucide-react'

const STATS = [
  { label: 'Total',     value: '169', Icon: Clock,          iconBg: 'bg-gray-100 dark:bg-gray-700',        iconColor: 'text-gray-500' },
  { label: 'Regular',   value: '7',   Icon: Clock,          iconBg: 'bg-gray-100 dark:bg-gray-700',        iconColor: 'text-gray-500' },
  { label: 'Overtime',  value: '320', Icon: Clock,          iconBg: 'bg-orange-50 dark:bg-orange-900/30',  iconColor: 'text-orange-400' },
  { label: 'OT2',       value: '20',  Icon: Users,          iconBg: 'bg-teal-50 dark:bg-teal-900/30',      iconColor: 'text-teal-500' },
  { label: 'Holiday',   value: '8',   Icon: DollarSign,     iconBg: 'bg-blue-50 dark:bg-blue-900/30',      iconColor: 'text-blue-400' },
  { label: 'Anomalies', value: '3',   Icon: AlertTriangle,  iconBg: 'bg-red-50 dark:bg-red-900/30',        iconColor: 'text-red-400' },
]

const ROWS = [
  { id:1,  name:'Micheal Shaun',  img:12, total:'07:23', regular:'07:23', overtime:'-',    ot2:'-',    holiday:'-'    },
  { id:2,  name:'Ethan Lee',      img:11, total:'08:28', regular:'08:00', overtime:'-',    ot2:'-',    holiday:'0:28' },
  { id:3,  name:'Emily Baker',    img:5,  total:'09:53', regular:'05:20', overtime:'01:21',ot2:'-',    holiday:'03:12'},
  { id:4,  name:'Liam Carter',    img:15, total:'10:46', regular:'7:34',  overtime:'02:01',ot2:'-',    holiday:'01:11'},
  { id:5,  name:'Grace Kim',      img:9,  total:'12:59', regular:'06:46', overtime:'04:00',ot2:'01:10',holiday:'01:03'},
  { id:6,  name:'Noah Williams',  img:14, total:'16:44', regular:'07:12', overtime:'03:00',ot2:'02:12',holiday:'02:32'},
  { id:7,  name:'Micheal Shaun',  img:12, total:'16:56', regular:'12:56', overtime:'03:00',ot2:'01:00',holiday:'-'   },
  { id:8,  name:'Liam Carter',    img:15, total:'15:03', regular:'06:27', overtime:'04:12',ot2:'3:02', holiday:'1:22' },
]

const COLS = [
  { key:'name',     label:'Employee'  },
  { key:'total',    label:'Total'     },
  { key:'regular',  label:'Regular'   },
  { key:'overtime', label:'Overtime'  },
  { key:'ot2',      label:'OT 2'      },
  { key:'holiday',  label:'Holiday'   },
]

export default function TimesheetPage() {
  const [search,      setSearch]      = useState('')
  const [rowsPerPage, setRowsPerPage] = useState('100')

  const filtered = ROWS.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* ── Toolbar ── */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {/* Search */}
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
              focus:outline-none focus:ring-2 focus:ring-gray-200
              w-60 sm:w-72
            "
          />
        </div>

        <div className="flex items-center gap-2 ml-auto flex-wrap">
          {/* Date range */}
          <button className="
            flex items-center gap-2 px-4 py-2.5 text-[13px]
            border border-gray-200 dark:border-gray-600 rounded-full
            bg-white dark:bg-[#2a2a2a] text-gray-600 dark:text-gray-300
            hover:bg-gray-50 dark:hover:bg-[#333] transition-colors
          ">
            <Calendar size={13} className="text-gray-400 shrink-0" />
            <span className="whitespace-nowrap">Nov 6, 2025 - Nov 6, 2025</span>
          </button>

          {/* Filter */}
          <button className="
            w-9 h-9 rounded-full border border-gray-200 dark:border-gray-600
            bg-white dark:bg-[#2a2a2a] flex items-center justify-center
            text-gray-500 dark:text-gray-400
            hover:bg-gray-50 dark:hover:bg-[#333] transition-colors
          ">
            <Filter size={14} />
          </button>

          {/* Download btn */}
          <button className="
            w-9 h-9 rounded-full border border-gray-200 dark:border-gray-600
            bg-white dark:bg-[#2a2a2a] flex items-center justify-center
            text-gray-500 dark:text-gray-400
            hover:bg-gray-50 dark:hover:bg-[#333] transition-colors
          ">
            <Download size={14} />
          </button>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
        {STATS.map(({ label, value, iconBg,  Icon, iconColor }) => (
          <div
            key={label}
            className="
              bg-white dark:bg-[#2a2a2a]
              border border-gray-100 dark:border-gray-700/50
              rounded-2xl p-4 flex flex-col gap-2
            "
          >
            <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center`}>
              <Icon size={16} className={iconColor} />
            </div>
            <p className="text-[11.5px] text-gray-400 dark:text-gray-500 font-medium">{label}</p>
            <p className="text-[26px] font-bold text-gray-900 dark:text-gray-100 leading-none">{value}</p>
          </div>
        ))}
      </div>

      {/* ── Table card ── */}
      <div className="
        bg-white dark:bg-[#2a2a2a]
        border border-gray-100 dark:border-gray-700/50
        rounded-2xl overflow-hidden
      ">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700/50">
                {COLS.map(col => (
                  <th key={col.key} className="px-5 py-4 text-left font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    <button className="flex items-center gap-1.5 hover:text-gray-900 dark:hover:text-white transition-colors group">
                      {col.label}
                      <ArrowUpDown size={11} className="text-orange-400 shrink-0" />
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => (
                <tr
                  key={row.id}
                  className="
                    border-b border-gray-50 dark:border-gray-700/30 last:border-0
                    hover:bg-gray-50/70 dark:hover:bg-white/5
                    transition-colors
                  "
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://i.pravatar.cc/80?img=${row.img}`}
                        alt={row.name}
                        className="w-7 h-7 rounded-full object-cover shrink-0"
                      />
                      <span className="font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
                        {row.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-500 dark:text-gray-400">{row.total}</td>
                  <td className="px-5 py-4 text-gray-500 dark:text-gray-400">{row.regular}</td>
                  <td className="px-5 py-4 text-gray-500 dark:text-gray-400">{row.overtime}</td>
                  <td className="px-5 py-4 text-gray-500 dark:text-gray-400">{row.ot2}</td>
                  <td className="px-5 py-4 text-gray-500 dark:text-gray-400">{row.holiday}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100 dark:border-gray-700/50">
          <div className="flex items-center gap-2 text-[13px] text-gray-600 dark:text-gray-400">
            <span className="hidden sm:inline">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={e => setRowsPerPage(e.target.value)}
              className="
                border border-gray-200 dark:border-gray-600 rounded-lg
                px-2 py-1 text-[13px]
                bg-white dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-300
                focus:outline-none
              "
            >
              <option>10</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-[13px] text-gray-500 dark:text-gray-400">
            <span>1-100 of 500</span>
            <button
              disabled
              className="w-7 h-7 flex items-center justify-center rounded-full
                         hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                         disabled:opacity-30 text-base"
            >‹</button>
            <button className="w-7 h-7 flex items-center justify-center rounded-full
                               hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-base">
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}