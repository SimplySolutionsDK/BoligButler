import React from 'react';
import { useTranslation } from 'react-i18next';

interface RentDetailsSectionProps {
  rent: {
    monthlyRent: number;
    deposit: number;
    prepaidRent: number;
  };
  onChange: (field: string, value: number) => void;
}

export const RentDetailsSection: React.FC<RentDetailsSectionProps> = ({ rent, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">{t('properties.form.rent.title')}</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('properties.form.rent.monthlyRent')}
          </label>
          <input
            type="number"
            value={rent.monthlyRent}
            onChange={(e) => onChange('monthlyRent', Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('properties.form.rent.deposit')}
          </label>
          <input
            type="number"
            value={rent.deposit}
            onChange={(e) => onChange('deposit', Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('properties.form.rent.prepaidRent')}
          </label>
          <input
            type="number"
            value={rent.prepaidRent}
            onChange={(e) => onChange('prepaidRent', Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
            min="0"
          />
        </div>
      </div>
    </div>
  );
};