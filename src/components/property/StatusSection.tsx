import React from 'react';
import { useTranslation } from 'react-i18next';

interface StatusSectionProps {
  status: string;
  visitorPolicy: string;
  onChange: (field: 'status' | 'visitorPolicy', value: string) => void;
}

export const StatusSection: React.FC<StatusSectionProps> = ({ status, visitorPolicy, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">{t('properties.form.details.status.title')}</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('properties.form.details.status.title')}
          </label>
          <select
            value={status}
            onChange={(e) => onChange('status', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {['available', 'occupied', 'maintenance'].map((statusOption) => (
              <option key={statusOption} value={statusOption}>
                {t(`properties.form.details.status.${statusOption}`)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('properties.form.details.visitorPolicy')}
          </label>
          <textarea
            value={visitorPolicy}
            onChange={(e) => onChange('visitorPolicy', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};