import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, Info, AlertTriangle, CheckCircle2, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationCenter: React.FC = () => {
  const { notifications, unreadNotificationCount, markNotificationsRead } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!isOpen && unreadNotificationCount > 0) {
      markNotificationsRead();
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="relative p-2 text-slate-600 hover:text-brand-600 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
        title="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadNotificationCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white shadow-sm ring-2 ring-white animate-pulse">
            {unreadNotificationCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-800">Notifications</h3>
              {unreadNotificationCount > 0 && (
                <span className="bg-brand-50 text-brand-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  {unreadNotificationCount} new
                </span>
              )}
            </div>
            <button
              onClick={() => markNotificationsRead()}
              className="text-[11px] text-brand-600 hover:text-brand-700 font-medium"
            >
              Mark all read
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-50 px-2 py-1">
            {notifications.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400">
                No notifications right now
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-2.5 rounded-xl transition-colors ${
                    !n.read ? 'bg-brand-50/40 hover:bg-brand-50/80' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 shrink-0">
                      {n.type === 'SUCCESS' && (
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                      )}
                      {n.type === 'WARNING' && (
                        <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        </div>
                      )}
                      {n.type === 'INFO' && (
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                          <Info className="w-3.5 h-3.5 text-brand-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-slate-800 truncate">{n.title}</p>
                        <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
