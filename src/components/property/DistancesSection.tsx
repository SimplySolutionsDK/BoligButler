import React from 'react';
import { useTranslation } from 'react-i18next';

interface DistancesSectionProps {
  distances: {
    school: number;
    shopping: number;
    publicTransport: {
      bus: number;
      train: number;
    };
  };
  onChange: (value: typeof DistancesSectionProps['distances']) => void;
}

export const DistancesSection: React.FC<DistancesSectionProps> = ({ distances, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">{t('properties.form.details.distances.title')}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('properties.form.details.distances.school')}
          </label>
          <input
            type="number"
            value={distances.school}
            onChange={(e) => onChange({
              ...distances,
              school: Number(e.target.value)
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            min="0"
            step="0.1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('properties.form.details.distances.shopping')}
          </label>
          <input
            type="number"
            value={distances.shopping}
            onChange={(e) => onChange({
              ...distances,
              shopping: Number(e.target.value)
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            min="0"
            step="0.1"
          />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">
          {t('properties.form.details.distances.publicTransport.title')}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('properties.form.details.distances.publicTransport.bus')}
            </label>
            <input
              type="number"
              value={distances.publicTransport.bus}
              onChange={(e) => onChange({
                ...distances,
                publicTransport: {
                  ...distances.publicTransport,
                  bus: Number(e.target.value)
                }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('properties.form.details.distances.publicTransport.train')}
            </label>
            <input
              type="number"
              value={distances.publicTransport.train}
              onChange={(e) => onChange({
                ...distances,
                publicTransport: {
                  ...distances.publicTransport,
                  train: Number(e.target.value)
                }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              min="0"
              step="0.1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};