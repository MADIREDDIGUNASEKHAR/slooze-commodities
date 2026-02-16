'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function Navigation() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  if (!user) return null;

  const navItems = [
  { 
    name: 'Dashboard', 
    path: '/dashboard', 
    icon: '📊',
    allowedRoles: ['manager'],
  },
  { 
    name: 'Products', 
    path: '/products', 
    icon: '📦',
    allowedRoles: ['manager', 'storekeeper'],
  },
];


  const filteredNavItems = navItems.filter(item => 
    item.allowedRoles.includes(user.role)
  );

  return (
    <nav className="glass-card sticky top-4 z-50 mx-4 mt-4 rounded-2xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-blue-500/50">
              <span className="text-white text-2xl font-bold">S</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-xl gradient-text">
                Slooze
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Commodities
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            {filteredNavItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`
                    px-6 py-3 rounded-2xl font-semibold transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl shadow-blue-500/50 scale-105' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60 hover:scale-105'
                    }
                  `}
                >
                  <span className="mr-2 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-700/80 backdrop-blur-xl transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {/* User Info */}
            <div className="flex items-center space-x-3 px-5 py-3 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl shadow-lg">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {user.name}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold capitalize">
                  {user.role}
                </p>
              </div>
              <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/50">
                {user.name.charAt(0)}
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="px-5 py-3 rounded-2xl bg-red-50/80 dark:bg-red-900/40 backdrop-blur-xl text-red-700 dark:text-red-300 hover:bg-red-100/80 dark:hover:bg-red-900/60 font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl border border-red-200 dark:border-red-800"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
