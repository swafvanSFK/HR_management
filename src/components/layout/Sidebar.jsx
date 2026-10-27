/* ══════════════════════════════════════════════════════════════
   NovaPulse HRMS – Floating Capsule Animated Sidebar
   Figma-inspired floating pill shape ("without touch the end"),
   expanding smoothly on hover/focus with spring physics.
   ══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, CreditCard, Clock, Calendar,
  Receipt, Target, Star, FileText, Plane, ClipboardList,
  Monitor, Building2, Landmark, BarChart3, Settings,
  Pin, Shield, LogOut
} from 'lucide-react';
import useStore from '../../store/useStore';
import { getInitials, getAvatarColor } from '../../data/employees';

const navigationGroups = [
  {
    title: 'Core Suite',
    items: [
      { label: 'Overview', path: '/', icon: LayoutDashboard },
      { label: 'People', path: '/employees', icon: Users, badgeKey: 'employees' },
      { label: 'Payroll', path: '/payroll', icon: CreditCard },
    ],
  },
  {
    title: 'Workforce',
    items: [
      { label: 'Attendance', path: '/attendance', icon: Clock },
      { label: 'Leave', path: '/leave', icon: Calendar, badgeKey: 'leave' },
      { label: 'Expenses', path: '/expenses', icon: Receipt },
    ],
  },
  {
    title: 'Talent',
    items: [
      { label: 'Recruitment', path: '/recruitment', icon: Target, badge: '4' },
      { label: 'Performance', path: '/performance', icon: Star },
    ],
  },
  {
    title: 'Administration',
    items: [
      { label: 'Documents', path: '/documents', icon: FileText },
      { label: 'Visa & MOHRE', path: '/visa', icon: Plane },
      { label: 'Insurance', path: '/insurance', icon: Shield },
      { label: 'HR Requests', path: '/requests', icon: ClipboardList },
      { label: 'Assets', path: '/assets', icon: Monitor },
      { label: 'Accommodation', path: '/accommodation', icon: Building2 },
      { label: 'Salary Loans', path: '/loans', icon: Landmark },
      { label: 'Reports', path: '/reports', icon: BarChart3 },
    ],
  },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarOpen = useStore((s) => s.sidebarOpen);
  const toggleSidebar = useStore((s) => s.toggleSidebar);
  const employees = useStore((s) => s.employees);
  const leaveRequests = useStore((s) => s.leaveRequests);
  const currentUser = useStore((s) => s.currentUser);
  const logout = useStore((s) => s.logout);
  const addToast = useStore((s) => s.addToast);

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    logout();
    addToast({ type: 'info', message: 'You have been signed out.' });
    navigate('/login');
  };

  // Automatically expand when hovered, focused, or pinned open via sidebarOpen
  const isExpanded = sidebarOpen || isHovered || isFocused;

  const pendingLeaves = leaveRequests.filter((r) => r.status === 'Pending').length;

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const getBadgeValue = (item) => {
    if (item.badge) return item.badge;
    if (item.badgeKey === 'employees') return employees.length;
    if (item.badgeKey === 'leave' && pendingLeaves > 0) return pendingLeaves;
    return null;
  };

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isExpanded ? 264 : 64,
      }}
      transition={{
        type: 'spring',
        stiffness: 580,
        damping: 36,
        mass: 0.5,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsFocused(false);
        }
      }}
      tabIndex={0}
      className={`my-4 ml-4 h-[calc(100vh-32px)] flex flex-col rounded-4xl shrink-0 z-40 select-none overflow-hidden transition-colors duration-150 outline-none ${
        isExpanded
          ? 'bg-white/95 backdrop-blur-xl border border-border shadow-[0_12px_40px_rgba(32,32,30,0.12)]'
          : 'bg-[#EAE8E0]/95 backdrop-blur-md border border-[#DFDCD2] shadow-[0_4px_24px_rgba(32,32,30,0.06)] hover:bg-white/90 hover:border-border'
      }`}
      aria-label="Sidebar Navigation"
    >
      {/* ── Brand Header / Top Cap ── */}
      <div
        className={`h-16 px-4 flex items-center shrink-0 border-b transition-colors duration-200 ${
          isExpanded
            ? 'justify-between border-border-light bg-white'
            : 'justify-center border-transparent'
        }`}
      >
        {isExpanded ? (
          <>
            <NavLink to="/" className="flex items-center gap-2.5 no-underline group">
              <div className="flex items-center gap-0.5">
                <div className="w-2 h-4.5 rounded-l-full bg-charcoal" />
                <div className="w-2 h-4.5 rounded-r-full bg-gold" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold tracking-tight text-charcoal font-sans">
                  NovaPulse
                </span>
                <span className="text-[10px] font-bold text-text-secondary bg-cream px-1.5 py-0.5 rounded-md">
                  HRMS
                </span>
              </div>
            </NavLink>

            {/* Pin Toggle Button */}
            <button
              onClick={toggleSidebar}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                sidebarOpen
                  ? 'bg-[#1C1B18] text-gold'
                  : 'bg-[#FAF9F5] border border-border hover:bg-cream text-charcoal'
              }`}
              title={sidebarOpen ? 'Unpin sidebar' : 'Pin sidebar open'}
            >
              <Pin size={13} className={sidebarOpen ? 'fill-gold' : ''} />
            </button>
          </>
        ) : (
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-charcoal relative group">
            <div className="flex items-center gap-0.5">
              <div className="w-1.75 h-4 rounded-l-full bg-charcoal" />
              <div className="w-1.75 h-4 rounded-r-full bg-gold" />
            </div>
          </div>
        )}
      </div>

      {/* ── Scrollable Navigation Items (Figma Capsule style) ── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 py-2 space-y-3.5 scrollbar-none">
        {navigationGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-text-muted"
              >
                {group.title}
              </motion.div>
            )}

            {group.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              const badgeVal = getBadgeValue(item);

              if (!isExpanded) {
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className="block relative group my-1 outline-none"
                  >
                    <div
                      className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center transition-all ${
                        active
                          ? 'bg-[#1C1B18] text-gold shadow-xs'
                          : 'text-[#4A4843] hover:text-charcoal hover:bg-black/5'
                      }`}
                    >
                      <Icon size={18} strokeWidth={1.8} />
                      {badgeVal && (
                        <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-gold ring-2 ring-[#EAE8E0]" />
                      )}
                    </div>

                    {/* Floating Tooltip */}
                    <span className="absolute left-14 top-1.5 bg-charcoal text-white text-xs font-medium px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-lg z-50 flex items-center gap-1.5">
                      {item.label}
                      {badgeVal && (
                        <span className="bg-gold text-charcoal text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                          {badgeVal}
                        </span>
                      )}
                    </span>
                  </NavLink>
                );
              }

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs no-underline transition-all group ${
                    active
                      ? 'bg-[#1C1B18] text-white font-semibold shadow-xs'
                      : 'text-[#5C5950] hover:text-charcoal hover:bg-[#FAF9F5] font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      size={16}
                      strokeWidth={1.8}
                      className={
                        active
                          ? 'text-gold shrink-0'
                          : 'text-text-secondary group-hover:text-charcoal shrink-0 transition-colors'
                      }
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {badgeVal && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                        active
                          ? 'bg-gold text-charcoal'
                          : 'bg-cream text-[#7C786E]'
                      }`}
                    >
                      {badgeVal}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* ── Footer / Bottom Cap ── */}
      <div
        className={`p-2.5 shrink-0 transition-colors duration-200 ${
          isExpanded
            ? 'border-t border-border-light bg-white space-y-1'
            : 'border-transparent pb-3'
        }`}
      >
        {/* Settings */}
        {isExpanded ? (
          <NavLink
            to="/settings"
            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs no-underline transition-all ${
              isActive('/settings')
                ? 'bg-[#1C1B18] text-white font-semibold'
                : 'text-[#5C5950] hover:text-charcoal hover:bg-[#FAF9F5] font-medium'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Settings
                size={16}
                className={isActive('/settings') ? 'text-gold' : 'text-text-secondary'}
              />
              <span>System Settings</span>
            </div>
            <span className="text-[10px] text-text-muted">v2.4</span>
          </NavLink>
        ) : (
          <NavLink
            to="/settings"
            className="block relative group my-1 outline-none"
          >
            <div
              className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center transition-all ${
                isActive('/settings')
                  ? 'bg-[#1C1B18] text-gold shadow-xs'
                  : 'text-[#4A4843] hover:text-charcoal hover:bg-black/5'
              }`}
            >
              <Settings size={18} strokeWidth={1.8} />
            </div>
            <span className="absolute left-14 top-1.5 bg-charcoal text-white text-xs font-medium px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-lg z-50">
              Settings
            </span>
          </NavLink>
        )}

        {/* Profile Card with Logout */}
        {isExpanded ? (
          <div className="flex items-center justify-between p-1.5 rounded-xl hover:bg-[#FAF9F5] transition-colors group">
            <NavLink
              to="/self-service"
              className="flex items-center gap-2.5 min-w-0 flex-1 no-underline"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0 shadow-2xs"
                style={{ background: getAvatarColor(currentUser?.name || 'Swafvan Hassan') }}
              >
                {getInitials(currentUser?.name || 'Swafvan Hassan')}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-charcoal truncate group-hover:text-black font-sans">
                  {currentUser?.name || 'Swafvan Hassan'}
                </div>
                <div className="text-[10px] text-text-secondary truncate">
                  {currentUser?.role || 'HR Lead • Admin'}
                </div>
              </div>
            </NavLink>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-text-secondary hover:text-danger hover:bg-danger-soft/60 transition-colors cursor-pointer shrink-0"
              title="Sign out of workspace"
            >
              <LogOut size={13} />
            </button>
          </div>
        ) : (
          <div className="relative group my-1">
            <NavLink
              to="/self-service"
              className="block outline-none"
            >
              <div
                className="w-8 h-8 mx-auto rounded-full flex items-center justify-center text-white text-xs font-semibold ring-2 ring-transparent group-hover:ring-gold transition-all"
                style={{ background: getAvatarColor(currentUser?.name || 'Swafvan Hassan') }}
              >
                {getInitials(currentUser?.name || 'Swafvan Hassan')}
              </div>
            </NavLink>
            <button
              onClick={handleLogout}
              className="absolute left-14 top-1.5 bg-charcoal text-white text-xs font-medium px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg z-50 flex items-center gap-1.5 cursor-pointer hover:bg-danger"
              title="Click to sign out"
            >
              <span>{currentUser?.name || 'Swafvan Hassan'}</span>
              <LogOut size={11} className="text-gold" />
            </button>
          </div>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
