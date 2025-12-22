'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Home,
  Play,
  Users,
  Briefcase,
  MessageSquare,
  Bell,
  BarChart3,
  Package,
  HelpCircle,
  LogOut,
  X,
} from 'lucide-react';

interface NavigationBarProps {
  activeItem?: string;
  userName?: string;
}

export default function NavigationBar({
  activeItem = 'stats',
  userName = 'User',
}: NavigationBarProps) {
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userEmail');
    // Redirect to login page
    router.push('/login');
  };
  const menuItems = [
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'clips', icon: Play, label: 'Clips' },
    { id: 'network', icon: Users, label: 'My Network' },
    { id: 'opportunities', icon: Briefcase, label: 'Opportunities' },
    { id: 'message', icon: MessageSquare, label: 'Message' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'stats', icon: BarChart3, label: 'Stats' },
    { id: 'resource', icon: Package, label: 'Resource' },
    { id: 'help', icon: HelpCircle, label: 'Help & Faq' },
    { id: 'logout', icon: LogOut, label: 'Logout' },
  ];

  // Get display name (first name or provided name)
  const displayName = userName?.split(' ')[0] || 'User';

  return (
    <div className="w-72 bg-white flex flex-col border-r border-gray-200">
      {/* Athlete Profile Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col items-center">
          <div className="text-sm text-gray-600 mb-2 font-medium">Athlete</div>
          <div className="w-16 h-16 rounded-full bg-gray-300 mb-2 overflow-hidden border-2 border-gray-400">
            <img
              src="https://via.placeholder.com/64"
              alt={displayName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="font-bold text-gray-900 text-base">{displayName}</div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            // Handle logout button separately
            if (item.id === 'logout') {
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                      isActive
                        ? 'bg-[#CB9729] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} strokeWidth={2} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                </li>
              );
            }

            return (
              <li key={item.id}>
                <a
                  href={
                    item.id === 'stats'
                      ? '/stats'
                      : item.id === 'clips'
                        ? '/clips'
                        : '#'
                  }
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#CB9729] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} strokeWidth={2} />
                  <span className="text-sm font-medium">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 backdrop-blur-sm z-50"
            onClick={() => setShowLogoutConfirm(false)}
          ></div>

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Confirm Logout
                </h3>
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="text-gray-600 mb-6">
                Are you sure you want to logout? You will need to login again to
                access your account.
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-[#CB9729] hover:bg-[#d4a846] text-white rounded-lg transition-colors font-medium"
                >
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
