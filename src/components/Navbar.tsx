import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Languages, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Navbar: React.FC = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'da' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-sm shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">BoligButler</h1>
          <span className="hidden md:block text-sm text-gray-500">Din personlige hjælp til nem udlejning</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 text-primary-600 hover:text-primary-700 transition-colors"
            aria-label="Toggle language"
          >
            <Languages className="w-5 h-5" />
            <span>{i18n.language.toUpperCase()}</span>
          </button>
          {!user && (
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 px-4 py-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <LogIn className="w-5 h-5" />
              <span>Login</span>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};