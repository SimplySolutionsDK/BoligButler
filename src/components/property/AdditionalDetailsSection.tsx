import React from 'react';
import { useTranslation } from 'react-i18next';

interface AdditionalDetailsProps {
  details: {
    bathrooms: number;
    floor: number;
    constructionYear: number;
    heatingCost: number;
    heatingSolutions: string[];
    energyLabel: string;
  };
  onChange: (field: string, value: any) => void;
}

export const AdditionalDetailsSection: React.FC<AdditionalDetailsProps> = ({ details, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">{t('properties.form.details.title')}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('properties.form.details.bathrooms')}
          </label>
          <input
            type="number"
            value={details.bathrooms}
            onChange={(e) => onChange('bathrooms', Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
            min="1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('properties.form.details.floor')}
          </label>
          <input
            type="number"
            value={details.floor}
            onChange={(e) => onChange('floor', Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('properties.form.details.constructionYear')}
          </label>
          <input
            type="number"
            value={details.constructionYear}
            onChange={(e) => onChange('constructionYear', Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
            min="1800"
            max={new Date().getFullYear()}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('properties.form.details.heatingCost')}
          </label>
          <input
            type="number"
            value={details.heatingCost}
            onChange={(e) => onChange('heatingCost', Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
            min="0"
          />
        </div>
      </div>
      
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('properties.form.details.heatingSolution')}
        </label>
        <select
          multiple
          value={details.heatingSolutions}
          onChange={(e) => {
            const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
            onChange('heatingSolutions', selectedOptions);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          size={5}
        >
          {Object.entries(t('properties.form.details.heatingSolutions', { returnObjects: true })).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500">{t('properties.form.details.heatingSolutionHelper')}</p>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('properties.form.details.energyLabel')}
        </label>
        <select
          value={details.energyLabel}
          onChange={(e) => onChange('energyLabel', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((label) => (
            <option key={label} value={label}>{label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};