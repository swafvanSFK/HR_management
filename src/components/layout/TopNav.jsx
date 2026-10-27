import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bell,
  PanelLeft,
  Plane,
  Calendar,
  CreditCard,
  Receipt,
  UserCheck,
} from 'lucide-react';
import useStore from '../../store/useStore';
import { NotificationWindow } from '../common';

const primaryTabs = [
  { label: 'Overview', path: '/' },
  { label: 'People', path: '/employees' },
  { label: 'Payroll', path: '/payroll' },
];

const initialNotifications = [
  {
    id: 'n-1',
    title: 'Visa Expiry Warning',
    message: "Sofia Marin's Green Visa expires in 17 days (Nov 12). Renewal required.",
    time: '12m ago',
    type: 'visa',
    icon: Plane,
    color: '#E8A838',
    bgColor: '#FFF8E6',
    unread: true,
  },
  {
    id: 'n-2',
    title: 'Leave Request Pending',
    message: 'Lena Park submitted 5 days Annual Leave request (Oct 28 - Nov 01).',
    time: '45m ago',
    type: 'leave',
    icon: Calendar,
    color: '#5BC0DE',
    bgColor: '#EBF7FA',
    unread: true,
  },
  {
    id: 'n-3',
    title: 'WPS Disbursal Ready',
    message: 'September 2026 payroll file prepared for 51 active staff.',
    time: '2h ago',
    type: 'payroll',
    icon: CreditCard,
    color: '#5CB85C',
    bgColor: '#E8F5E8',
    unread: true,
  },
  {
    id: 'n-4',
    title: 'Expense Claim Submitted',
    message: 'Omar Haddad submitted claim AED 2,450 for client technical meeting.',
    time: 'Yesterday',
    type: 'expense',
    icon: Receipt,
    color: '#20201E',
    bgColor: '#F3F0E6',
    unread: false,
  },
  {
    id: 'n-5',
    title: 'Probation Review Complete',
    message: 'Marcus Vance successfully cleared 3-month probation period.',
    time: '2 days ago',
    type: 'review',
    icon: UserCheck,
    color: '#8A6D3B',
    bgColor: '#FCF8E3',
    unread: false,
  },
];

const TopNav = () => {
  const location = useLocation();
  const toggleSidebar = useStore((s) => s.toggleSidebar);
  const sidebarOpen = useStore((s) => s.sidebarOpen);
  const addToast = useStore((s) => s.addToast);

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleToggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, unread: !item.unread } : item
      )
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })));
    addToast({ type: 'success', message: 'All notifications marked as read' });
  };

  const handleClearAll = () => {
    setNotifications([]);
    addToast({ type: 'info', message: 'Notifications cleared' });
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="w-full px-6 lg:px-8 xl:px-10 pt-4 pb-3 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md transition-all">
      {/* Left Cluster */}
      <div className="flex items-center gap-2">
        {!sidebarOpen && (
          <>
            <button
              onClick={toggleSidebar}
              className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-charcoal shadow-xs hover:bg-[#FAF9F5] transition-all cursor-pointer"
              title="Expand sidebar"
            >
              <PanelLeft size={14} className="text-charcoal" />
            </button>

            <NavLink
              to="/"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border shadow-xs hover:border-[#D4D1C8] transition-all no-underline"
            >
              <div className="flex items-center gap-0.5">
                <div className="w-1.75 h-3.75 rounded-l-full bg-charcoal" />
                <div className="w-1.75 h-3.75 rounded-r-full bg-gold" />
              </div>
              <span className="text-xs font-bold tracking-tight text-charcoal font-sans">
                NovaPulse
              </span>
            </NavLink>
          </>
        )}
      </div>

      {/* Right Navigation Cluster */}
      <div className="flex items-center gap-2.5">
        {/* Primary Pill Navigation: Overview | People | Payroll */}
        <nav className="flex items-center gap-1 bg-cream p-1 rounded-full border border-border relative">
          {primaryTabs.map((tab) => {
            const active = isActive(tab.path);
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={`relative px-4 py-1.5 rounded-full text-xs no-underline transition-colors duration-200 select-none ${
                  active
                    ? 'text-white font-semibold'
                    : 'text-[#7C786E] hover:text-[#1C1B18] font-medium'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activeHeaderTab"
                    className="absolute inset-0 bg-[#1C1B18] rounded-full shadow-xs"
                    transition={{
                      type: 'spring',
                      stiffness: 450,
                      damping: 32,
                    }}
                  />
                )}
                <motion.span
                  className="relative z-10 block"
                  whileTap={{ scale: 0.94 }}
                >
                  {tab.label}
                </motion.span>
              </NavLink>
            );
          })}
        </nav>

        {/* Notification Bell Circle with Popover */}
        <div className="relative">
          <button
            data-notification-trigger="true"
            onClick={() => setShowNotifications((prev) => !prev)}
            className={`w-8 h-8 rounded-full border flex items-center justify-center text-charcoal shadow-xs transition-all relative cursor-pointer ${
              showNotifications
                ? 'bg-[#1C1B18] text-white border-[#1C1B18]'
                : 'bg-white border-border hover:bg-[#FAF9F5]'
            }`}
            title="Notifications"
          >
            <Bell size={13} className={showNotifications ? 'text-gold' : 'text-charcoal'} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-gold text-charcoal text-[9px] font-bold flex items-center justify-center shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Clean Animated Notification Window */}
          <NotificationWindow
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
            notifications={notifications}
            onToggleRead={handleToggleRead}
            onMarkAllRead={handleMarkAllRead}
            onClearAll={handleClearAll}
          />
        </div>
      </div>
    </header>
  );
};

export default TopNav;
