import React from 'react';
import { useTranslation } from 'react-i18next';

interface FacilitiesSectionProps {
  facilities: {
    [key: string]: boolean;
  };
  onChange: (field: string, value: boolean) => void;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ facilities, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">{t('properties.form.facilities.title')}</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(facilities).map((facility) => (
          <label key={facility} className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={facilities[facility]}
              onChange={(e) => onChange(facility, e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="text-gray-700">
              {t(`properties.form.facilities.${facility}`)}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};