import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Clock, FolderKanban, Shield, Wallet2 } from 'lucide-react';
import { Navbar } from '../components/Navbar';

export const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const benefits = [
    { icon: Clock, title: 'timeTitle', desc: 'timeDesc' },
    { icon: FolderKanban, title: 'organizationTitle', desc: 'organizationDesc' },
    { icon: Shield, title: 'securityTitle', desc: 'securityDesc' },
    { icon: Wallet2, title: 'paymentsTitle', desc: 'paymentsDesc' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      <Navbar />

      <main className="pt-20">
        <section className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary-700 to-primary-900 bg-clip-text text-transparent">
            {t('landing.title')}
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600 mb-12">
            {t('landing.intro')}
          </p>
        </section>

        <section className="container mx-auto px-4 py-16">
          <h3 className="text-2xl font-semibold text-center mb-12">
            {t('landing.benefits.title')}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-primary-100">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-primary-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">
                  {t(`landing.benefits.${title}`)}
                </h4>
                <p className="text-gray-600">
                  {t(`landing.benefits.${desc}`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 text-center">
          <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-12 max-w-2xl mx-auto border border-primary-200 shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">
              {t('landing.cta.title')}
            </h3>
            <p className="text-gray-600 mb-8">
              {t('landing.cta.description')}
            </p>
            <button 
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 transform hover:scale-105 font-medium text-lg shadow-lg hover:shadow-xl"
            >
              Get Started
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};