import React from 'react';
import { useTranslation } from 'react-i18next';

interface AddressSectionProps {
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  onChange: (field: string, value: string) => void;
}

export const AddressSection: React.FC<AddressSectionProps> = ({ address, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">{t('properties.form.address.title')}</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('properties.form.address.street')}
          </label>
          <input
            type="text"
            value={address.street}
            onChange={(e) => onChange('street', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('properties.form.address.postalCode')}
            </label>
            <input
              type="text"
              value={address.postalCode}
              onChange={(e) => onChange('postalCode', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('properties.form.address.city')}
            </label>
            <input
              type="text"
              value={address.city}
              onChange={(e) => onChange('city', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};