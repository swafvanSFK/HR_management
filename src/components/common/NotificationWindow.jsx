/* ══════════════════════════════════════════════════════════════
   NovaPulse HRMS – Clean Notification Window
   - Simple, smooth popover animation (scale + opacity + subtle Y)
   - Unified single list of read & unread notifications
   - Click bell to open, click again to close
   - Dismiss on outside click or Escape key
   ══════════════════════════════════════════════════════════════ */

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  CheckCheck,
  X,
  Trash2,
} from 'lucide-react';

export default function NotificationWindow({
  isOpen,
  onClose,
  notifications = [],
  onToggleRead,
  onMarkAllRead,
  onClearAll,
}) {
  const windowRef = useRef(null);

  // Close on Escape or click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      // If clicking inside the window or on the trigger button, don't close
      if (
        (windowRef.current && windowRef.current.contains(e.target)) ||
        e.target.closest('[data-notification-trigger]')
      ) {
        return;
      }
      onClose && onClose();
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose && onClose();
      }
    };

    const timer = setTimeout(() => {
      window.addEventListener('pointerdown', handleClickOutside);
      window.addEventListener('keydown', handleKeyDown);
    }, 20);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('pointerdown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={windowRef}
          initial={{ opacity: 0, scale: 0.95, y: -6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -6 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'calc(100% - 16px) 0px' }}
          className="absolute right-0 top-10 mt-1 w-[360px] sm:w-[400px] bg-white rounded-2xl border border-[#EAE7DD] shadow-[0_20px_50px_rgba(28,27,24,0.14),0_2px_10px_rgba(28,27,24,0.06)] overflow-hidden flex flex-col z-50 select-none"
        >
          {/* ── Header ── */}
          <div className="px-4 py-3 border-b border-[#EAE7DD]/80 bg-[#FAF9F5]/90 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-charcoal tracking-tight font-sans">
                Notifications
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  unreadCount > 0
                    ? 'bg-gold/25 text-charcoal'
                    : 'bg-[#EAE7DD] text-text-secondary'
                }`}
              >
                {unreadCount > 0 ? `${unreadCount} New` : 'All read'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && onMarkAllRead && (
                <button
                  type="button"
                  onClick={onMarkAllRead}
                  className="px-2 py-0.5 rounded-md hover:bg-black/5 text-[10px] font-medium text-text-secondary hover:text-charcoal flex items-center gap-1 transition-colors cursor-pointer"
                  title="Mark all notifications as read"
                >
                  <CheckCheck size={11} />
                  <span>Mark all read</span>
                </button>
              )}

              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-text-secondary hover:text-charcoal hover:bg-black/5 transition-colors cursor-pointer"
                  title="Close"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* ── Unified Single List (Read & Unread Together) ── */}
          <div className="p-2 space-y-1.5 overflow-y-auto max-h-[380px] custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center gap-1.5 text-text-secondary py-12">
                <div className="w-9 h-9 rounded-full bg-[#FAF9F5] border border-[#EAE7DD] flex items-center justify-center text-text-secondary shadow-2xs">
                  <Bell size={15} className="opacity-40" />
                </div>
                <p className="text-xs font-semibold text-charcoal mt-1">No notifications</p>
                <p className="text-[11px]">You're completely caught up!</p>
              </div>
            ) : (
              notifications.map((item) => {
                const Icon = item.icon || Bell;
                return (
                  <div
                    key={item.id}
                    onClick={() => onToggleRead && onToggleRead(item.id)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer relative group flex items-start gap-2.5 ${
                      item.unread
                        ? 'bg-white border-[#EAE7DD] shadow-2xs hover:border-[#D4D0C5]'
                        : 'bg-[#FAF9F5]/70 border-transparent hover:bg-white hover:border-[#EAE7DD] opacity-80 hover:opacity-100'
                    }`}
                  >
                    {/* Category Icon */}
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 shadow-2xs transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: item.bgColor || '#F3F0E6',
                        color: item.color || '#20201E',
                      }}
                    >
                      <Icon size={14} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`text-xs truncate ${
                            item.unread
                              ? 'font-bold text-charcoal'
                              : 'font-medium text-[#7C786E]'
                          }`}
                        >
                          {item.title}
                        </span>
                        <span className="text-[10px] text-text-secondary shrink-0">
                          {item.time}
                        </span>
                      </div>
                      <p
                        className={`text-[11px] mt-0.5 leading-snug line-clamp-2 ${
                          item.unread ? 'text-[#44423C]' : 'text-text-secondary'
                        }`}
                      >
                        {item.message}
                      </p>
                    </div>

                    {/* Amber Unread Dot */}
                    {item.unread && (
                      <span
                        className="w-2 h-2 rounded-full bg-gold shrink-0 mt-2 ring-2 ring-white"
                        title="Unread"
                      />
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* ── Footer ── */}
          {notifications.length > 0 && (
            <div className="px-3.5 py-2 border-t border-[#EAE7DD]/80 bg-[#FAF9F5]/70 flex items-center justify-between text-[11px] text-text-secondary shrink-0">
              <span>{notifications.length} total notifications</span>
              {onClearAll && (
                <button
                  type="button"
                  onClick={onClearAll}
                  className="hover:text-danger flex items-center gap-1 transition-colors cursor-pointer text-[10px]"
                  title="Clear all notifications"
                >
                  <Trash2 size={11} />
                  <span>Clear all</span>
                </button>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
