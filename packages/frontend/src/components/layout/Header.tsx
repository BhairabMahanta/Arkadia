import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Menu, LogOut, User, Settings } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-400 hover:text-white transition-colors"
          >
            <Menu size={24} />
          </button>

          <div className="relative max-w-lg">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search games, players, tournaments..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50">
                <Bell size={20} />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-slate-900"></span>
              </button>

              <Button variant="primary" size="sm">
                Create Game
              </Button>

              <div className="relative" ref={dropdownRef}>
                <div
                  className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg cursor-pointer"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </div>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-slate-800 shadow-lg border border-slate-700 py-2 z-50">
                    <div className="px-4 py-2 text-sm text-white border-b border-slate-700">
                      <span className="font-semibold">{user?.username}</span>
                      <p className="text-xs text-slate-400 mt-1">{user?.email}</p>
                    </div>

                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-slate-700/70 transition-colors"
                    >
                      <User size={16} className="mr-2" />
                      Profile
                    </button>

                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-slate-700/70 transition-colors"
                    >
                      <Settings size={16} className="mr-2" />
                      Settings
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-slate-700/70 transition-colors"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/signin">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};