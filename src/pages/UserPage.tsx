import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogOut, User, Home, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../lib/firebase/auth';
import { Navbar } from '../components/Navbar';

export const UserPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, userData } = useAuth();

  const handleLogout = async () => {
    const { error } = await logout();
    if (!error) {
      navigate('/');
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{user.email}</h1>
                <p className="text-gray-600">{t('user.role')}: {userData?.role || 'Loading...'}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <Home className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-semibold">{t('user.quickActions.title')}</h2>
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/properties')}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t('user.quickActions.viewProperties')}
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  {t('user.quickActions.manageContracts')}
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  {t('user.quickActions.paymentHistory')}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-semibold">{t('user.accountSettings.title')}</h2>
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/user/edit')}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t('user.accountSettings.editProfile')}
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  {t('user.accountSettings.notificationSettings')}
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center text-red-600"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('user.accountSettings.logout')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};