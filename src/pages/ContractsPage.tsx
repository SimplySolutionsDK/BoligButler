import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileText, Plus } from 'lucide-react';

const contractTemplates = [
  {
    id: 'standard-rental',
    titleKey: 'contracts.templates.standard.title',
    descriptionKey: 'contracts.templates.standard.description',
    icon: FileText,
  },
  {
    id: 'room-rental',
    titleKey: 'contracts.templates.room.title',
    descriptionKey: 'contracts.templates.room.description',
    icon: FileText,
  },
  {
    id: 'commercial',
    titleKey: 'contracts.templates.commercial.title',
    descriptionKey: 'contracts.templates.commercial.description',
    icon: FileText,
  },
  {
    id: 'short-term',
    titleKey: 'contracts.templates.shortTerm.title',
    descriptionKey: 'contracts.templates.shortTerm.description',
    icon: FileText,
  }
];

export const ContractsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t('contracts.title')}
          </h1>
          <button
            onClick={() => navigate('/contracts/create')}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            {t('contracts.createNew')}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {contractTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => navigate(`/contracts/create/${template.id}`)}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <template.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t(template.titleKey)}
                  </h3>
                  <p className="text-gray-600">
                    {t(template.descriptionKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};