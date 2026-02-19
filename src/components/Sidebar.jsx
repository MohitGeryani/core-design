import { useState, useCallback, memo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  Home,
  User,
  Users,
  ClipboardList,
  UserPlus,
  PieChart,
  ChevronRight,
  ChevronDown,
  Settings,
  ChevronsLeft,
  X,
} from 'lucide-react'

// ─── Constants ────────────────────────────────────────────────────────────────

const TEAM_CHILDREN = ['/timesheet', '/reimbursement']

const NAV_ITEMS = [
  { label: 'Home',            icon: Home,          to: '/home' },
  { label: 'My Info',         icon: User,          to: '/my-info',       arrow: true },
  { label: 'People',          icon: Users,         to: '/',              exact: true },
  {
    label: 'Team Management', icon: Users,
    children: [
      { label: 'Timesheet',     to: '/timesheet',     arrow: true },
      { label: 'Reimbursement', to: '/reimbursement', arrow: true },
    ],
  },
  { label: 'Project Setup',   icon: ClipboardList, to: '/project-setup', arrow: true },
  { label: 'Hiring',          icon: UserPlus,      to: '/hiring' },
  { label: 'Report',          icon: PieChart,      to: '/report' },
]

// ─── Shared style helpers ─────────────────────────────────────────────────────

// Wider padding (px-4 py-[13px]), Montserrat via CSS var set in index.css
const navItemBase = [
  'flex items-center gap-3 w-full px-4 py-[13px] rounded-xl',
  'text-[13.5px] font-medium transition-colors duration-150 text-left',
].join(' ')

// Active = solid white pill, dark text
const navActive = 'bg-white text-gray-900'
// Default = white at 90% opacity; hover = 100% + subtle bg
const navInactive = 'text-white/90 hover:text-white hover:bg-white/10'

// ─── Root component ───────────────────────────────────────────────────────────

export default function Sidebar() {
  const location = useLocation()

  const [collapsed,  setCollapsed]  = useState(false)
  const [teamOpen,   setTeamOpen]   = useState(() => TEAM_CHILDREN.includes(location.pathname))
  const [mobileOpen, setMobileOpen] = useState(false)

  // Derived — no useEffect needed
  const isTeamChild       = TEAM_CHILDREN.includes(location.pathname)
  const effectiveTeamOpen = teamOpen || isTeamChild

  const toggleCollapsed = useCallback(() => setCollapsed(v => !v), [])
  const toggleTeam      = useCallback(() => setTeamOpen(v => !v),  [])
  const openMobile      = useCallback(() => setMobileOpen(true),   [])
  const closeMobile     = useCallback(() => setMobileOpen(false),  [])

  const sharedProps = {
    collapsed,
    toggleCollapsed,
    teamOpen: effectiveTeamOpen,
    toggleTeam,
    location,
    isTeamChild,
  }

  return (
    <>
      {/* ── Mobile top strip ──────────────────────────────────────────────── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-[#2C2C2C] flex items-center px-4">
        <button
          onClick={openMobile}
          aria-label="Open navigation"
          className="text-white/70 hover:text-white transition-colors p-1"
        >
          <ChevronsLeft size={20} className="rotate-180" />
        </button>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={closeMobile}
        >
          <div
            className="absolute left-3 top-3 bottom-3 w-[260px] bg-[#2C2C2C] rounded-2xl flex flex-col overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <SidebarBody
              {...sharedProps}
              collapsed={false}
              onClose={closeMobile}
              showClose
            />
          </div>
        </div>
      )}

      {/* ── Desktop sidebar card ──────────────────────────────────────────── */}
      <aside
        className={[
          'hidden md:flex flex-col flex-shrink-0',
          'bg-[#3d3936] rounded-2xl overflow-hidden shadow-sm',
          'transition-all duration-300 ease-in-out',
          collapsed ? 'w-[72px]' : 'w-[280px]',
        ].join(' ')}
      >
        <SidebarBody {...sharedProps} />
      </aside>
    </>
  )
}

// ─── Sidebar body ─────────────────────────────────────────────────────────────

const SidebarBody = memo(function SidebarBody({
  collapsed, toggleCollapsed,
  teamOpen, toggleTeam,
  location, isTeamChild,
  showClose = false, onClose,
}) {
  return (
    <div className="flex flex-col h-full p-2">

      {/* Logo row */}
      <div className="flex items-center px-4 pt-6 pb-7 shrink-0">
        {!collapsed && (
          <span className="text-white font-black text-[22px] tracking-tight select-none flex-1"
                style={{ fontFamily: 'Montserrat, sans-serif' }}>
            CORE
          </span>
        )}
        <div className="flex items-center gap-2 ml-auto">
          {showClose && (
            <button
              onClick={onClose}
              aria-label="Close navigation"
              className="text-white/60 hover:text-white transition-colors p-0.5"
            >
              <X size={15} />
            </button>
          )}
          <button
            onClick={toggleCollapsed}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="text-white/60 hover:text-white transition-colors"
          >
            <ChevronsLeft
              size={17}
              className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-0.5 px-2 overflow-y-auto" aria-label="Main navigation">
        {NAV_ITEMS.map(item =>
          item.children
            ? <TeamNavItem
                key={item.label}
                item={item}
                collapsed={collapsed}
                teamOpen={teamOpen}
                toggleTeam={toggleTeam}
                location={location}
                isTeamChild={isTeamChild}
              />
            : <RegularNavItem
                key={item.label}
                item={item}
                collapsed={collapsed}
              />
        )}
      </nav>

      {/* Settings pinned at bottom */}
      <div className="px-2 pb-4 pt-2 shrink-0 border-t border-white/10 mt-2">
        <NavLink
          to="/settings"
          className={({ isActive }) => `${navItemBase} ${isActive ? navActive : navInactive}`}
        >
          <Settings size={17} className="shrink-0" />
          {!collapsed && <span>Settings</span>}
        </NavLink>
      </div>

    </div>
  )
})

// ─── Regular nav item ─────────────────────────────────────────────────────────

const RegularNavItem = memo(function RegularNavItem({ item, collapsed }) {
  return (
    <NavLink
      to={item.to}
      end={!!item.exact}
      className={({ isActive }) => `${navItemBase} ${isActive ? navActive : navInactive}`}
    >
      {({ isActive }) => (
        <>
          <item.icon size={17} className="shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1">{item.label}</span>
              {item.arrow && (
                <ChevronRight
                  size={13}
                  className={`shrink-0 ${isActive ? 'text-gray-400' : 'text-white/40'}`}
                />
              )}
            </>
          )}
        </>
      )}
    </NavLink>
  )
})

// ─── Team Management expandable ───────────────────────────────────────────────

const TeamNavItem = memo(function TeamNavItem({
  item, collapsed, teamOpen, toggleTeam, location, isTeamChild,
}) {
  return (
    <div>
      {/* Parent row */}
      <button
        onClick={toggleTeam}
        aria-expanded={teamOpen}
        className={`${navItemBase} ${isTeamChild ? 'text-white' : navInactive}`}
      >
        <item.icon size={17} className="shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1">{item.label}</span>
            <ChevronDown
              size={13}
              className={`shrink-0 transition-transform duration-200 ${teamOpen ? 'rotate-180' : ''}`}
            />
          </>
        )}
      </button>

      {/* Children with L-shaped connector */}
      {teamOpen && !collapsed && (
        <div className="relative ml-[38px] flex flex-col gap-0.5 mb-1 mt-0.5">
          {/* Vertical line */}
          <div
            className="absolute top-0 bottom-0 w-px bg-white/20"
            style={{ left: '-12px' }}
          />
          {item.children.map(child => {
            const isActive = location.pathname === child.to
            return (
              <div key={child.label} className="relative">
                {/* Horizontal tick */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-px w-3 bg-white/20"
                  style={{ left: '-12px' }}
                />
                <NavLink
                  to={child.to}
                  className={`
                    flex items-center justify-between px-4 py-[12px] rounded-xl text-[13px]
                    font-medium transition-colors duration-150
                    ${isActive ? navActive : navInactive}
                  `}
                >
                  <span>{child.label}</span>
                  <ChevronRight
                    size={13}
                    className={`shrink-0 ${isActive ? 'text-gray-400' : 'text-white/40'}`}
                  />
                </NavLink>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
})