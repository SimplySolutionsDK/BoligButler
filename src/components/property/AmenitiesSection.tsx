import React from 'react';
import { useTranslation } from 'react-i18next';

interface AmenitiesSectionProps {
  amenities: {
    [key: string]: boolean;
  };
  onChange: (value: typeof AmenitiesSectionProps['amenities']) => void;
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ amenities, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">{t('properties.form.details.amenities.title')}</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(amenities).map((amenity) => (
          <label key={amenity} className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={amenities[amenity]}
              onChange={(e) => onChange({
                ...amenities,
                [amenity]: e.target.checked
              })}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-gray-700">
              {t(`properties.form.details.amenities.${amenity}`)}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};