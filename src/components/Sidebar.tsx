import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Building2, FileText, CreditCard, Settings, LogOut, ChevronRight, Home } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../lib/firebase/auth';

export const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  
  // Don't render sidebar if user is not logged in
  if (!user) return null;

  const handleLogout = async () => {
    const { error } = await logout();
    if (!error) {
      navigate('/');
    }
  };

  const menuItems = [
    { icon: Home, label: 'navigation.dashboard', path: '/user' },
    { icon: Building2, label: 'navigation.properties', path: '/properties' },
    { icon: FileText, label: 'navigation.contracts', path: '/contracts' },
    { icon: CreditCard, label: 'navigation.payments', path: '/payments' },
    { icon: Settings, label: 'navigation.settings', path: '/user/edit' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Calculate expanded content position
  const getExpandedPosition = () => {
    return isExpanded ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-4 opacity-0 pointer-events-none';
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-30 p-3 rounded-xl bg-white shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300"
      >
        <Menu className="w-6 h-6 text-primary-600" />
      </button>

      {/* Overlay */}
      {isOpen && user && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={`fixed top-0 left-0 h-full bg-white shadow-xl z-50 transition-all duration-300 transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-72 lg:w-20 lg:hover:w-52 lg:sticky lg:top-0`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex items-center justify-between bg-gradient-to-br from-white to-primary-50">
            <div className="flex items-center overflow-hidden">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-primary-600" />
              </div>
              <h1 className={`ml-3 text-xl font-bold text-gray-900 whitespace-nowrap transition-all duration-300 ${getExpandedPosition()}`}>
                BoligButler
              </h1>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/80 transition-all duration-300"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => {
                      navigate(item.path);
                      setIsOpen(false);
                    }}
                    className={`relative w-full flex items-center px-4 py-3 transition-all duration-300 group overflow-hidden ${
                      isActive(item.path)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="w-6 h-6 flex-shrink-0" />
                    <span className={`ml-3 flex-1 text-left whitespace-nowrap absolute lg:relative transition-all duration-300 ${getExpandedPosition()}`}>
                      {t(item.label)}
                    </span>
                    {isActive(item.path) && (
                      <ChevronRight className={`w-4 h-4 transition-all duration-300 ${getExpandedPosition()}`} />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-300 overflow-hidden"
            >
              <LogOut className="w-5 h-5" />
              <span className={`ml-3 whitespace-nowrap absolute lg:relative transition-all duration-300 ${getExpandedPosition()}`}>
                {t('user.accountSettings.logout')}
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};