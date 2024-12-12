import React from 'react';
import { useTranslation } from 'react-i18next';

interface BasicDetailsSectionProps {
  details: {
    type: string;
    size: number;
    rooms: number;
  };
  onChange: (field: string, value: any) => void;
}

export const BasicDetailsSection: React.FC<BasicDetailsSectionProps> = ({ details, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">{t('properties.form.details.title')}</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('properties.form.details.type')}
          </label>
          <select
            value={details.type}
            onChange={(e) => onChange('type', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {Object.entries(t('properties.form.details.types', { returnObjects: true })).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('properties.form.details.size')}
            </label>
            <input
              type="number"
              value={details.size}
              onChange={(e) => onChange('size', Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('properties.form.details.rooms')}
            </label>
            <input
              type="number"
              value={details.rooms}
              onChange={(e) => onChange('rooms', Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
              min="1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};